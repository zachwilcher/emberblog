
const blueprint = require("@onehilltech/blueprint");
const { Router } = blueprint;

const { env } = require ('@onehilltech/blueprint');
const { cors } = require ('@onehilltech/blueprint-gatekeeper');


module.exports = Router.extend({
    specification: {
        '/': {
            use: [cors({
                origin: env !== 'production' ? true : null
            })]
        },
        '/gatekeeper': blueprint.mount('@onehilltech/blueprint-gatekeeper:v1'),
        /*
        '/api': {
            policy: 'gatekeeper.auth.bearer'
        },
         */
    }
});