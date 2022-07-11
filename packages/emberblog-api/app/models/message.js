// app/models/message.js

const mongodb = require ('@onehilltech/blueprint-mongodb');
const { Schema } = mongodb;
const { Types: { ref }} = Schema;


const options = {
    // idk
};

const schema = new Schema({
    sender: ref('account', {required: true, validation: { optional: true}}),
    content: { type: String }
}, options);

module.exports = mongodb.resource('message', schema);