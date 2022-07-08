const { request } = require ('@onehilltech/blueprint-testing');

describe ('app | routers | api | message', function () {
    it ('should create a message', function () {

        const message = {
            sender: 'mememememe',
            content: 'This is a dummy message.'
        };

        return request ()
            .post ('/api/messages')
            .send ({message})
            .expect (200, { message });
    });
});