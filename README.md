# pf-codemods
An eslint plugin (with an extra CLI utility) to help ease products transitioning to our new major @patternfly/react-core 4.0.0 release.

## Usage

```sh
npx pf-codemods ./path-to-src
```

## Goals
- We want to minimize code changes and respect existing code
- We only want to make safe modifications
  - Don't touch code that might not be PatternFly

## redallen rationale
- Most consumers are using JSX, so we can write rules that target JSXElements
  - When they're using React.createElement or React.cloneElement that introduces unsafe complications

## Design
- Use a JSX parser that leaves formatting alone as much as possible
- Add basic ESM import parsing to make sure we're only modifying PatternFly `<Button>`s

## Development
This is what @redallen does to develop a rule:
1. Copy a similar rule from `eslint-plugin-pf-codemods/lib/rules/*`
2. Add it to the `rules` object at the top of `eslint-plugin-pf-codemods/index.js`
3. Copy a test at `test/rules/*` and write your test cases. Run `node test/rules/my-rule.js` to test the rule

If you're having trouble writing a rule, you can:
1. Put code into an AST explorer like https://astexplorer.net/ to inspect all the AST nodes
2. `console.dir(node, { depth: 5 })` to better inspect the node
3. Write rule targeting an AST node that has all the information you need. Confirm AST node exists in `lib/rules/ast-node-types.d.ts`.
4. Ask zallen on the RHUX or PatternFly Slack
