// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
import { Sequelize, DataTypes, Model } from 'sequelize';
import { Application } from '../declarations';
import { HookReturn } from 'sequelize/types/lib/hooks';
import { BaseModel } from './common';

export default function (app: Application): typeof Model {
  const sequelizeClient: Sequelize = app.get('sequelizeClient');
  const cargo = sequelizeClient.define('cargo', {
    ...BaseModel,
    nomeCargo: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'nome_cargo'
    },
    salario: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      field: 'salario_cargo'
    },
  }, {
    hooks: {
      beforeCount(options: any): HookReturn {
        options.raw = true;
      }
    }
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (cargo as any).associate = function (models: any): void {
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
  };

  return cargo;
}
