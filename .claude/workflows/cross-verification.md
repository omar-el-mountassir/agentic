# Cross-Verification Workflow

Multi-Claude instance workflow for critical code changes requiring verification.

## When to Use

- **Security-sensitive changes**: Authentication, authorization, data handling
- **Core architecture modifications**: Template engine, build system, CI/CD
- **Performance optimizations**: Critical path improvements
- **Breaking changes**: API modifications, dependency upgrades

## Workflow Process

### 1. Primary Implementation (Claude A)

- Implement the requested changes
- Write comprehensive tests
- Run full quality pipeline (`just ci`)
- Document changes and rationale

### 2. Independent Review (Claude B - Reviewer Sub-agent)

```
<CCR-SUBAGENT-MODEL>reviewer</CCR-SUBAGENT-MODEL>

Please review the following changes:
- Analyze code quality and security implications
- Verify test coverage is adequate
- Check adherence to project patterns
- Identify potential issues or improvements
```

### 3. Testing Validation (Claude C - Tester Sub-agent)

```
<CCR-SUBAGENT-MODEL>tester</CCR-SUBAGENT-MODEL>

Please validate the testing strategy:
- Review existing tests for completeness
- Identify missing test scenarios
- Suggest property-based test cases
- Verify edge case coverage
```

### 4. Consensus and Finalization

- Address feedback from reviewer and tester
- Implement suggested improvements
- Re-run verification process if significant changes made
- Final validation with primary Claude instance

## Example Usage

**Security Feature Implementation**:

```bash
# Primary implementation
/review security   # Initial implementation and testing

# Cross-verification
<CCR-SUBAGENT-MODEL>reviewer</CCR-SUBAGENT-MODEL>
Review the authentication middleware implementation for security vulnerabilities...

<CCR-SUBAGENT-MODEL>tester</CCR-SUBAGENT-MODEL>
Validate the test coverage for the authentication system...
```

## Quality Gates

- [ ] All tests pass with zero warnings
- [ ] Security review completed
- [ ] Performance impact assessed
- [ ] Documentation updated
- [ ] Breaking changes documented
- [ ] Migration path provided (if applicable)

## Sub-agent Coordination

The workflow leverages specialized sub-agents:

- **Reviewer**: Senior code reviewer focusing on quality and security
- **Tester**: Testing specialist for comprehensive test coverage
- **Optimizer**: Performance specialist (when needed)

This ensures multiple expert perspectives validate critical changes.
