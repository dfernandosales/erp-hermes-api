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
  
  async create(data: HospedeClass, params?: Params): Promise<HospedeClass[] | Paginated<HospedeClass>> {
    let obj: HospedeClass;
    
    obj = new HospedeBuilder()
      .setNomeCompleto(data.nomeCompleto)
      .setEmail(data.email)
      .setCpf(data.cpf)
      .setDataNascimento(data.dataNascimento) //Date
      .setSexo(data.sexo) //Enum Genero
      .setEstadoCivil(data.estadoCivil) //Enum Estado Civil
      .setProfissao(data.profissao)
      .setRua(data.rua)
      .setBairro(data.bairro)
      .setNumEndereco(data.numEndereco)
      .setComplemento(data.complemento)
      .setCep(data.cep)
      .setCidade(data.cidade)
      .setEstado(data.estado)
      .setTelefone(data.telefone)
      .build();
      
    return super.create(obj);
  }
}
