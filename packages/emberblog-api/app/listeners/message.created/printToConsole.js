const { Listener } = require ('@onehilltech/blueprint');
module.exports = Listener.extend ({
    handleEvent(message) {
        console.log(message);
    }

});
