import * as feathersAuthentication from '@feathersjs/authentication';
import * as local from '@feathersjs/authentication-local';
import { BadRequest } from '@feathersjs/errors';
import { HookContext } from '@feathersjs/feathers';
// Don't remove this comment. It's needed to format import lines nicely.

const { authenticate } = feathersAuthentication.hooks;
const { hashPassword, protect } = local.hooks;

const cantDeleteYourself = (context: HookContext): HookContext => {
  const idUser = context.params.user?.id;
  if (!context.id) {
    throw new BadRequest('Id obrigatório');
  }
  const id = Number(context.id);
  if (idUser === id) {
    throw new BadRequest('Não é possível excluir o próprio usuário.');
  }
  return context;
};

const verificaUnico = () => async (context: HookContext) => {
  const { email } = context.data;
  if (email) {
    const query: any = {
      email,
      allowDeletedAt: true,
    };
    if (context.id) {
      query.id = { $ne: context.id };
    }
    const currentUsers = await context.service.find({ query });
    if (currentUsers.total) {
      throw new BadRequest('E-mail já utilizado por outro usuário.');
    }
  }
  return context;
};

export default {
  before: {
    all: [authenticate('jwt')],
    find: [],
    get: [],
    create: [hashPassword('password'), verificaUnico()],
    update: [hashPassword('password')],
    patch: [hashPassword('password'), verificaUnico()],
    remove: [cantDeleteYourself]
  },

  after: {
    all: [
      protect('password')
    ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
