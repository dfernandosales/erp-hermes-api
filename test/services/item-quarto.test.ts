import assert from 'assert';
import app from '../../src/app';

describe('\'item-quarto\' service', () => {
  it('registered the service', () => {
    const service = app.service('item-quarto');

    assert.ok(service, 'Registered the service');
  });
});
