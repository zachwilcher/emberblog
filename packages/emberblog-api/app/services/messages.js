const { Service, computed } = require('@onehilltech/blueprint');

module.exports = Service.extend({

    _messages: null,

    init() {
        this._super.call(this, ...arguments);

        this._messages = [
            {
                "type": "messages",
                "id": "1",
                "attributes": {
                    "sender": "localhost",
                    "content": "Hello, World!"
                }
            },
            {
                "type": "messages",
                "id": "2",
                "attributes": {
                    "sender": "192.168.1.254",
                    "content": "Hi!"
                }
            },
            {
                "type": "messages",
                "id": "3",
                "attributes": {
                    "sender": "8.8.8.8",
                    "content": "Greetings."
                }
            }
        ];
    },

    add(message) {
        this._messages.push(message);
    },

    messages: computed({
        get() {
            return this._messages;
        }
    }),

    get(id) {
        return this._messages.find(message => message.id === id);
    },

    remove(id) {
        let index = this._messages.findIndex(message => message.id === id);

        if(index === -1) {
            return false;
        }

        this._messages.splice(index, 1);
        return true;
    },

    count() {
        return this._messages.length;
    }



});