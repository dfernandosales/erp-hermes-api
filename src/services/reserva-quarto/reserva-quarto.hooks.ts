import * as authentication from '@feathersjs/authentication';
import { BadRequest } from '@feathersjs/errors';
import { HookContext } from '@feathersjs/feathers';
// Don't remove this comment. It's needed to format import lines nicely.

const { authenticate } = authentication.hooks;

const includeRelacoesFind = (context: HookContext): HookContext => {
  context.params.sequelize = {
    include: [{
      association: 'quarto', include: [{ association: 'categoriaQuarto' }]
    },
    {
      association: 'reserva',
    },
    ],
    raw: false,
  };
  return context;
};

const verificaUnico = async (context: HookContext): Promise<HookContext> => {
  const { quartoId, reservaId } = context.data;
  if (quartoId) {
    const query: any = {
      quartoId,
      reservaId
    };
    if (context.id) {
      query.id = { $ne: context.id };
    }
    const currentUsers = await context.service.find({ query });
    if (currentUsers.total) {
      throw new BadRequest('O quarto selecionado ja foi adicionado na reserva.');
    }
  }
  return context;
};

const changeQuartoStatusToOcupado = async (context: HookContext): Promise<HookContext> => {
  const quartoService = context.app.service('quarto');
  await quartoService.patch(context.result.quartoId, { vacancia: false });
  return context;
};

const changeQuartoStatusToVago = async (context: HookContext): Promise<HookContext> => {
  const quartoService = context.app.service('quarto');
  const relation = await context.service._get(Number(context.id));
  await quartoService.patch(relation.quartoId, { vacancia: true });
  return context;
};


export default {
  before: {
    all: [authenticate('jwt')],
    find: [includeRelacoesFind],
    get: [includeRelacoesFind],
    create: [verificaUnico],
    update: [verificaUnico],
    patch: [],
    remove: [changeQuartoStatusToVago]
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [changeQuartoStatusToOcupado],
    update: [changeQuartoStatusToOcupado],
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
