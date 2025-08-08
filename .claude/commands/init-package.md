# /init-package - Initialize New Package

Creates a new package in the monorepo with proper structure and configuration.

**Usage:** `/init-package <package-name> <type>`

**Package Types:**

- `app` - Frontend application (Next.js + React)
- `lib` - Shared library/utility package
- `tool` - CLI tool or automation script
- `docs` - Documentation package

**Actions:**

1. **Create Package Structure**:
   - Create `packages/<package-name>/` directory
   - Generate appropriate `package.json` with workspace configuration
   - Set up TypeScript configuration if applicable
   - Create basic directory structure (src/, tests/, etc.)

2. **Configure Integration**:
   - Add to workspace root dependencies if needed
   - Update relevant npm scripts
   - Configure ESLint and Prettier inheritance
   - Set up Vitest configuration for testing

3. **Generate Documentation**:
   - Create package-specific `CLAUDE.md` with context
   - Generate `README.md` template
   - Add to main project documentation

4. **Quality Setup**:
   - Configure lint-staged for package
   - Add to CI pipeline configurations
   - Set up appropriate test structure

**Example:**

```
/init-package analytics app
/init-package shared-utils lib
/init-package migration-tool tool
```

Creates production-ready package following monorepo patterns.
