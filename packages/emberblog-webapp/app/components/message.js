import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class MessageComponent extends Component {
  @service store;

  @action delete() {
    let record = this.store.peekRecord('message', this.args.message.id);
    record.deleteRecord();
    record.save();
  }
}
