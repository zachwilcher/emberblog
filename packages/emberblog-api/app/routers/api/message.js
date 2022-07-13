const { Router } = require('@onehilltech/blueprint');
const { cors } = require("@onehilltech/blueprint-gatekeeper");
const { env } = require ('@onehilltech/blueprint');

module.exports = Router.extend({
    specification: {
        '/messages': {
            use: [cors({
                origin: env !== 'production' ? true : null
            })],
            resource: {
                controller: 'message'
            },
        }
    }
});