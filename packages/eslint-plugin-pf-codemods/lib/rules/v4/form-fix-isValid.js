const { getFromPackage } = require('../../helpers');

// https://github.com/patternfly/patternfly-react/pull/YOURNUMBERHERE
module.exports = {
  meta: { fixable: 'code' },
  create: function(context) {
    const imports = getFromPackage(
      context,
      "@patternfly/react-core"
    ).imports.filter((specifier) =>
      ["TextInput", "TextArea", "FormSelect", "FormGroup"].includes(
        specifier.imported.name
      )
    );
      
    return imports.length == 0 ? {} : {
      JSXOpeningElement(node) {
        if (imports.map(imp => imp.local.name).includes(node.name.name)) {
          const attribute = node.attributes.find(node => node.name && node.name.name === 'isValid');
          if (attribute) {
            context.report({
              node,
              message: `${attribute.name.name} prop has been replaced with validated={'default' | 'error' | 'success'}`,
              fix(fixer) {
                // https://github.com/facebook/jsx/blob/master/AST.md
                // isValid
                // isValid="stringIsAlwaysTrue"
                // isValid={/* Empty */}
                // isValid={...spreadIsAlwaysTrue}
                let replacementValue = '"default"';

                if (attribute.value && attribute.value.type === 'JSXExpressionContainer') { // isValid={cond}
                  const boolCondition = context.getSourceCode().getText(attribute.value.expression);
                  if (boolCondition === 'false') {
                    replacementValue = '"error"'
                  }
                  else if (boolCondition !== 'true') {
                    replacementValue = `{(${boolCondition}) ? 'default' : 'error'}`;
                  }
                }

                return fixer.replaceText(attribute, `validated=${replacementValue}`);
              }
            });
          }
        }
      }
    };
  }
};
