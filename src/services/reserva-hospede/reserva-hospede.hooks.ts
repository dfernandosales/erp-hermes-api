import * as authentication from '@feathersjs/authentication';
import { BadRequest } from '@feathersjs/errors';
import { HookContext } from '@feathersjs/feathers';
import { Op } from 'sequelize';
// Don't remove this comment. It's needed to format import lines nicely.

const { authenticate } = authentication.hooks;

const includeRelacoesFind = (context: HookContext) => {
  context.params.sequelize = {
    include: [{
      association: 'hospede',
    },
    {
      association: 'reserva',
    },
    ],
    raw: false,
  };
  return context;
};

const verificaUnico = async (context: HookContext) => {
  const { hospedeId } = context.data;
  const { reservaId } = context.data;
  if (hospedeId) {
    const query: any = {
      hospedeId,
      reservaId,
    };
    if (context.id) {
      query.id = { $ne: context.id };
    }
    const currentUsers = await context.service.find({ query });
    if (currentUsers.total) {
      throw new BadRequest("Hospede ja adicionado na reserva.");
    }
  }
  return context;
};


export default {
  before: {
    all: [ authenticate('jwt') ],
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
