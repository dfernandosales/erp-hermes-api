import assert from 'assert';
import app from '../../src/app';

describe('\'quarto\' service', () => {
  it('registered the service', () => {
    const service = app.service('quarto');

    assert.ok(service, 'Registered the service');
  });
});
