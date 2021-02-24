import assert from 'assert';
import app from '../../src/app';

describe('\'funcionario\' service', () => {
  it('registered the service', () => {
    const service = app.service('funcionario');

    assert.ok(service, 'Registered the service');
  });
});
