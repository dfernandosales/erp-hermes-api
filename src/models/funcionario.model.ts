// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
import { Sequelize, DataTypes, Model } from 'sequelize';
import { Application } from '../declarations';
import { HookReturn } from 'sequelize/types/lib/hooks';
import { BaseModel } from './common';
import { EstadoCivil, Genero } from './enum/usuario.enum';

export default function (app: Application): typeof Model {
  const sequelizeClient: Sequelize = app.get('sequelizeClient');
  const funcionario = sequelizeClient.define('funcionario', {
  ...BaseModel,
    nomeCompleto: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "nome_completo"
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    cpf: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    dataNascimento: {
      type: DataTypes.DATE,
      field: "data_nascimento",
      allowNull: false
    },
    sexo: {
      type: DataTypes.ENUM,
      allowNull: false,
      values: Object.keys(Genero),
      validate: {         
        isIn: [Object.keys(Genero)],
      },
    },
    estadoCivil: {
      type: DataTypes.ENUM,
      allowNull: false,
      field: "estado_civil",
      values: Object.keys(EstadoCivil),
      validate: {         
        isIn: [Object.keys(EstadoCivil)],
      },     
    },
    cargo: {
      type: DataTypes.STRING,
      allowNull: false
    },
    rua: {
      type: DataTypes.STRING,
      allowNull: false
    },
    bairro: {
      type: DataTypes.STRING,
      allowNull: false
    },
    numEndereco: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "num_endereco" 
    },
    complemento: {
      type: DataTypes.STRING,
    },
    cep: {
      type: DataTypes.STRING,
      allowNull: false
    },
    cidade: {
      type: DataTypes.STRING,
      allowNull: false
    },
    estado: {
      type: DataTypes.STRING,
      allowNull: false
    },
    telefone: {
      type: DataTypes.STRING,
      allowNull: false
    },
    turnoTrabalho: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "turno_trabalho"
    },
  }, {
    hooks: {
      beforeCount(options: any): HookReturn {
        options.raw = true;
      }
    }
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (funcionario as any).associate = function (models: any): void {
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
  };

  return funcionario;
}
