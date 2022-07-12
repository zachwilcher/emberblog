const { Router, policies: { all } } = require('@onehilltech/blueprint');
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
                    policy: 'messageOwner'
                },
                delete: {
                    action: 'message@delete',
                    policy: 'messageOwner'
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