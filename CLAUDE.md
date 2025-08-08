# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Context & Memory Management

This CLAUDE.md acts as the **persistent project memory** for this agentic systems monorepo. It provides essential context that persists across Claude Code sessions, enabling immediate productivity without re-contextualizing project specifics each time.

**Session Context Management**:

- Use `/compact` at natural breakpoints (e.g., after completing features) to summarize conversations and preserve important context in long sessions
- Use `/clear` when switching to completely different tasks to reset the context window
- Use `#` shortcut to quickly add memories to relevant files
- Use `@` references (e.g., `@packages/tools/`) for specific files or directories when directing work on components within sub-packages

## Core Architecture

This is a monorepo workspace for AI agentic systems with intelligent **multi-directory awareness**:

- **Workspace Root**: Contains shared configuration and orchestration
- **packages/**: Contains specialized modules (app, docs, template, tools) - Claude Code can intelligently navigate child directory contexts
- **src/**: Contains template processing and content management
- **scripts/**: Build and generation utilities for automation
- **tests/**: Test suite using Vitest with property-based testing

## Essential Commands

**Command Awareness**: These commands are inherited from the bash environment and enable Claude Code to perform common tasks without "figuring them out each time". Note that documenting tools Claude already knows (like basic Unix tools or `gh CLI`) is less critical than documenting custom convenience scripts you've built.

### Development & Quality Gates

- `npm test` - Run test suite with Vitest (Claude Code will run to verify changes)
- `npm run test:watch` - Run tests in watch mode for iterative development
- `npm run lint` - ESLint with zero warnings policy (Claude Code will run to identify and fix issues)
- `npm run format` - Format code with Prettier (automatic code style compliance)

### Build & Generation (Template-Driven System)

**Automated Generation Priority**: Prevents over-engineering by using production-ready generation processes instead of manual edits.

- `npm run render:readme` - Generate README from `README.template.md` using `.env` configuration
- `npm run render:license` - Generate LICENSE files via template system
- `npm run render:roadmap` - Generate project roadmap automatically
- `npm run docs` - Generate TypeDoc documentation
- `just render` - Run all generators in sequence (requires Just task runner)
- `just ci` - Complete CI pipeline (install, render, test, lint) - matches production workflow

### Content Generation

- `npm run narrate` - Generate quickstart documentation
- `npm run graph` - Build typed graph visualization

## Development Workflow & Git Operations

**Claude Code Git Intelligence**: Claude Code can handle git operations, write descriptive commit messages based on changes and recent history, maintaining consistency across contributions. **Use `gh CLI` for all GitHub-related tasks** including managing issues and pull requests directly from Claude.

1. **Conventional Commits**: All commit messages must follow conventional format (enforced by commitlint)
2. **Test-Driven Development**: Keep PRs small and test-driven as per Copilot Covenant principles
3. **Template-First Approach**: Always prefer updating templates over direct manual edits
4. **README Protocol**: Update `README.template.md` → run `npm run render:readme` (never edit README.md directly)
5. **LICENSE Protocol**: Managed via template system in `packages/tools/` (automated generation only)
6. **GitHub Integration**: Use `gh` CLI for issues, PRs, and repository management rather than web interface

## Key Files & Template System

**Template-Driven Configuration**: The `.env` file serves as the single source of truth for all generated content, ensuring consistency and preventing manual edit conflicts. **Claude can read external documentation and URLs** when provided for additional context.

- **`.env`** - Central configuration driving all template rendering (README, LICENSE, roadmap)
- **`README.template.md`** - Source template for generated README (edit this, never README.md)
- **`packages/template/`** - Template processing utilities with `{{VAR}}` syntax parsing
- **`packages/tools/`** - CLI tools for automated license and roadmap generation
- **`.github/copilot-instructions.md`** - Copilot Covenant with executable development guidelines
- **External Resources** - Claude can access and incorporate external documentation URLs and references when provided

## Testing Strategy & Quality Assurance

**Claude Code Testing Intelligence**: Claude Code can create, run, and verify tests, iterating until tests pass and handling edge cases through property-based testing. **Write tests that exercise real functionality without excessive mocking** to avoid "testing nothing useful".

- **Framework**: Vitest with property-based testing via fast-check
- **Test Location**: `tests/` directory with comprehensive coverage requirements
- **Quality Gates**: All tests must pass + zero lint warnings (enforced in CI)
- **Development Flow**: Write tests first, implement functionality, verify with `npm test`
- **Testing Philosophy**: Focus on integration tests that verify actual behavior rather than mock-heavy unit tests
- **Property-Based Testing**: Use fast-check to generate edge cases and ensure robust implementations

## Code Standards & Quality Control

**Claude Code Linting Intelligence**: Claude Code acts as an advanced linter, identifying issues beyond traditional tools and automatically fixing failing builds or linter warnings.

- **Module System**: ES2022 modules with TypeScript configuration for modern JavaScript
- **Linting**: ESLint v9 with flat config (`eslint.config.mjs`) - zero warnings policy
- **Formatting**: Prettier with consistent project-wide configuration
- **Pre-commit Hooks**: Husky + lint-staged ensuring quality gates before commits
- **CI Integration**: Automated quality checks prevent backward compatibility issues
- **Automated Formatting**: Consider adding hooks for automatic formatting (prettier or similar) after every file edit to ensure deterministic code style compliance

## Package-Specific Context

**Multi-Directory Intelligence**: Each package serves specific purposes in this agentic systems ecosystem. **Consider dedicated CLAUDE.md files within specific packages/** for frontend/backend-specific context that Claude intelligently uses when operating in those folders.

- **`packages/app/`** - Next.js 15 + React 19 frontend application with Tailwind CSS v4
  - **Architecture**: Modern React SPA with server-side rendering capabilities
  - **Commands**: `npm run dev` (development), `npm run build` (production), `npm start` (serve built)
  - **Stack**: ES modules, TypeScript, cutting-edge React features, Tailwind CSS v4
  - **Dependencies**: Next.js canary, React 19 RC, PostCSS, Autoprefixer

- **`packages/template/`** - Template processing engine with `{{VAR}}` syntax
  - **Purpose**: Core utility for all automated generation workflows
  - **Functionality**: Handles .env variable substitution across project files
  - **Architecture**: ES module exports with template parsing utilities
  - **Integration**: Used by all generation scripts (README, LICENSE, roadmap)

- **`packages/docs/`** - Documentation generation and management
  - **Structure**: Contains docs/ and src/ subdirectories
  - **Integration**: Works with TypeDoc for API documentation generation
  - **Workflow**: Source templates → processing → rendered documentation

- **`packages/tools/`** - CLI utilities for license, roadmap, and workflow automation
  - **Structure**: Contains bin/ directory with executable scripts
  - **Functionality**: Automated license generation, roadmap creation, workflow tooling
  - **Integration**: Accessed via npm scripts (render:license, render:roadmap)

## Environment Setup & Dependencies

**Development Environment Requirements**:

- **Node.js**: Version 18+ required for ES2022 modules and workspace dependencies
- **Package Manager**: npm workspaces for monorepo dependency management
- **Task Runner**: Just (Justfile) for orchestrated build processes - install with `cargo install just` or package manager
- **Git**: Required for conventional commits and pre-commit hooks
- **GitHub CLI**: Install `gh` for GitHub integration and issue/PR management
- **MCP Integration**: Filesystem MCP server configured with specific permissions

**Setup Instructions**:

1. Clone repository and run `npm install` in root
2. Verify Just installation: `just --list`
3. Run initial setup: `just ci` to validate complete pipeline
4. Configure Claude Code: Ensure `.claude/settings.local.json` permissions are correct

**Dependency Strategy**:

- **Shared devDependencies**: ESLint, Prettier, Vitest, TypeScript at workspace root
- **Package-specific dependencies**: Individual package.json files for package requirements
- **Version Alignment**: Maintained across workspace packages to prevent conflicts
- **Security Audits**: Regular dependency audits via `npm audit` integrated into CI pipeline

## Error Recovery & Troubleshooting

**System Health Check**: Use `claude doctor` to check installation health and diagnose common configuration issues.

**Troubleshooting Strategy**: Provide Claude with detailed error messages and stack traces for effective debugging. Create to-do lists for complex fixes and allow for course correction if Claude goes "off the rails".

**Common Failure Patterns & Solutions**:

### Generator Failures

- **Problem**: Template rendering fails
- **Recovery**: Check `.env` variables → verify template syntax → run `just render`
- **Verification**: Confirm generated files match expected output
- **Debug**: Check template parsing logs and variable substitution

### Test Failures

- **Problem**: Vitest tests fail
- **Recovery**: Run `npm run test:watch` → identify failing test → fix implementation → verify with `npm test`
- **Property-based testing**: Use fast-check for edge case coverage
- **Debug**: Review test output, check mocks and assertions, verify test data

### Lint Errors

- **Problem**: ESLint warnings/errors
- **Recovery**: Run `npm run lint` → address issues one by one → use `npm run format` for auto-fixes
- **Zero warnings policy**: All warnings must be resolved before commits
- **Systematic Approach**: Create checklist of errors, fix and verify each sequentially

### Build Pipeline Failures

- **Problem**: `just ci` fails
- **Recovery**: Run components individually: `npm ci` → `just render` → `npm test` → `npm run lint`
- **Systematic approach**: Address each stage failure before proceeding
- **Debug**: Check each pipeline stage output for specific error details

### Claude Code Issues

- **Installation Problems**: Run `claude doctor` for diagnostic information
- **Context Issues**: Use `Esc` to interrupt Claude's thought process if going off-track
- **Permission Issues**: Verify `.claude/settings.local.json` configuration

## Security Guidelines

**Agentic Systems Security**: Claude Code uses strict read-only permissions by default and requests explicit permission for system-modifying actions.

- **API Keys**: Use GitHub Secrets, never commit to repository
- **MCP Permissions**: Personal MCP allowed lists and permission configurations managed in `.claude/settings.local.json` (not in this CLAUDE.md which is for instructions)
- **Default Security**: Claude Code has strict read-only permissions by default, with write access restricted to working directory and subfolders
- **Template Security**: Sanitize all `.env` variables used in generation to prevent injection attacks
- **Dependency Security**: Regular audits of workspace dependencies via `npm audit`
- **Code Generation**: Validate all generated code for security implications before deployment
- **Permission Model**: Explicitly allow MCP tools using `--allowedTools` flag or settings configuration

## Integration Points & MCP Configuration

**Model Context Protocol Setup**:

- **Filesystem MCP**: Configured with specific permissions for file operations
- **Allowed Operations**: `directory_tree`, `list_directory`, `read_file`, `write_file`, `read_multiple_files`
- **Security Boundary**: Restricted to project workspace only
- **Configuration**: Permissions managed in `.claude/settings.local.json`

**MCP Debugging & Advanced Features**:

- **Debug Mode**: Launch Claude with `--mcp-debug` to identify configuration issues
- **Tool Permissions**: Use `--allowedTools` flag for security-controlled MCP tool access
- **Multi-Provider Support**: Claude Code Router with `<CCR-SUBAGENT-MODEL>` tag for subagents in advanced workflows

**External Integrations**:

- **GitHub Actions**: Automated CI/CD with conventional commits
- **Template System**: `.env` → generation pipeline → output files
- **Documentation Flow**: Source templates → TypeDoc → rendered docs
- **MCP Ecosystem**: Can connect to hundreds of external tools and data sources (Google Drive, Jira, Sentry, Postgres, Figma, Slack)

**Performance Considerations**:

- **Command Efficiency**: Use `just ci` for full pipeline, individual commands for targeted fixes
- **Template Generation**: Batch operations with `just render` rather than individual generators
- **Test Optimization**: Use `npm run test:watch` during development, `npm test` for verification
- **Context Optimization**: Use `/compact` to manage context and reduce token usage in long sessions

## Agentic Capabilities & Automation

**Intelligent Junior Developer**: Claude Code functions as an intelligent developer that maintains project context, follows established patterns, and executes repeatable workflows through this documented system.

**Advanced Capabilities**:

- **Multi-package awareness** with intelligent context switching
- **Error recovery automation** following documented patterns
- **Template-driven development** preventing manual edit conflicts
- **Quality gate enforcement** through automated testing and linting

**Deployment Modes**:

- **Interactive Mode**: Standard development with real-time collaboration
- **Headless Mode**: `claude -p` for non-interactive contexts (CI/CD, build scripts, large-scale migrations)
- **Parallel Agent Development**: Multiple Claude instances operating concurrently on different codebase parts
- **Cross-Verification**: Multiple Claude instances can verify each other's work for critical changes

**Custom Automation**:

- **Slash Commands**: Custom commands stored in `.claude/commands/` automatically shared across team via Git
- **Hooks**: Deterministic control via lifecycle hooks (PreToolUse, PostToolUse, Notification, Stop) for automated formatting, logging, or custom permissions

## General Best Practices

**Prompting Strategies**:

- **Be Clear and Direct**: Use detailed, specific instructions for optimal results
- **Use Keywords**: "important," "proactively," or "production ready" influence Claude's behavior and token usage
- **Prevent Over-engineering**: Explicitly tell Claude not to overengineer or keep old code for backwards compatibility
- **Think Hard Mode**: Use "think hard" in prompts for complex problems to get detailed thought processes
- **Verbose Mode**: Use `--verbose` flag for debugging Claude's turn-by-turn output

**Active Collaboration**:

- **Course Correction**: Be an active collaborator, course-correct early and often
- **Interrupt Control**: Use `Esc` key to interrupt Claude's thought process if going off-track
- **Context Management**: Use `/compact` and `/clear` strategically to manage session context
- **Error Communication**: Provide detailed error messages and stack traces for effective debugging

**Workflow Optimization**:

- **Multi-Claude Workflows**: Consider parallel Claude instances for large codebases or cross-verification
- **Custom Slash Commands**: Create repeatable workflows with custom commands in `.claude/commands/`
- **Hook Integration**: Use lifecycle hooks for automated formatting, logging, and custom permissions
- **Session Management**: Use natural breakpoints for compacting context and preserving important state

**Quality Assurance**:

- **Test-First Development**: Write tests that exercise real functionality, avoid excessive mocking
- **Systematic Error Fixing**: Create checklists for complex fixes, address issues sequentially
- **Code Review**: Use multi-Claude verification for critical changes
- **Production Readiness**: Always validate generated code before deployment
