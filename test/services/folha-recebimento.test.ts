import assert from 'assert';
import app from '../../src/app';

describe('\'folha-recebimento\' service', () => {
  it('registered the service', () => {
    const service = app.service('folha-recebimento');

    assert.ok(service, 'Registered the service');
  });
});
