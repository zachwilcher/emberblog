import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | messages', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    let store = this.owner.lookup('service:store');
    let model = [
      store.createRecord('message', {
        sender: 'testing bot1',
        content: 'test bot1 content',
      }),
      store.createRecord('message', {
        sender: 'testing bot2',
        content: 'test bot2 content',
      }),
      store.createRecord('message', {
        sender: 'testing bot3',
        content: 'test bot3 content',
      }),
    ];

    this.setProperties({
      messages: model,
    });

    await render(hbs`<Messages @messages={{this.messages}}/>`);

    assert.strictEqual(
      this.element.querySelector('[data-test-messages]').children.length,
      3,
      'has the correct number of children'
    );
  });
});
