import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class MessagesComposeComponent extends Component {
  @service store;

  @tracked draft;

  @action submit() {
    let record = this.store.createRecord('message', {
      content: this.draft,
    });
    record.save();
    this.draft = '';
  }
}
