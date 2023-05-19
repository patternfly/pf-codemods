const path = require("path");
const fs = require("fs");

function baseRule(ruleName, fileContent) {
  const destination = path.join(
    require
      .resolve("@patternfly/eslint-plugin-pf-codemods")
      .replace("index.js", ""),
    "lib/rules/v5",
    `${ruleName}.js`
  );

  fs.writeFileSync(destination, fileContent);
}

function genericRule({
  componentName,
  propName,
  ruleName,
  referencePR,
  message,
}) {
  // the formatting for content here looks weird, but that's to preserve indentation in the written file
  content = `const { getFromPackage } = require('../../helpers');
  
// https://github.com/patternfly/patternfly-react/pull/${referencePR}
module.exports = {
  meta: { fixable: 'code' },
  create: function(context) {
    const {imports, exports} = getFromPackage(context, '@patternfly/react-core')
      
    componentImports = imports.filter(specifier => specifier.imported.name === '${componentName}');
    componentExports = exports.filter(specifier => specifier.imported.name === '${componentName}');

    return !componentImports.length && !componentExports.length ? {} : {
      JSXOpeningElement(node) {
        if (componentImports.map(imp => imp.local.name).includes(node.name.name)) {
          const attribute = node.attributes.find(attr => attr.name?.name === '${propName}');
          if (attribute) {
            context.report({
              node,
              message: '${message}',
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
  `;
  baseRule(ruleName, content);
}

function addEventCBRule({ componentName, propName, ruleName, referencePR }) {
  content = `const { addCallbackParam } = require("../../helpers");

// https://github.com/patternfly/patternfly-react/pull/${referencePR}
module.exports = {
  meta: { fixable: "code" },
  create: addCallbackParam(["${componentName}"], { ${propName}: "_event" }),
};
`;
  baseRule(ruleName, content);
}

function swapCBRule({ componentName, propName, ruleName, referencePR }) {
  content = `const { addCallbackParam } = require("../../helpers");

// https://github.com/patternfly/patternfly-react/pull/${referencePR}
module.exports = {
  meta: { fixable: "code" },
  create: addCallbackParam(["${componentName}"], { ${propName}: { defaultParamName: "_event", previousParamIndex: 1, otherMatchers: /^_?(ev\\w*|e$)/ } }),
};
`;
  baseRule(ruleName, content);
}

module.exports = { genericRule, addEventCBRule, swapCBRule };
