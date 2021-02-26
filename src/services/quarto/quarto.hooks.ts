import * as authentication from '@feathersjs/authentication';
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

export default {
  before: {
    all: [ authenticate('jwt') ],
    find: [includeRelacoesFind],
    get: [includeRelacoesFind],
    create: [],
    update: [],
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
