import { Paginated, Params } from '@feathersjs/feathers';
import { SequelizeServiceOptions } from 'feathers-sequelize';
import { Application } from '../../declarations';
import { HospedeBuilder, HospedeClass } from '../../models/builder';
import { BaseService } from '../base';
import { Genero, EstadoCivil } from '../../models/enum/usuario.enum'

export class Hospede extends BaseService {
  //eslint-disable-next-line @typescript-eslint/no-unused-vars
  constructor(options: Partial<SequelizeServiceOptions>, app: Application) {
    super(options);
  }
  
  async create(data: Partial<HospedeClass>, params?: Params): Promise<HospedeClass[] | Paginated<HospedeClass>> {
    let obj: HospedeClass;
    
    obj = new HospedeBuilder()
      .setNomeCompleto("João Silva")
      .setEmail("joaosilva@hotmail.com")
      .setCep("124587953")
      .setDataNascimento() //Date
      .setSexo(Genero) //Enum Genero
      .setEstadoCivil(EstadoCivil) //Enum Estado Civil
      .setProfissao("Marceneiro")
      .setRua("Rua 01")
      .setBairro("Jardim Dias")
      .setNumEndereco("404")
      .setComplemento("Em frente ao pé de Jambo")
      .setCep("87000500")
      .setCidade("Maringá")
      .setEstado("Paraná")
      .setTelefone("44991144002")
      .build();
      
    return super.create(obj);
  }
}
