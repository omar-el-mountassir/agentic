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
- Use context7 (when available) to fetch the latest upstream docs and APIs for our stack (Next.js, React, TS, Tailwind, Docusaurus, GitHub Actions)

## CI Expectations

- Tests must pass (vitest)
- Lint and format must pass
- Generators must run cleanly

## Beginner-first execution rules

- Assume the user is new; prefer doing the change with clear, small commits
- Keep a short checklist visible; batch read-only ops and checkpoint after 3-5 steps
- If missing details, infer 1-2 reasonable defaults and proceed; ask only if blocked

## Self-patching by AI agents

- For refactors: add/adjust tests first, then change code, then docs; include a migration note
- For features: add a minimal failing test, implement, document, and wire CI scripts
- When updating this covenant, include a semantic diff rationale and links to affected tests and workflows
