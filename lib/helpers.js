module.exports = {
  getPackageImports(context, packageName) {
    return context.getSourceCode().ast.body
      .filter(node => node.type === 'ImportDeclaration')
      .filter(node => node.source.value === packageName)
      .map(node => node.specifiers)
      .reduce((acc, val) => acc.concat(val), []);
  }
}