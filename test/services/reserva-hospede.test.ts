import assert from 'assert';
import app from '../../src/app';

describe('\'reserva-hospede\' service', () => {
  it('registered the service', () => {
    const service = app.service('reserva-hospede');

    assert.ok(service, 'Registered the service');
  });
});
