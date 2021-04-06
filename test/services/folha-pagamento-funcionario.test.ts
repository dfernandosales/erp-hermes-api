import assert from 'assert';
import app from '../../src/app';

describe('\'folha-pagamento-funcionario\' service', () => {
  it('registered the service', () => {
    const service = app.service('folha-pagamento-funcionario');

    assert.ok(service, 'Registered the service');
  });
});
