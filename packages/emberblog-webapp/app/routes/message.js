import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class MessageRoute extends Route {
  @service store;

  model(params) {
    return this.store.find('message', params.message_id);
  }
}
