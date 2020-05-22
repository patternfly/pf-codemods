const { renameProp } = require('../helpers');

module.exports = {
  create: renameProp(
    'PageHeader',
    { 'avatar={<Avatar  />}': 'headerTools={<PageHeaderTools> <Avatar  /> </PageHeaderTools>}', 'toolbar': 'headerTools={<PageHeaderTools  />}' },
    node => `avatar and toolbar props were removed for ${node.name.name}. use headerTools prop instead.`,
    true
  )
};