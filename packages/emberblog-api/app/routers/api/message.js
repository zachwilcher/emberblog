const { Router } = require('@onehilltech/blueprint');
const { cors } = require("@onehilltech/blueprint-gatekeeper");
const { env } = require ('@onehilltech/blueprint');

module.exports = Router.extend({
    specification: {
        '/messages': {
            resource: {
                controller: 'message'
            },

            use: [cors({
                origin: env !== 'production' ? true : null
            })],
        }
    }
});