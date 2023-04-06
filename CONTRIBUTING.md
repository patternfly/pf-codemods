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

1. Run `yarn generate` to start the interactive CLI for the generator
    - It will create the rule/test files and update the README/test.tsx files as needed
    - Select the `generic` generator if you don't see a more applicable one. It will create the necessary rule and test files as well as update the README and `test.tsx` files, using prop removal as a template. This will give you a canvas to modify as needed for the specific codemod you're writing.
1. Run `yarn test:v5` to run tests for upgrading from v4 to v5
    - This will simply output which tests pass or fail
    - You can also replace `v5` with another version directory within the repo
1. Run `yarn test:v5:single` to run the `pf-codemods` command against the `test.tsx` file and to check what error/warning messages a consumer would see when running our codemods
    - You can also run `yarn test:v5:single --fix` to see what the `test.tsx` file looks like after fixes are applied, allowing you to check whether fixes are applied as expected. Make sure to not save the `test.tsx` file after applying fixes.

## Troubleshooting

If you're having trouble writing a rule, you can:
1. Put code into [AST explorer](https://astexplorer.net/) to inspect all the AST nodes of the input code. You should choose "JavaScript" as the language and "acorn" as the parser
    - This will provide a realtime view of what output your codemod will produce during development
1. `console.dir(node, { depth: 5 })` to better inspect a `node` you're dealing with
1. Write rule targeting an AST node that has all the information you need. Confirm AST node exists in `lib/rules/ast-node-types.d.ts`.
1. Ask in PF slack channels
1. See [eslint rule docs](https://eslint.org/docs/latest/developer-guide/working-with-rules) 
1. Look at similar existing rules as examples

If the rule you're adding should have a severity of `warning` rather than `error`, add the rule name to the `warningRules` array in `eslint-plugin-pf-codemods/index.js`.
