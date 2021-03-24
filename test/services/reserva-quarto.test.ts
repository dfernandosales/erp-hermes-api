import assert from 'assert';
import app from '../../src/app';

describe('\'reserva-quarto\' service', () => {
  it('registered the service', () => {
    const service = app.service('reserva-quarto');

    assert.ok(service, 'Registered the service');
  });
});
