import * as authentication from '@feathersjs/authentication';
import { HookContext } from '@feathersjs/feathers';

// Don't remove this comment. It's needed to format import lines nicely.

const { authenticate } = authentication.hooks;


const verificaDowload = (context: HookContext) => {
  if (context.params.query?.$limit == 10000) {
    context.params.query = { ...context.params.query, $select: ["dataInicioReserva", "dataInicioReserva", "valorReserva", "user.email"] }
  }
  return context;
}

export default {
  before: {
    all: [ authenticate('jwt') ],
    find: [verificaDowload],
    get: [],
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
