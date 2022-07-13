
const { policies: { all, check } } = require('@onehilltech/blueprint');
module.exports = all.ordered(['gatekeeper.auth.bearer', check('gatekeeper.resource.owner', 'messageId', 'message@sender')])
