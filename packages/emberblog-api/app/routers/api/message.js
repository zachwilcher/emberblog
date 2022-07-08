const { Router } = require('@onehilltech/blueprint');

module.exports = Router.extend({
    specification: {
        '/messages': {
            resource: {
                controller: 'message'
            },
        }
    }
});