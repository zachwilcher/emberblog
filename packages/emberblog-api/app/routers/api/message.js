const { Router, policies: { all, check } } = require('@onehilltech/blueprint');
const {cors} = require("@onehilltech/blueprint-gatekeeper");
const { env } = require ('@onehilltech/blueprint');

module.exports = Router.extend({
    specification: {
        '/messages': {
            use: [cors({
                origin: env !== 'production' ? true : null
            })],
            post: {
                action: 'message@create',
                policy: 'gatekeeper.auth.bearer'
            },
            get: {
                action: 'message@getAll'
            },
            '/:messageId': {
                get: {
                    action: 'message@getOne'
                },
                put: {
                    action: 'message@update',
                    policy: all.ordered(['gatekeeper.auth.bearer', check('gatekeeper.resource.owner', 'messageId', 'message@sender')])
                },
                delete: {
                    action: 'message@delete',
                    policy: all.ordered(['gatekeeper.auth.bearer', check('gatekeeper.resource.owner', 'messageId', 'message@sender')])
                }
            },
            '/count': {
                get: {
                    action: 'message@count',
                },
            },
        }
    }
});