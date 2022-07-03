
const {Router} = require("@onehilltech/blueprint");

module.exports = Router.extend({
  specification: {
    '/helloworld': {
      get: {view: 'helloworld.pug'},
      post: {action: 'helloworld@echoName'},
    }
  }
});
