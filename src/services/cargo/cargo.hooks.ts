import * as authentication from '@feathersjs/authentication';
import { HookContext } from '@feathersjs/feathers';
import { BadRequest } from '@feathersjs/errors';
import { Op } from 'sequelize';
// Don't remove this comment. It's needed to format import lines nicely.

const { authenticate } = authentication.hooks;

const verificaUnico = async (context: HookContext) => {
  const { nomeCargo } = context.data;
  if (nomeCargo) {
    const query: any = {
      nomeCargo: { [Op.iLike]: nomeCargo },
      allowDeletedAt: true,
    };
    if (context.id) {
      query.id = { $ne: context.id };
    }
    const cargosCadastrados = await context.service.find({ query });
    if (cargosCadastrados.total) {
      throw new BadRequest('Já existe um cargo com esse nome cadastrado.');
    }
  }
  return context;
};

export default {
  before: {
    all: [ authenticate('jwt') ],
    find: [],
    get: [],
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
