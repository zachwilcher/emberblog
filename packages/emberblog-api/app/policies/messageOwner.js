const { Policy, UnauthorizedError } = require ('@onehilltech/blueprint');
const blueprint = require ('@onehilltech/blueprint');


//gatekeeper.resource.owner but hardcoded in message stuff

module.exports = Policy.extend({

    failureCode: 'invalid_owner',

    failureMessage: 'You are not the owner of the resource.',

    _Model: null,

    init() {
        this._super.call (this, ...arguments);

        this._Model = blueprint.lookup('model:message');

    },
    runCheck(req) {
        const _id = req.params['messageId'];

        const selection = { _id, 'sender': req.user._id };
        console.log(req.user);

        return this._Model.findOne (selection).then (model => !!model);
    }
});