import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Model | message', function (hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('make sure model has expected attributes', function (assert) {
    let store = this.owner.lookup('service:store');
    let model = store.createRecord('message', {
      sender: 'memememe',
      content: 'HIIIIII!'
    });
    assert.equal(model.get('sender'), 'memememe');
    assert.equal(model.get('content'), 'HIIIIII!');
  });
});
