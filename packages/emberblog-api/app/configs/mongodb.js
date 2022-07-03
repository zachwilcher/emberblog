module.exports = {
    connections: {
        $default: {
            uri: process.env.mongodb_uri,
            seed: false,
            options : {            // mongoose connection options
            }
        },
    }
};