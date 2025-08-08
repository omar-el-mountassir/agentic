# /fix - Systematic Error Resolution

Systematically diagnoses and fixes common project issues following documented patterns.

**Usage:** `/fix [category]`

**Categories:**

- `lint` - Fix ESLint warnings and errors
- `test` - Resolve failing tests
- `build` - Fix build pipeline issues
- `template` - Resolve template generation problems
- `deps` - Fix dependency issues

**Process:**

1. **Diagnosis Phase**:
   - Run relevant diagnostic commands
   - Create checklist of identified issues
   - Prioritize fixes by impact and dependency

2. **Systematic Resolution**:
   - Address issues one by one
   - Verify each fix before proceeding
   - Re-run diagnostics after each change

3. **Validation Phase**:
   - Run complete test suite
   - Verify quality gates pass
   - Confirm no regressions introduced

**Examples:**

```
/fix lint          # Fix all linting issues
/fix test          # Resolve failing tests
/fix              # Comprehensive diagnosis and fix
```

**Troubleshooting Integration**:

- Uses `claude doctor` for installation issues
- Follows Error Recovery patterns from CLAUDE.md
- Creates systematic approach to complex problems
