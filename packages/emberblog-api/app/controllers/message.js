const { model } = require ('@onehilltech/blueprint');
const { UserResourceController } = require('@onehilltech/blueprint-gatekeeper');

module.exports = UserResourceController.extend({
    name: 'message',
    Model: model('message'),
    userPath: 'sender',
});