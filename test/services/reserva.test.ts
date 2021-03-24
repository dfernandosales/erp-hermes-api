import assert from 'assert';
import app from '../../src/app';

describe('\'reserva\' service', () => {
  it('registered the service', () => {
    const service = app.service('reserva');

    assert.ok(service, 'Registered the service');
  });
});
