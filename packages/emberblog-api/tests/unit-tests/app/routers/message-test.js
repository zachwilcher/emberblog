const { request } = require ('@onehilltech/blueprint-testing');
const assert = require('assert');
const { seed } = require ('@onehilltech/blueprint-mongodb');

describe ('app | routers | api | message', function () {


    it ('should create a message', function () {

        const message = {
            sender: 'mememememe',
            content: 'This is a dummy message.'
        };

        request ()
            .post ('/api/messages')
            .send ({ message })
            .expect(200)
            .then((res) => {
                assert(message.sender, 'mememememe');
                assert(message.content, 'This is a dummy message.');
            });
    });

    it('should get all messages', function() {
        // const { messages } = seed();
        request()
            .get('/api/messages')
            .expect(200);

    });





});