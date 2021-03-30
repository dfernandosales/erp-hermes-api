import assert from 'assert';
import app from '../src/app';
import { RoleUsuario } from '../src/models/enum/usuario.enum';

describe('authentication', () => {
  it('registered the authentication service', () => {
    assert.ok(app.service('authentication'));
  });
  
  describe('local strategy', () => {
    const userInfo = {
      email: 'someone@example.com',
      password: 'supersecret',
      name: 'test',
      role: RoleUsuario.ADMIN
    };

    before(async () => {
      try {
        await app.service('users').create(userInfo);
      } catch (error) {
      }
    });

    it('authenticates user and creates accessToken', async () => {
      const { user, accessToken } = await app.service('authentication').create({
        strategy: 'local',
        ...userInfo
      }, {});
      assert.ok(accessToken, 'Created access token for user');
      assert.ok(user, 'Includes user in authentication data');
    });
  });
});
