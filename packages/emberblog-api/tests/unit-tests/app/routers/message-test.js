
const assert = require('assert');
const _ = require('lodash');


const { seed } = require ('@onehilltech/blueprint-mongodb');
const { request } = require ('@onehilltech/blueprint-testing');


/**
 * Tests if 2 messages are equal
 */
function messagesEqual(message1, message2, checkId=true) {
    return (!checkId || (String(message1._id) === String(message2._id))) &&
        (message1.content === message2.content);
}

describe ('app | routers | api | message', function () {


    it ('should create a message', async function () {

        const message = {
            content: 'This is a dummy message.'
        };

        await request ()
            .post ('/api/messages')
            .withUserToken(0)
            .send ({ message })
            .expect((res) => {
                assert(messagesEqual(message, res.body.message, false), 'messages are equal');
            });
    });

    it('should get all messages', async function() {
        const { messages: seededMessages } = seed();


        await request()
            .get('/api/messages')
            .expect((res) => {
                assert(res.body.messages);
                assert(_.differenceWith(seededMessages, res.body.messages, messagesEqual).length === 0, 'returned messages are the same');
            });
    });

    it('should get any message', async function() {

        const { messages: seededMessages } = seed();
        assert(seededMessages.length > 0, 'There must be seeded messages in the database for this test to work!');
        const seededMessage = seededMessages[0];

        await request()
            .get(`/api/messages/${seededMessage._id}`)
            .expect(res => {
                assert(messagesEqual(res.body.message, seededMessage), 'messages are equal');
            });

    });

    it("user should be able to update their message's content", async function() {
        const { messages: seededMessages } = seed();
        assert(seededMessages.length > 0, 'There must be seeded messages in the database for this test to work!');
        const seededMessage = seededMessages[0];

        const newContent = seededMessage.content +  "NEW DATA!";
        await request()
            .put(`/api/messages/${seededMessage._id}`)
            .withUserToken(0)
            .send({message: {content: newContent}})
            .expect(200)
            .expect(res => {
                assert(res.body.message.content === newContent, 'content is updated');
            });
    });

    it("user should not be able to update another user's message", async function() {
        const { messages: seededMessages } = seed();
        assert(seededMessages.length > 0, 'There must be seeded messages in the database for this test to work!');
        const seededMessage = seededMessages[0];

        const newContent = seededMessage.content +  "NEW DATA!";
        await request()
            .put(`/api/messages/${seededMessage._id}`)
            .withUserToken(1)
            .send({message: {content: newContent}})
            //.expect(403)
            .expect(res => {
                console.log(res.body);
            });
    });


    it('user should be able to delete their own message', async function() {
        const { messages: seededMessages } = seed();
        assert(seededMessages.length > 0, 'There must be seeded messages in the database for this test to work!');
        const seededMessage = seededMessages[0];

        await request()
                .delete(`/api/messages/${seededMessage._id}`)
                .withUserToken(0).expect(200);
        await request()
                .get(`/api/messages/${seededMessage._id}`).expect(404);

    });

    it("user should not be able to delete another user's message", async function() {
        const { messages: seededMessages } = seed();
        assert(seededMessages.length > 0, 'There must be seeded messages in the database for this test to work!');
        const seededMessage = seededMessages[0];

        await request()
            .delete(`/api/messages/${seededMessage._id}`)
            .withUserToken(1).expect(403);

        await request()
            .get(`/api/messages/${seededMessage._id}`).expect(200);

    });






});