import { module, test } from 'qunit';

import hbs from 'htmlbars-inline-precompile';
import { render } from '@ember/test-helpers';
import { setupRenderingTest } from 'ember-qunit';

module('Integration | Project', function(hooks) {
  setupRenderingTest(hooks);

  test('project is correctly built with specific ember-cli and ember-source version', async function(assert) {
    await render(hbs`
      {{required-props name="some-value"}}
    `);

    assert.ok(1);
  });
});
