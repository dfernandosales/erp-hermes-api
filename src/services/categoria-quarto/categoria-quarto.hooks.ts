import * as authentication from '@feathersjs/authentication';
import { BadRequest } from '@feathersjs/errors';
import { HookContext } from '@feathersjs/feathers';
import { Op } from 'sequelize';
// Don't remove this comment. It's needed to format import lines nicely.

const { authenticate } = authentication.hooks;

const includeRelacoesFind = (context: HookContext):HookContext => {
  context.params.sequelize = {
    include: [{
      association: 'categoriaItemQuarto',
    },
    ],
    raw: false,
  };
  return context;
};

const verificaUnico = () => async (context: HookContext) => {
  const { nome } = context.data;
  if (nome) {
    const query: any = {
      nome: { [Op.iLike]: nome },
      allowDeletedAt: true,
    };
    if (context.id) {
      query.id = { $ne: context.id };
    }
    const currentUsers = await context.service.find({ query });
    if (currentUsers.total) {
      throw new BadRequest('Já existem uma categoria com esse nome na base de dados.');
    }
  }
  return context;
};

export default {
  before: {
    all: [authenticate('jwt')],
    find: [includeRelacoesFind],
    get: [],
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
