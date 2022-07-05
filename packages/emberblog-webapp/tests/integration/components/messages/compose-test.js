import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | messages/compose', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders with the expected elements', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<Messages::Compose />`);

    assert.strictEqual(
      this.element.querySelector('[data-test-compose-input]').value,
      '',
      'the input is initially empty'
    );
  });
});
