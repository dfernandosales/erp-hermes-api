import assert from 'assert';
import app from '../../src/app';

describe('\'relatorio-hospede\' service', () => {
  it('registered the service', () => {
    const service = app.service('relatorio-hospede');

    assert.ok(service, 'Registered the service');
  });
});
