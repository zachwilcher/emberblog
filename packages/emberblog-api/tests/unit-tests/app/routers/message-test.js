const { request } = require ('@onehilltech/blueprint-testing');
const assert = require('assert');
const { seed } = require ('@onehilltech/blueprint-mongodb');

const _ = require('lodash');

/**
 * Tests if 2 messages are equal
 */
function messagesEqual(message1, message2, checkId=true) {
    return (!checkId || (String(message1._id) === String(message2._id))) &&
        (message1.sender === message2.sender) &&
        (message1.content === message2.content);
}

describe ('app | routers | api | message', function () {


    it ('should create a message', function (done) {

        const message = {
            sender: 'mememememe',
            content: 'This is a dummy message.'
        };

        request ()
            .post ('/api/messages')
            .send ({ message })
            .expect((res) => {
                assert(messagesEqual(message, res.body.message, checkId=false), 'messages are equal');
            }).end(done);
    });

    it('should get all messages', function(done) {
        const { messages: seededMessages } = seed();


        request()
            .get('/api/messages')
            .expect((res) => {
                assert(res.body.messages);
                assert(_.differenceWith(seededMessages, res.body.messages, messagesEqual).length === 0, 'returned messages are the same');
            }).end(done);
    });

    it('should get any message', function(done) {

        const { messages: seededMessages } = seed();
        assert(seededMessages.length > 0, 'There must be seeded messages in the database for this test to work!');
        const seededMessage = seededMessages[0];

        request()
            .get(`/api/messages/${seededMessage._id}`)
            .expect(res => {
                assert(messagesEqual(res.body.message, seededMessage), 'messages are equal');
            }).end(done);

    });

    it("should update a message's content", function(done) {
        const { messages: seededMessages } = seed();
        assert(seededMessages.length > 0, 'There must be seeded messages in the database for this test to work!');
        const seededMessage = seededMessages[0];

        const newContent = seededMessage.content +  "NEW DATA!";

        request()
            .put(`/api/messages/${seededMessage._id}`)
            .send({message: {content: newContent}})
            .expect(res => {
                assert(res.body.message.content === newContent, 'content is updated');
            }).end(done);
    });


    context('/messages/delete', function() {
        const { messages: seededMessages } = seed();
        assert(seededMessages.length > 0, 'There must be seeded messages in the database for this test to work!');
        const seededMessage = seededMessages[0];

        it('should delete the message', function(done) {

            request()
                .delete(`/api/messages/${seededMessage._id}`).expect(200, done);
        });

        it('should fail to get the message', function(done) {
            request()
                .get(`/api/messages/${seededMessage._id}`).expect(404, done);
        });

    });






});