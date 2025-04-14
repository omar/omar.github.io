---
layout: post
title: "Stop playing pong with your build server"
excerpt_separator: <!--more-->
image: /images/build-server-pong.png
---

"Build Server Pong" is what you inadvertently play when you treat your build
server and source control as a [REPL(read-edit-print-loop)](https://en.wikipedia.org/wiki/Read%E2%80%93eval%E2%80%93print_loop).
You make a code change, commit it, push it, kick off a build, grab a coffee, then wait for the results. Rinse and repeat until you've got a successful build.

![Build Server Pong](/images/build-server-pong.png)

However, even if you eventually score a point by getting a successful build, you've lost time in the rally to get it. It's an easy trap to fall into because most build systems require you to run the workflow on *their* hosted runners to see the results of your changes.

<!--more-->

_Special thanks to [Tim Cardwell](https://www.linkedin.com/in/tim-cardwell) for reviewing a draft of this post._

One technique to avoid build server pong is to *make your build pipelines 
runnable locally*. You can wrap your build steps into a bash script or a
Makefile target, then your build pipeline contains calls to these bash scripts or
Makefile targets. In practice this means:

- Parameterize your build completely. That means secrets, variables, *even build
  number*.
- Keep your pipeline code as dumb as possible. Your build server should inject
  your pipeline with information you don't have access to locally (e.g. secrets,
  pull request, or issue number).

Try to model your build pipeline as a function that you execute with a bunch of
parameters. Those parameters are passed in from your build server or directly at
the command line when run locally.

### Example

Excalidraw's repository contains a GitHub workflow named ["Build locales
coverage" in
locales-coverage.yml](https://github.com/excalidraw/excalidraw/blob/master/.github/workflows/locales-coverage.yml)
with a number of steps that include bash commands and 3rd party GitHub actions.
Iterating on any of the steps will require developers to push code and use
GitHub actions as their REPL or test in their terminal then copy and paste into
the YAML file.

We can improve the dev loop by enabling these steps to run locally. Using tools
like [make](https://en.wikipedia.org/wiki/Make_\(software\)) or
[just](https://github.com/casey/just), we can define our build steps and execute
those tools both locally and on the build server. Let’s see how that’s done
using a Makefile.

We'll skip the git checkout and node.js setup steps. The first two steps `Create
report file` and `Construct comment body` are bash commands which can be moved
into our Makefile:

```make
create-report-file:
	yarn locales-coverage
	FILE_CHANGED=$$(git diff packages/excalidraw/locales/percentages.json) \
	if [ ! -z "$$FILE_CHANGED" ]; then
		git add packages/excalidraw/locales/percentages.json
		# We modified the git commit command to change the committer name/email
		# instead of doing it globally to avoid messing with local dev environment.
		git commit \
			-c "user.name=Excalidraw Bot" \
			-c "user.email=bot@excalidraw.com" \
			-am "Auto commit: Calculate translation coverage"
		git push
	fi

# .ONESHELL is required to allow passing variables between lines.
# We could condense the commands into a single line but future you
# will hate past you when they try to debug or modify that single line.
.ONESHELL:
construct-comment-body:
	body="$$(npm run locales-coverage:description | grep "^[^>]")"
	body="$${body//'%'/'%25'}"
	body="$${body//$$'\n'/'%0A'}"
	body="$${body//$$'\r'/'%0D'}"
	echo "$$body" > comment-body.txt
```

Now both steps can be run locally and in a GitHub Action with the same commands:

```
make create-report-file  
make construct-comment-body
```

The final step uses the GitHub action
[kt3k/update-pr-description](https://github.com/kt3k/update-pr-description) to
update the PR description. We can't run this command locally without some extra
setup, but we can convert the command to use the GitHub CLI directly instead of
using a custom GitHub Action.

```make
update-description-with-coverage:
	gh pr edit $(PR_NUMBER) \
		--body-file comment-body.txt \
		--title "chore: Update translations from Crowdin"
```

The variable `PR_NUMBER` can be passed in as part of the `make` command:

```bash
make update-description-with-coverage PR_NUMBER=123
```

The resulting GitHub workflow steps get simplified to this:

```yaml
- name: Create report file  
  run: make create-report-file

- name: Construct comment body  
  run: make construct-comment-body

- name: Update description with coverage  
  run: make update-description-with-coverage PR_NUMBER={% raw %}${{ github.event.number }}{% endraw %}
  env:  
	GH_TOKEN: {% raw %}${{ secrets.GITHUB_TOKEN }}{% endraw %}
```

The Makefile can now be used by developers locally to iterate on the code
end-to-end without needing to commit and push to get feedback from the build
server.

The Makefile also doubles as an executable README. Where READMEs usually
contain instructions to `run this command --with --these --flags` to get started
or to do a certain step, developers can instead review the Makefile and execute
the relevant commands without having to copy and paste it into their terminal.

### Complex Builds

The Excalidraw example was simple since many of the workflow steps were shell
commands or could be converted to CLI commands. But what if we had a more
complex build pipeline? One that required multiple technologies and dependencies
such as running tests, building packages, or infrastructure as code.
Furthermore, how do we ensure `make` is installed on our build server?

The short answer is to use containers to run your pipeline and encapsulate the
dependency as part of the build container image. Using Docker Compose, you can
spin up the containers you need for your build, then change your Makefile targets
to call `docker compose exec` in the specific containers.

Example `docker-compose.yaml`:

```yaml
services:  
 app:  
   build:  
	 context: .  
	 # Ensure all build dependencies such
	 # as make are installed by the Dockerfile
	 dockerfile: Dockerfile

 database:  
   image: postgres

 redis:  
   image: redis
```

The `Makefile` executing commands in the containers:

```make
ci:
   docker compose exec app bash -c "make build"  
   docker compose exec app bash -c "make database-migrations"  
   docker compose exec app bash -c "make integration-tests"
```

Recently, I’ve started looking at [Earthly](https://earthly.dev) and
[Earthfile](https://docs.earthly.dev/docs/earthfile) which dubs itself as "like
Dockerfile and Makefile had a baby". With an Earthfile, you can manage your
build image and dependencies with your build steps while still being able to
run it locally. Earthfile provides a more ergonomic way to weave commands
between running Docker containers.

### Final Thoughts

As CI/CD systems continue to become more capable, it’s
important to keep an eye on your local development process. If you find yourself
pushing code for it to be run somewhere else, identify ways to eliminate the
hand-off and get the feedback you need locally.

This can include all checks that are typically run as part of the PR process
such as linting, unit tests, and even vulnerability scanning. All of these could
be wrapped in a `ci` target that can be run locally or on the build server with
a simple `make ci` command.
