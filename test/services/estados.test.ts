import assert from 'assert';
import app from '../../src/app';

describe('\'estados\' service', () => {
  it('registered the service', () => {
    const service = app.service('estados');

    assert.ok(service, 'Registered the service');
  });
});
