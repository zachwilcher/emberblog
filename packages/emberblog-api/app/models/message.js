// app/models/message.js

const mongodb = require ('@onehilltech/blueprint-mongodb');
const { Schema } = mongodb;

const options = {
    // idk
};

const schema = new Schema({
    sender: { type: String, trim: true, required: true },
    content: { type: String }
}, options);

module.exports = mongodb.resource('message', schema);