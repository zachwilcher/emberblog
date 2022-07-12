import Component from '@glimmer/component';
import { inject as service } from '@ember/service';

export default class HeaderComponent extends Component {
  @service session;

  get isSignedIn() {
    return this.session.isSignedIn;
  }

  get isSignedOut() {
    return this.session.isSignedOut;
  }

  get userId() {
    return this.session.userId;
  }
}
