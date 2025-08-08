# CLAUDE.md - packages/template/

Template processing engine context for automated generation workflows.

## Package Overview

Core template processing utility that powers all automated generation in the monorepo.

**Purpose**: Template processing with `{{VAR}}` syntax substitution
**Integration**: Used by all generation scripts (README, LICENSE, roadmap)
**Architecture**: ES module exports with template parsing utilities

## Key Functionality

**Template Processing**:

- Parse `{{VAR}}` syntax in template files
- Substitute variables from `.env` configuration
- Handle conditional logic and loops
- Support nested variable references

**Integration Points**:

- `npm run render:readme` - README generation
- `npm run render:license` - LICENSE file generation
- `npm run render:roadmap` - Project roadmap generation
- Custom generation scripts via `packages/tools/`

## Development Patterns

**Template Syntax**:

```
{{WORKSPACE_NAME}} - Simple variable substitution
{{#if CONDITION}}...{{/if}} - Conditional blocks
{{#each items}}...{{/each}} - Iteration blocks
```

**Variable Sources**:

- `.env` file in workspace root
- Environment variables
- Dynamic generation (dates, versions)
- Package.json metadata

**Error Handling**:

- Validate template syntax before processing
- Provide clear error messages for missing variables
- Handle malformed template gracefully
- Log template processing steps for debugging

## Template Security

**Sanitization**:

- Escape HTML characters in substituted content
- Prevent template injection attacks
- Validate variable names and content
- Secure handling of sensitive configuration

**Best Practices**:

- Always validate `.env` variables before use
- Use explicit variable declarations
- Avoid dynamic template generation from user input
- Test templates with edge case data

## Testing Strategy

**Template Validation**:

- Test with various `.env` configurations
- Verify conditional logic works correctly
- Test loop iterations with different data sets
- Validate error handling with malformed templates

**Integration Testing**:

- Test complete generation workflows
- Verify generated files match expected output
- Test template changes don't break existing workflows
- Validate security measures prevent injection

## Usage Examples

**Basic Usage**:

```javascript
import { processTemplate } from '@agentic/template';

const result = processTemplate(templateContent, variables);
```

**Advanced Features**:

```javascript
const result = processTemplate(template, {
  variables: envVars,
  conditionals: true,
  loops: true,
  sanitize: true,
});
```
