const path = require('path');
const fs = require('fs');

const componentName = process.argv[2]
const oldPropName = process.argv[3]
const newPropName = process.argv[4]
const referencePR = process.argv[5]
if (!componentName || !oldPropName || !newPropName || !referencePR) {
  console.log('usage: node generate-replace-prop-v5 [componentName] [oldPropName] [newPropName] [referencePR]');
  process.exit(1);
}
const lowerCasedComponentName = componentName[0].toLowerCase() + componentName.substring(1);
const newRuleName = `${lowerCasedComponentName}-remove-${oldPropName}`

console.log('Generating rule', newRuleName);
// Write rule file
fs.writeFileSync(path.join(
    __dirname,
    'packages/eslint-plugin-pf-codemods/lib/rules/v5',
    `${newRuleName}.js`
  ),
  `const { renameProp } = require('../../helpers');

  // https://github.com/patternfly/patternfly-react/pull/${referencePR}
  module.exports = {
    meta: { fixable: 'code' },
    create: renameProp(
      '${componentName}',
      {'${oldPropName}': '${newPropName}'},
      node =>  \`${oldPropName} prop has been removed for \${node.name.name} and replaced with the ${newPropName} prop.\`
    ),
  };
`);
// Write test file
fs.writeFileSync(path.join(
  __dirname,
  'packages/eslint-plugin-pf-codemods/test/rules/v5',
  `${newRuleName}.js`
),
`const ruleTester = require('../../ruletester');
const rule = require('../../../lib/rules/v5/${newRuleName}');

ruleTester.run("${newRuleName}", rule, {
  valid: [
    {
      code: \`import { ${componentName} } from '@patternfly/react-core'; <${componentName} ${newPropName} />\`,
    },
    {
      // No @patternfly/react-core import
      code: \`<${componentName} ${oldPropName} />\`,
    }
  ],
  invalid: [
    {
      code:   \`import { ${componentName} } from '@patternfly/react-core'; <${componentName} ${oldPropName} />\`,
      output: \`import { ${componentName} } from '@patternfly/react-core'; <${componentName} ${newPropName} />\`,
      errors: [{
        message: \`${oldPropName} prop has been removed for ${componentName} and replaced with the ${newPropName} prop.\`,
        type: "JSXOpeningElement",
      }]
    }
  ]
});
`
);