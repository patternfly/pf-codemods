# pf-3-to-4

CLI utility to help ease products transitioning to our new major @patternfly/react-core 4.0.0 release.

## Goals
- We want to minimize code changes and respect existing code
- We only want to make safe modifications
  - Don't touch code that we aren't sure is PatternFly

## redallen rationale
- Most consumers are using JSX
  - When they're using React.createElement or React.cloneElement that introduces unsafe complications

## Design
- Use a JSX parser that leaves formatting alone as much as possible
- Add basic ESM import parsing to make sure we're only modifying PatternFly `<Button>`s


## Development
This is what @redallen does to develop a rule:
1. Copy a rule at `lib/rules/*`
2. Add it to `lib/plugins.js` and to `.eslintrc.json`
3. Copy a test at `test/rules/*`
4. Put code into an AST explorer like https://astexplorer.net/ . Add code to "failing" version of test.
5. Write rule targeting specific AST node. Confirm AST node exists in `lib/rules/ast-node-types.d.ts`.
6. Amend `test/test.tsx` with code that requires fixing.
7. Develop fixer while testing it with `npm run test -- --fix`
