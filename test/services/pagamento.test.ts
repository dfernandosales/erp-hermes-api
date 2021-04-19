import assert from 'assert';
import app from '../../src/app';

describe('\'pagamento\' service', () => {
  it('registered the service', () => {
    const service = app.service('pagamento');

    assert.ok(service, 'Registered the service');
  });
});
