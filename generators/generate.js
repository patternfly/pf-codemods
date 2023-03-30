const path = require("path");
const fs = require("fs");

function generate(newRuleName) {
  if (!newRuleName) {
    console.log("usage: node generate [newRuleName]");
    process.exit(1);
  }

  console.log("Generating rule", newRuleName);
  // Write rule file
  fs.writeFileSync(
    path.join(
      require.resolve('@patternfly/eslint-plugin-pf-codemods').replace('index.js', ''),
      "lib/rules/v5",
      `${newRuleName}.js`
    ),
    `const { getPackageImports } = require('../../helpers');
  
  // https://github.com/patternfly/patternfly-react/pull/YOURNUMBERHERE
  module.exports = {
    create: function(context) {
      const imports = getPackageImports(context, '@patternfly/react-core')
        .filter(specifier => specifier.imported.name === 'YOURCOMPONENTNAME');
        
      return imports.length == 0 ? {} : {
        JSXOpeningElement(node) {
          if (imports.map(imp => imp.local.name).includes(node.name.name)) {
            const attribute = node.attributes.find(attr => attr.name?.name === 'variant');
            if (attribute) {
              context.report({
                node,
                message: 'YOUR_MESSAGE_HERE',
                fix(fixer) {
                  return fixer.replaceText(attribute, '');
                }
              });
            }
          }
        }
      };
    }
  };
  `
  );
  // Write test file
  fs.writeFileSync(
    path.join(
      require.resolve('@patternfly/eslint-plugin-pf-codemods').replace('index.js', ''),
      "test/rules/v5",
      `${newRuleName}.js`
    ),
    `const ruleTester = require('../../ruletester');
  const rule = require('../../../lib/rules/v5/${newRuleName}');
  
  ruleTester.run("${newRuleName}", rule, {
    valid: [
      {
        code: \`VALID_CODE_HERE\`,
      }
    ],
    invalid: [
      {
        code:   \`import { } from '@patternfly/react-core';\`,
        output: \`import { } from '@patternfly/react-core';\`,
        errors: [{
          message: \`YOUR_MESSAGE_HERE\`,
          type: "JSXOpeningElement",
        }]
      },
    ]
  });
  `
  );
}

module.exports = generate;
