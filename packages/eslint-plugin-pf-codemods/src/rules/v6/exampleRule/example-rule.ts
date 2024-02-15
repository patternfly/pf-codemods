import { getFromPackage } from '../../helpers';

// https://github.com/patternfly/patternfly-react/pull/1234
module.exports = {
  meta: { fixable: 'code' },
  create: function(context: { report: (arg0: { node: any; message: string; fix(fixer: any): any; }) => void; }) {
    const {imports, exports} = getFromPackage(context, '@patternfly/react-core')
      
    const componentImports = imports.filter((specifier: { imported: { name: string; }; }) => specifier.imported.name === 'ComponentName');
    const componentExports = exports.filter((specifier: { imported: { name: string; }; }) => specifier.imported.name === 'ComponentName');

    return !componentImports.length && !componentExports.length ? {} : {
      JSXOpeningElement(node: { name: { name: any; }; attributes: any[]; }) {
        if (componentImports.map((imp: { local: { name: any; }; }) => imp.local.name).includes(node.name.name)) {
          const attribute = node.attributes.find((attr: { name: { name: string; }; }) => attr.name?.name === 'propName');
          if (attribute) {
            context.report({
              node,
              message: 'message',
              fix(fixer: { replaceText: (arg0: any, arg1: string) => any; }) {
                return fixer.replaceText(attribute, '');
              }
            });
          }
        }
      }
    };
  }
};
