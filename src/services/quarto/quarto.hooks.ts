import * as authentication from '@feathersjs/authentication';
import { BadRequest } from '@feathersjs/errors';
import { HookContext } from '@feathersjs/feathers';
// Don't remove this comment. It's needed to format import lines nicely.

const { authenticate } = authentication.hooks;

const includeRelacoesFind = (context: HookContext) => {
  context.params.sequelize = {
    include: [{
      association: 'categoriaQuarto'
    }],
    raw: false,
  };
  return context;
};

const verificaUnico = async (context: HookContext) => {
  const { numero } = context.data;
  if (numero) {
    const query: any = {
      numero: numero,
    };
    if (context.id) {
      query.id = { $ne: context.id };
    }
    const currentUsers = await context.service.find({ query });
    if (currentUsers.total) {
      throw new BadRequest("Ja existe quarto com esse numero.");
    }
  }
  return context;
};


const generateQuartoNumber = async (context: HookContext) => {
  const lastQuartoNumber = await context.service.find({
    query: {
      $limit: 1, $sort: {
        createdAt: -1
      }
    }
  })
  if (lastQuartoNumber.total > 0) {
    context.data.numero = +lastQuartoNumber.data[0].numero + 1;
  } else {
    context.data.numero = 1;
  }
  return context;
}

export default {
  before: {
    all: [authenticate('jwt')],
    find: [includeRelacoesFind],
    get: [includeRelacoesFind],
    create: [verificaUnico],
    update: [verificaUnico],
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
