import * as authentication from '@feathersjs/authentication';
import { BadRequest } from '@feathersjs/errors';
import { HookContext } from '@feathersjs/feathers';
// Don't remove this comment. It's needed to format import lines nicely.

const { authenticate } = authentication.hooks;


const includeRelacoesFind = (context: HookContext): HookContext => {
  context.params.sequelize = {
    include: [{
      association: 'categoria',
    },
    {
      association: 'item'
    }],
    raw: false,
  };
  return context;
};

const verificaUnico = () => async (context: HookContext) => {
  const { itemQuartoId } = context.data;
  if (itemQuartoId) {
    const query: any = {
      itemQuartoId,
      allowDeletedAt: true,
    };
    if (context.id) {
      query.id = { $ne: context.id };
    }
    const currentUsers = await context.service.find({ query });
    if (currentUsers.total) {
      throw new BadRequest('Item já adicionado nessa categoria.');
    }
  }
  return context;
};

export default {
  before: {
    all: [authenticate('jwt')],
    find: [includeRelacoesFind],
    get: [includeRelacoesFind],
    create: [verificaUnico()],
    update: [verificaUnico()],
    patch: [],
    remove: []
  },

  after: {
    all: [],
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
