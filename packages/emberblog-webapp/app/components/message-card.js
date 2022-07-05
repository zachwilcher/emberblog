import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class MessageCardComponent extends Component {

  @service store;

  @tracked editable;

  @action setEditable(value) {
    this.editable = !!value;
  }
  @action update() {
    this.args.message.save();
    this.setEditable(false);
  }

  @action delete() {
    let record = this.store.peekRecord('message', this.args.message.id);
    record.deleteRecord();
    record.save();
  }

}
