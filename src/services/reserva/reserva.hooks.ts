import * as authentication from '@feathersjs/authentication';
import { HookContext } from '@feathersjs/feathers';
import moment from 'moment';
import { StatusReserva } from '../../models/enum/reservaEnum';
// Don't remove this comment. It's needed to format import lines nicely.

const { authenticate } = authentication.hooks;

const includeRelacoesFind = (context: HookContext): HookContext => {
  context.params.sequelize = {
    include: [{
      association: 'reservaQuarto',
      include: [{
        association: 'quarto'
      }]
    },
    {
      association: 'reservaHospede',
      include: [{
        association: 'hospede'
      }]
    }
    ],
    raw: false,
  };
  return context;
};

const confirmCheckoutCalculateValor = async (context: HookContext): Promise<HookContext> => {
  if (context.data.checkout) {
    try {
      const reservaService = context.app.service('reserva');
      const quartoService = context.app.service('quarto');
      const reservaQuartoService = context.app.service('reserva-quarto');
      const categoriaQuartoService = context.app.service('categoria-quarto');
      const reserva = await reservaService.get(context.id);
      let diffDays = moment(reserva.dataFimReserva).diff(
        moment(reserva.dataInicioReserva),
        'days'
      );
      diffDays === 0 ? diffDays = 1 : diffDays;
      const formated = JSON.parse(JSON.stringify(reserva));
      const valor = await formated.reservaQuarto.reduce(async function (accumulator: any, currentValue: any) {
        const categoria = await categoriaQuartoService.get(currentValue.quarto.categoriaQuartoId);
        return accumulator += categoria.valor * diffDays;
      }, 0);
      if (formated.reservaQuarto.length) {
        for (const reservaQuarto of formated.reservaQuarto) {
          const relation = await reservaQuartoService.get(reservaQuarto.id);
          await quartoService._patch(relation.quartoId, { vacancia: true });
        }
      }
      await reservaService._patch(context.id, { valorReserva: valor, status: StatusReserva.FECHADA });
    } catch (error) {
      return error;
    }
  }
  return context;
};

export default {
  before: {
    all: [authenticate('jwt')],
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
    patch: [confirmCheckoutCalculateValor],
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
