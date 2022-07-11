const { Router, policies: { check } } = require('@onehilltech/blueprint');
const { cors } = require("@onehilltech/blueprint-gatekeeper");
const { env } = require ('@onehilltech/blueprint');

module.exports = Router.extend({
    specification: {
        '/messages': {

            use: [cors({
                origin: env !== 'production' ? true : null
            })],
            /*
            resource: {
                controller: 'message'
            },
             */
            post: {
                action: 'message@create',
                policy: 'gatekeeper.auth.bearer',
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
                    policy: check('gatekeeper.resource.owner', 'messageId', 'message@sender')
                },

                delete: {
                    action: 'message@delete',
                    policy: check('gatekeeper.resource.owner', 'messageId', 'message@sender')
                }


            },

            '/count': {
                get: {
                    action: 'message@count'
                }
            }
        }
    }
});