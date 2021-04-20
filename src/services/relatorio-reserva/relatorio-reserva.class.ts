import { Id, NullableId, Paginated, Params, ServiceMethods } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { StatusReserva } from '../../models/enum/reservaEnum';
import moment from "moment-timezone";

interface Data { }

interface ServiceOptions { }

export class RelatorioReservas implements ServiceMethods<Data> {
  app: Application;
  options: ServiceOptions;

  constructor(options: ServiceOptions = {}, app: Application) {
    this.options = options;
    this.app = app;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async find(params?: Params): Promise<Data[] | Paginated<Data>> {
    const reservaService = this.app.service('reserva');
    const query = params?.query || {}
    query.status = StatusReserva.FINALIZADA

    if (query.dataInicioReserva) {
      query.dataInicioReserva = { $gte: moment(query.dataInicioReserva).tz("America/Sao_Paulo").startOf("day").toDate() }
    }
    if (query.dataFimReserva) {
      query.dataFimReserva = { $lte: moment(query.dataFimReserva).tz("America/Sao_Paulo").startOf("day").toDate() }
    }
    return reservaService.find(params)
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async get(id: Id, params?: Params): Promise<Data> {
    return {
      id, text: `A new message with ID: ${id}!`
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async create(data: Data, params?: Params): Promise<Data> {
    if (Array.isArray(data)) {
      return Promise.all(data.map(current => this.create(current, params)));
    }

    return data;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async update(id: NullableId, data: Data, params?: Params): Promise<Data> {
    return data;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async patch(id: NullableId, data: Data, params?: Params): Promise<Data> {
    return data;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async remove(id: NullableId, params?: Params): Promise<Data> {
    return { id };
  }
}
