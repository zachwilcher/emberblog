import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | emberblog', function (hooks) {
  setupApplicationTest(hooks);

  test('Testing the routes', async function (assert) {
    await visit('/');
    assert.equal(currentURL(), '/');

    await visit('/messages');
    assert.equal(currentURL(), '/messages');

    assert.dom('[data-test-messages]').exists();

    assert.dom('[data-test-compose]').exists();
  });
});
