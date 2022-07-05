import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | message', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function () {
    let store = this.owner.lookup('service:store');

    let model = store.createRecord('message', {
      sender: 'testing bot',
      content: 'something that will not be here by coincidence',
    });

    this.setProperties({
      message: model,
    });
  });

  test('it renders a message model', async function (assert) {
    await render(hbs`<Message @message={{this.message}} />`);

    assert.strictEqual(
      this.element
        .querySelector('[data-test-message-sender]')
        .textContent.trim(),
      'testing bot',
      'sender is correct'
    );

    assert.strictEqual(
      this.element
        .querySelector('[data-test-message-content]')
        .textContent.trim(),
      'something that will not be here by coincidence',
      'content is correct'
    );
  });

  test('the message content can be edited', async function (assert) {
    await render(hbs`<Message @message={{this.message}} />`);

    let editButton = this.element.querySelector(
      '[data-test-message-edit-button]'
    );
    await click(editButton);

    let contentInput = this.element.querySelector(
      '[data-test-message-content-input]'
    );
    assert.dom(contentInput).exists();

    assert.strictEqual(
      contentInput.value,
      'something that will not be here by coincidence'
    );
  });
});
