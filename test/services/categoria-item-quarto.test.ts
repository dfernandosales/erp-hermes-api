import assert from 'assert';
import app from '../../src/app';

describe('\'categoria-item-quarto\' service', () => {
  it('registered the service', () => {
    const service = app.service('categoria-item-quarto');

    assert.ok(service, 'Registered the service');
  });
});
