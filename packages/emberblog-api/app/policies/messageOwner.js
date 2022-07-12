const { Policy } = require ('@onehilltech/blueprint');
const Model = require('../models/message');

// gatekeeper.resource.owner but hardcoded in message stuff
// Isn't this: ``` check('gatekeeper.resource.owner', 'messageId', 'message@sender') ``` what I want?

module.exports = Policy.extend({

    failureCode: 'invalid_owner',

    failureMessage: 'You are not the owner of the message.',

    runCheck(req) {

        // where _id == req.params['messageId'] and sender == req.user._id
        const selection = { '_id': req.params['messageId'], 'sender': req.user._id };

        return Model.findOne (selection).then (model => !!model);
    }
});