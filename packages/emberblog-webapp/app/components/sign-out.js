import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class SignOutComponent extends Component {

  @service session;
  @service router;

  @action
  async signOut() {
    await this.session.signOut();
    this.router.replaceRoute('/');
  }

}
