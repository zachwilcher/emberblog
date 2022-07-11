import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class SignUpComponent extends Component {
  @service store;

  @tracked username;

  @tracked password;
  @tracked passwordVerify;

  @action submit() {}
}
