// app/configs/gatekeeper.js

module.exports = {
    tokens: {
        // This is the base options for all token generators.
        $: {
            issuer: '[your-issuer-name-here]',
            expiresIn: '1h',
            algorithm: 'HS256',
            secret: 'ssshhh'
        }
    },
};