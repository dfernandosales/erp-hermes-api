import assert from 'assert';
import app from '../../src/app';

describe('\'categoria-quarto\' service', () => {
  it('registered the service', () => {
    const service = app.service('categoria-quarto');

    assert.ok(service, 'Registered the service');
  });
});
