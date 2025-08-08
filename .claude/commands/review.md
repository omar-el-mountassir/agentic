# /review - Code Review & Quality Check

Performs comprehensive code review following the project's quality standards.

**Usage:** `/review [target]`

**Actions:**

1. **Run Quality Gates**: Execute full quality pipeline
   - `npm run lint` - Check for linting errors
   - `npm test` - Run test suite
   - `npm run format` - Apply code formatting
   - `just render` - Verify template generation

2. **Code Analysis**: Review recent changes for:
   - **Architecture Compliance**: Follows monorepo patterns
   - **Security**: No exposed secrets, proper sanitization
   - **Testing**: Adequate test coverage, real functionality tests
   - **Documentation**: Updated templates and generated docs

3. **Generate Report**: Create checklist of findings and recommendations

**Example:**

```
/review packages/app
/review
```

This command ensures all changes meet production standards before commits.
