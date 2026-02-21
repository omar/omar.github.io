Anytime we learn something that could be beneficial in future coding sessions, automatically add it to AGENTS.md. 

This includes:

  - Gotchas that are not obvious
  - Subtle bugs that manifest under specific conditions
  - Repeat corrections I make to the output of coding agents

-----

Any CI/CD or build pipeline should be runnable locally via `make`. 
Anything referenced in GitHub Actions workflows should point to a specific make target. 
Don't write inline bash in YAML unless it's a simple thing specific to running in that environment.
