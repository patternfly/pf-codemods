const { renameProp } = require('../../helpers');

  // https://github.com/patternfly/patternfly-react/pull/8624
  module.exports = {
    meta: { fixable: 'code' },
    create: renameProp(
      'CodeEditor',
      {
        entryDelay: '',
        exitDelay: '',
        maxWidth: '',
        position: '',
        toolTipText: ''
      },
      (node, attribute) => 
        `${attribute.name.name} has been removed for ${node.name.name}. This can instead be passed via the tooltipProps prop`
    ),
  };
