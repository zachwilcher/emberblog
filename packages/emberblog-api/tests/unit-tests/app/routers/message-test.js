
const assert = require('assert');
const _ = require('lodash');


const { seed } = require ('@onehilltech/blueprint-mongodb');
const { request } = require ('@onehilltech/blueprint-testing');


/**
 * Tests if 2 messages are equal
 * @param checkId whether or not to use the message's id in equality check ie. as long as everything else is equal the messages are equal
 */
function messagesEqual(message1, message2, checkId=true) {
    return (!checkId || (String(message1._id) === String(message2._id))) &&
        (message1.content === message2.content);
}

describe ('app | routers | api | message', function () {


    it('you must be authenticated in order to create a message', async function() {
        const message = {
            content: 'This is a dummy message.'
        };

        await request ()
            .post ('/api/messages')
            .send ({ message })
            .expect(400, { errors: [{ code: 'missing_token', detail: 'The access token is missing.', status: '400' }]});

    });

    it ('a user should be able to create a message', async function () {

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

    it('anyone should be able to get all messages', async function() {
        const { messages: seededMessages } = seed();


        await request()
            .get('/api/messages')
            .expect((res) => {
                assert(res.body.messages);
                assert(_.differenceWith(seededMessages, res.body.messages, messagesEqual).length === 0, 'returned messages are the same');
            });
    });

    it('anyone should be able to get any message', async function() {

        const { messages: seededMessages } = seed();
        assert(seededMessages.length > 0, 'There must be seeded messages in the database for this test to work!');
        const seededMessage = seededMessages[0];

        await request()
            .get(`/api/messages/${seededMessage._id}`)
            .expect(res => {
                assert(messagesEqual(res.body.message, seededMessage), 'messages are equal');
            });

    });

    it("a user should be able to update their message's content", async function() {
        const { messages: seededMessages } = seed();
        assert(seededMessages.length > 0, 'There must be seeded messages in the database for this test to work!');
        const seededMessage = seededMessages[0];

        const newContent = seededMessage.content +  "NEW DATA!";
        await request()
            .put(`/api/messages/${seededMessage._id}`)
            .withUserToken(0)
            .send({message: {content: newContent}})
            //.expect(200)
            .expect(res => {
                //TODO temporary console.log and commented out .expect(200) above to see what is in the body more easily
                console.log(res.body);
                assert(res.body.message.content === newContent, 'content is updated');
            });
    });

    it("a user should not be able to update another user's message", async function() {
        const { messages: seededMessages } = seed();
        assert(seededMessages.length > 0, 'There must be seeded messages in the database for this test to work!');
        const seededMessage = seededMessages[0];

        const newContent = seededMessage.content +  "NEW DATA!";
        await request()
            .put(`/api/messages/${seededMessage._id}`)
            .withUserToken(1)
            .send({message: {content: newContent}})
            .expect(403);
    });


    it('a user should be able to delete their own message', async function() {
        const { messages: seededMessages } = seed();
        assert(seededMessages.length > 0, 'There must be seeded messages in the database for this test to work!');
        const seededMessage = seededMessages[0];

        await request()
            .delete(`/api/messages/${seededMessage._id}`)
            .withUserToken(0)
            .expect(200);

        await request()
            .get(`/api/messages/${seededMessage._id}`)
            .expect(404);

    });

    it("a user should not be able to delete another user's message", async function() {
        const { messages: seededMessages } = seed();
        assert(seededMessages.length > 0, 'There must be seeded messages in the database for this test to work!');
        const seededMessage = seededMessages[0];

        await request()
            .delete(`/api/messages/${seededMessage._id}`)
            .withUserToken(1)
            .expect(403);

        await request()
            .get(`/api/messages/${seededMessage._id}`)
            .expect(200);

    });






});