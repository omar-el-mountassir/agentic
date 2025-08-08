# /deploy - Deployment Preparation

Prepares the monorepo for deployment with all quality gates and generation steps.

**Usage:** `/deploy [environment]`

**Actions:**

1. **Pre-deployment Checks**:
   - Verify git status is clean
   - Run `just ci` for complete pipeline
   - Check all tests pass with zero warnings
   - Validate generated files are up-to-date

2. **Environment-Specific Setup**:
   - **staging**: Run with development optimizations
   - **production**: Full optimizations and security validations

3. **Documentation Sync**:
   - `npm run render:readme` - Update README from template
   - `npm run render:license` - Generate current license files
   - `npm run docs` - Generate TypeDoc documentation

4. **Security Validation**:
   - Audit dependencies with `npm audit`
   - Check for committed secrets or keys
   - Verify .env security practices

**Example:**

```
/deploy production
/deploy staging
```

Ensures deployment-ready state with comprehensive validation.
