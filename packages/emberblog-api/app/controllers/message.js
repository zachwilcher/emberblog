const { model } = require ('@onehilltech/blueprint');
const { ResourceController } = require('@onehilltech/blueprint-mongodb');

module.exports = ResourceController.extend({
    name: 'message',
    Model: model('message'),

    create () {
        return this._super.call (this, ...arguments).extend ({
            prepareDocument (req, doc) {
                console.log(req.body);
                return doc;
            }
        });
    }
});