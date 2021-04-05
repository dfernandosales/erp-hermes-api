import { Paginated, Params } from '@feathersjs/feathers';
import { SequelizeServiceOptions } from 'feathers-sequelize';
import { Application } from '../../declarations';
import { ReservaBuilder, ReservaClass } from '../../models/builder';
import { BaseService } from '../base';
import moment from "moment-timezone";

export class Reserva extends BaseService {
  constructor(options: Partial<SequelizeServiceOptions>, app: Application) {
    super(options);
  }

  async create(data: Partial<ReservaClass>, params?: Params): Promise<ReservaClass[] | Paginated<ReservaClass>> {
    let obj: ReservaClass;
    if (data.DataFimReserva) {
      obj = new ReservaBuilder()
        .setDataInicioReserva(moment(data.DataInicioReserva).tz("America/Sao_Paulo").startOf("day").toDate())
        .setDataInicioReserva(moment(data.DataFimReserva).tz("America/Sao_Paulo").startOf("day").toDate())
        .build();
    } else {
      obj = new ReservaBuilder()
        .setDataInicioReserva(moment(data.DataInicioReserva).tz("America/Sao_Paulo").startOf("day").toDate())
        .build();
    }
    return super.create(obj);
  }
}
