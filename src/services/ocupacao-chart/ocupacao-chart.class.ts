import { Id, NullableId, Paginated, Params, ServiceMethods } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import moment from "moment-timezone";
import { CategoriaQuarto } from '../categoria-quarto/categoria-quarto.class';
import { Reserva } from '../reserva/reserva.class';
import { NotImplemented } from '@feathersjs/errors';

interface Data { }

interface ServiceOptions { }


export class OcupacaoChart implements ServiceMethods<Data> {
  app: Application;
  options: ServiceOptions;

  get categoriaQuartoService(): CategoriaQuarto {
    return this.app.service("categoria-quarto");
  }

  get quartoService(): Reserva {
    return this.app.service("quarto");
  }

  constructor(options: ServiceOptions = {}, app: Application) {
    this.options = options;
    this.app = app;
  }

  async find(params?: Params): Promise<any> {
    if (params?.query?.type === 'Tudo') {
      const livre = (await this.quartoService.find({ query: { vacancia: true } })) as Paginated<any>;
      const todos = (await this.quartoService.find()) as Paginated<any>;
      const ocupado = (await this.quartoService.find({ query: { vacancia: false } })) as Paginated<any>;
      return { data: { todos, livre, ocupado } };
    } else {
      const categorias: any = await this.categoriaQuartoService.find({ paginate: false });

      let dashboard = [];
      for (const item of categorias) {
        const vazios = (await this.quartoService.find({ query: { categoriaQuartoId: item.id, vacancia: true } })) as Paginated<any>;
        const ocupados = (await this.quartoService.find({ query: { categoriaQuartoId: item.id, vacancia: false } })) as Paginated<any>;
        dashboard.push({ name: item.nome, Ocupado: ocupados.total, Livre: vazios.total });
      }
      return { data: dashboard };
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async get(id: Id, params?: Params): Promise<Data> {
    return NotImplemented;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async create(data: Data, params?: Params): Promise<Data> {
    return NotImplemented;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async update(id: NullableId, data: Data, params?: Params): Promise<Data> {
    return NotImplemented;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async patch(id: NullableId, data: Data, params?: Params): Promise<Data> {
    return NotImplemented;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async remove(id: NullableId, params?: Params): Promise<Data> {
    return NotImplemented;
  }
}
