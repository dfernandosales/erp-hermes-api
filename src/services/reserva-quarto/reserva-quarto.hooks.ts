import * as authentication from '@feathersjs/authentication';
import { BadRequest } from '@feathersjs/errors';
import { HookContext } from '@feathersjs/feathers';
// Don't remove this comment. It's needed to format import lines nicely.

const { authenticate } = authentication.hooks;

const includeRelacoesFind = (context: HookContext) => {
  context.params.sequelize = {
    include: [{
      association: 'quarto', include: [{association:"categoriaQuarto"}]
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
  const { quartoId } = context.data;
  if (quartoId) {
    const query: any = {
      quartoId,
      allowDeletedAt: true,
    };
    if (context.id) {
      query.id = { $ne: context.id };
    }
    const currentUsers = await context.service.find({ query });
    if (currentUsers.total) {
      throw new BadRequest("O quarto selecionado ja foi adicionado na reserva.");
    }
  }
  return context;
};

const changeQuartoStatus = async (context: HookContext) => {
  const quartoService = context.app.service("quarto");
  quartoService.patch(context.result.quartoId,{vacancia:false})
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
    create: [changeQuartoStatus],
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
