# Copilot Covenant (Executable Instructions)

This document guides AI assistants interacting with this repo.

## Core Principles

- Follow Conventional Commits
- Keep PRs small and test-driven
- Prefer automated generators (README, LICENSE, ROADMAP) over manual edits

## Prompt Templates

- Refactor: Explain intent, tests, and migration; update docs and scripts
- Feature: Add minimal failing tests first, then implement, then docs
- Docs: Update README.template.md and regenerate README

## Self-Modification

- Propose PRs that update this file when best practices evolve
- Include a semantic diff rationale and test updates

## Repo Signals

- .env drives templating for README and LICENSE
- Use packages/template for {{VAR}} rendering

## CI Expectations

- Tests must pass (vitest)
- Lint and format must pass
- Generators must run cleanly
