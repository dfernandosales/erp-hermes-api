import { Paginated, Params } from '@feathersjs/feathers';
import { SequelizeServiceOptions } from 'feathers-sequelize';
import { Application } from '../../declarations';
import { QuartoBuilder, QuartoClass } from '../../models/builder';
import { BaseService } from '../base';

export class Quarto extends BaseService {
  //eslint-disable-next-line @typescript-eslint/no-unused-vars
  constructor(options: Partial<SequelizeServiceOptions>, app: Application) {
    super(options);
  }

  async create(data: QuartoClass, params?: Params): Promise<QuartoClass[] | Paginated<QuartoClass>> {
    let obj: QuartoClass;
    obj = new QuartoBuilder().setNumero(data.numero).setCategoriaQuartoId(data.categoriaQuartoId).setVacancia(true);
    return super._create(obj);
  }
}