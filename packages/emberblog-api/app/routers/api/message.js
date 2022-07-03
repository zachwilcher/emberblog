const { Router } = require('@onehilltech/blueprint');
const cors = require("cors");

module.exports = Router.extend({
    specification: {
        '/messages': {
            use: [cors({
                origin: 'http://localhost:4200'
            })],
            resource: {
                controller: 'message'
            },
        }
    }
});