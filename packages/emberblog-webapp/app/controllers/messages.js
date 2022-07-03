import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';



export default class MessagesController extends Controller {


  @tracked messageDraft;

  @service store;

  @action createMessage() {

    let record = this.store.createRecord('message', {
      sender: 'localhost',
      content: this.messageDraft,
    });
    record.save().catch(console.log);
  }

}
