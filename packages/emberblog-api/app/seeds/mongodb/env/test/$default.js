const { Seed } = require ('@onehilltech/blueprint-mongodb');
const dab = require ('@onehilltech/dab');

module.exports = Seed.extend({
    model() {
        return {
            accounts: [
                { email: 'account1@onehilltech.com', username: 'account1', password: 'account1', verification: { required: false } },
                { email: 'account2@onehilltech.com', username: 'account2', password: 'account2', verification: { required: false } },
                { email: 'account3@onehilltech.com', username: 'account3', password: 'account3', verification: { required: false } },
            ],
            messages: [
                {sender: dab.ref('accounts.0'), content: 'Hello, World!'},
                {
                    sender: dab.ref('accounts.1'),
                    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
                },
                {sender: dab.ref('accounts.2'), content: 'Test message please ignore.'}
            ],
            native: [
                {
                    name: 'client0',
                    email: 'client0@gatekeeper.com',
                    client_secret: 'client0',
                }
            ],
            user_tokens: dab.map(dab.get('accounts'), (account, i) => ({client: dab.ref('native.0'), account: account})),
        };
    }
});



