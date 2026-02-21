---
layout: post
title: "AI Coding Habits"
excerpt_separator: <!--more-->
share_excerpt: >
  After coding with agents, I've settled into two habits that have meaningfully improved the experience: keeping a self-documenting AGENTS.md in every repo and doubling down on making everything runnable locally.
---

After coding with agents, I've settled into two habits that have meaningfully improved the experience: keeping a self-documenting AGENTS.md in every repo and doubling down on making everything runnable locally.

<!--more-->

## AGENTS.md by Default

[AGENTS.md](https://agents.md) is an open standard and a README for AI agents, supported by major AI coding tools. It's the project-level context file that agents pick up at the start of every session. For Claude Code users, this will be `CLAUDE.md` but you can symlink it to `AGENTS.md` or reference it as `See @AGENTS.md` in `CLAUDE.md`.

The key thing I've added to the top of every `AGENTS.md` is this:

> Anytime we learn something that could be beneficial in future coding sessions, automatically add it to AGENTS.md. 
>
> This includes:
>
>  - Gotchas that are not obvious
>  - Subtle bugs that manifest under specific conditions
>  - Repeat corrections I make to the output of coding agents
>

This single instruction turns `AGENTS.md` from a static configuration file into a living document. When a session surfaces something worth remembering like a non-obvious interaction between two libraries, a deployment constraint, a pattern that works well in this codebase, or corrective instructions, the agent writes it down before the session ends. The next session picks it up.

"Repeat corrections" is the most valuable entry. Every codebase has conventions and preferences that diverge from what an agent will produce by default. Without capturing them, you spend time every session correcting them, unless the agent happens to pull that information into its context while working.

Things like:

- "Don't wrap every function in try/catch. Only handle errors at system boundaries."
- "Don't add comments explaining what the code does. Only add comments when the *why* isn't obvious."
- "This project must use version 1.0 of package XYZ because version 1.1 has an unpatched CVE."

Once these are in `AGENTS.md`, you stop making the same corrections. The agent arrives already knowing your preferences.

The instruction to *automatically* add things is deliberate. If I had to remember to tell the agent to "write that down," I'd forget half the time. Making it automatic means the document grows without friction.

## Minimize Build-Server-In-The-Loop

I wrote about [build server pong]({% post_url 2025-04-14-stop-playing-pong-with-your-build-server %}) last year. It's the slow, expensive loop of committing code, pushing it, and waiting for a remote system to tell you whether it worked. The fix is to make your build steps runnable locally so you can iterate without the round-trip.

Working with agents makes this problem more apparent because agentic coding is about speed and iteration. Waiting on your build server to give feedback to an agent only slows the agent's flow.

Agents are remarkably good at generating declarative configuration: GitHub Actions workflows, Kubernetes manifests, Terraform files, Docker Compose stacks. They produce it quickly and it looks correct. The temptation is to just commit and push to find out. You're playing pong at the speed of autocomplete.

The same principle applies here as before: *if you can't run it locally, you can't iterate on it quickly*. The mitigation is the same: wrap your logic in scripts or Makefile targets and have your declarative configuration call those. The declarative layer becomes a thin wrapper that injects environment-specific values. The actual logic lives somewhere you can execute directly.

I've started to include this constraint in my `AGENTS.md`: 

> Any CI/CD or build pipeline should be runnable locally via `make` (or your task runner of choice). 
> Anything referenced in GitHub Actions workflows should point to a specific Makefile target.
> Don't write inline bash in YAML unless it's a simple thing specific to running in that environment.

The agent will generally produce code that respects this constraint if you state it clearly. If you don't, it will happily generate a workflow file full of inline shell commands that can only be tested by pushing a commit.

Additionally, with a functional make target, the agent will have a deterministic way to run a specific portion of the build pipeline. No need to read inlined bash in YAML then execute it. This saves you on tokens and makes for a tighter [Ralph Wiggum Loop](https://ghuntley.com/loop/).

## Final Thoughts

Agentic coding is a force multiplier. That means it amplifies whatever workflow you bring to it, effective or not. These habits will help make sure what gets multiplied is worth multiplying.
