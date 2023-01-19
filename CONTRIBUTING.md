# pf-codemods
An eslint plugin (with an extra CLI utility) to help ease products transitioning to our new major @patternfly/react-core 5.0.0 release.

## Goals
- We want to minimize code changes and respect existing code
- We only want to make safe modifications
  - Don't touch code that might not be PatternFly


- Most consumers are using JSX, so we can write rules that target JSXElements
  - When they're using React.createElement or React.cloneElement that introduces unsafe complications

## Design
- Use a JSX parser that leaves formatting alone as much as possible
- Add basic ESM import parsing to make sure we're only modifying PatternFly components

## Development

1. Run `node generate-replace-prop-v5 [componentName] [oldPropName] [newPropName] [referencePR]` to create the rule/test files and update from there
2. Don't forget to document the change/rule within the readme file https://github.com/patternfly/pf-codemods/blob/main/packages/pf-codemods/README.md
3. Run `yarn test:v5` to run tests
4. You can also update the `test.tsx` file and run `yarn test:v5:single` to see what a consumer would see if they were to run our codemods

If you're having trouble writing a rule, you can:
1. Put code into an AST explorer like https://astexplorer.net/ to inspect all the AST nodes
2. `console.dir(node, { depth: 5 })` to better inspect a `node` you're dealing with
3. Write rule targeting an AST node that has all the information you need. Confirm AST node exists in `lib/rules/ast-node-types.d.ts`.
4. Ask in PF slack channels
5. See eslint rule docs https://eslint.org/docs/latest/developer-guide/working-with-rules
6. Look at similar existing rules as examples

If the rule you're adding should have a severity of `warning` rather than `error`, add the rule name to the `warningRules` array in `eslint-plugin-pf-codemods/index.js`.
