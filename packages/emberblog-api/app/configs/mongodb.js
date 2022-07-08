const { env } = require('@onehilltech/blueprint');

module.exports = {
    connections: {
        $default: {
            uri: `mongodb://localhost:27017/emberblog_${env}`, // process.env.mongodb_uri,
            seed: false,
            options : { // mongoose connection options
                useUnifiedTopology: true, // removes warning about Current Server Discovery and Monitoring engine being deprecated
                family: 4 // so localhost works instead of 127.0.0.1
            }
        },
    }
};