import { Paginated, Params } from '@feathersjs/feathers';
import { SequelizeServiceOptions } from 'feathers-sequelize';
import { Application } from '../../declarations';
import { ReservaBuilder, ReservaClass } from '../../models/builder';
import { BaseService } from '../base';
import moment from "moment-timezone";

export class Reserva extends BaseService {
  app: Application;
  constructor(options: Partial<SequelizeServiceOptions>, app: Application) {
    super(options);
    this.app = app;
  }

  async create(data: Partial<ReservaClass>, params?: Params): Promise<ReservaClass[] | Paginated<ReservaClass>> {
    let obj: ReservaClass;
    if (data.dataFimReserva && data.dataInicioReserva) {
      obj = new ReservaBuilder()
        .setDataInicioReserva(moment(data.dataInicioReserva).tz("America/Sao_Paulo").startOf("day").toDate())
        .setDataFimReserva(moment(data.dataFimReserva).tz("America/Sao_Paulo").startOf("day").toDate())
        .setUserId(params?.user?.id)
        .build();
    } else {
      obj = new ReservaBuilder()
        .setDataInicioReserva(moment(data.dataInicioReserva).tz("America/Sao_Paulo").startOf("day").toDate())
        .setUserId(params?.user?.id)
        .build();
    }
    return super._create(obj);
  }
}
