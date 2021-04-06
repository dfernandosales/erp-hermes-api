import assert from 'assert';
import app from '../../src/app';

describe('\'cargo\' service', () => {
  it('registered the service', () => {
    const service = app.service('cargo');

    assert.ok(service, 'Registered the service');
  });
});
