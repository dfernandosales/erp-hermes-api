import * as authentication from '@feathersjs/authentication';
import { GeneralError } from '@feathersjs/errors';
import { HookContext, Paginated } from '@feathersjs/feathers';
import moment from 'moment';
import { StatusReserva } from '../../models/enum/reservaEnum';
import { ReservaHospedeModel } from '../../models/reserva-hospede.model';
import { ReservaQuartoModel } from '../../models/reserva-quarto.model';
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
    },
    {
      association: 'user'
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
      const recebimentoService = context.app.service('folha-recebimento');
      const quartoService = context.app.service('quarto');
      const reservaQuartoService = context.app.service('reserva-quarto');
      const reservaHospedeService = context.app.service('reserva-hospede');
      const categoriaQuartoService = context.app.service('categoria-quarto');
      let reserva = await reservaService.get(context.id);
      const hasQuarto: Paginated<ReservaQuartoModel> = await reservaQuartoService.find({ query: { reservaId: reserva.id } })
      const hasHospede: Paginated<ReservaHospedeModel> = await reservaHospedeService.find({ query: { reservaId: reserva.id } })
      if (hasQuarto.total === 0) {
        throw Error('Nao eh permitido realizar o checkout de uma reserva sem nenhum quarto');
      }
      if (hasHospede.total === 0) {
        throw Error('Nao eh permitido realizar o checkout de uma reserva sem nenhum hospede');
      }
      if (!reserva.dataFimReserva) {
        reserva = await reservaService._patch(context.id, { dataFimReserva: new Date() });
      }
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
      for (const reservaQuarto of formated.reservaQuarto) {
        const relation = await reservaQuartoService.get(reservaQuarto.id);
        await quartoService._patch(relation.quartoId, { vacancia: true });
      }
      await recebimentoService.create({ descricao: `Recimento da reserva #${context.id}`, dataRecebimento: new Date(), valor: valor });
      await reservaService._patch(context.id, { valorReserva: valor, status: StatusReserva.FINALIZADA });
    } catch (error) {
      throw new GeneralError("Erro ao tentar realizar checkout da reserva. Nao existem hospede ou um quarto cadastrado na mesma.", error);
    }
  }
  return context;
};

const validaDateAntes = async (context: HookContext): Promise<HookContext> => {
  if (context.data.dataFimReserva) {
    let diffDays = moment(context.data.dataFimReserva).diff(
      moment(context.data.dataInicioReserva),
      'days'
    );
    if (diffDays < 0) {
      throw Error("A Data fim da reserva deve ser igual ou maior que a data inicio da reserva.");
    }
  }
  return context;
}

export default {
  before: {
    all: [authenticate('jwt')],
    find: [includeRelacoesFind],
    get: [includeRelacoesFind],
    create: [validaDateAntes],
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
