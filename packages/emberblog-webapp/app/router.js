import EmberRouter from '@ember/routing/router';
import config from 'emberblog-webapp/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('/');
  this.route('messages');
  this.route('message', { path: '/messages/:message_id' });
});
