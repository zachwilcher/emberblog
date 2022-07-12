
const blueprint = require("@onehilltech/blueprint");
const {cors} = require("@onehilltech/blueprint-gatekeeper");
const { Router } = blueprint;
const { env } = require ('@onehilltech/blueprint');


module.exports = Router.extend({
    specification: {
        '/': {
            use: [cors({
                origin: env !== 'production' ? true : null
            })]
        },
        '/gatekeeper': blueprint.mount('@onehilltech/blueprint-gatekeeper:v1'),
    }
});