// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
import { Sequelize, DataTypes, Model } from 'sequelize';
import { Application } from '../declarations';
import { HookReturn } from 'sequelize/types/lib/hooks';
import { BaseModel } from './common';

export default function (app: Application): typeof Model {
  const sequelizeClient: Sequelize = app.get('sequelizeClient');
  const hospede = sequelizeClient.define('hospede', {
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
    nacionalidade: {
      type: DataTypes.STRING,
      allowNull: false
    },
    sexo: {
      type: DataTypes.STRING, //Que tipo usar para sexo??
      allowNull: false
    },
    estadoCivil: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "estado_civil"      
    },
    profissao: {
      type: DataTypes.STRING,
      allowNull: false
    },
    endereco: {
      type: DataTypes.STRING,
      allowNull: false
    },
    telefone: {
      type: DataTypes.NUMBER,
      allowNull: false
    },
  }, {
    hooks: {
      beforeCount(options: any): HookReturn {
        options.raw = true;
      }
    }
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (hospede as any).associate = function (models: any): void {
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
  };

  return hospede;
}
