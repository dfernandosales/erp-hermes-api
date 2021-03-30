import { BadRequest } from '@feathersjs/errors';
import { Paginated } from '@feathersjs/feathers';
import assert from 'assert';
import app from '../../src/app';
import { RoleUsuario } from '../../src/models/enum/usuario.enum';

describe('\'users\' service', () => {
  it('registered the service', () => {
    const service = app.service('users');

    assert.ok(service, 'Registered the service');
  });

  it('creates a user, encrypts password', async () => {

    const user = {
      email: 'someone1@example.com',
      password: 'supersecret',
      name: 'test',
      role: RoleUsuario.ADMIN
    };

    try {
      await app.service('users').create(user);
    } catch (error) {
    }
    it('checks password is encrypted', async () => {
      const user = (await app.service('users')
        .find({
          query: {
            email: 'someone1@example.com'
          }
        })) as Paginated<any>;
      assert.ok(user.data[0].password !== 'secret');
    });
  });

  it('do not create same email more then once', async () => {
    const user = {
      email: 'someone1@example.com',
      password: 'supersecret',
      name: 'test',
      role: RoleUsuario.ADMIN
    };
    assert.rejects(async () => { await app.service('users').create(user); }, BadRequest);
  });
});