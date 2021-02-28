import assert from 'assert';
import app from '../../src/app';

describe('\'hospede\' service', () => {
  it('registered the service', () => {
    const service = app.service('hospede');

    assert.ok(service, 'Registered the service');
  });
});
