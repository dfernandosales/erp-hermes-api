import assert from 'assert';
import app from '../../src/app';

describe('\'ocupacao-chart\' service', () => {
  it('registered the service', () => {
    const service = app.service('ocupacao-chart');

    assert.ok(service, 'Registered the service');
  });
});
