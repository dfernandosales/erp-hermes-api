// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
import { Sequelize, DataTypes, Model } from 'sequelize';
import { Application } from '../declarations';
import { HookReturn } from 'sequelize/types/lib/hooks';
import { BaseModel } from './common';

export default function (app: Application): typeof Model {
  const sequelizeClient: Sequelize = app.get('sequelizeClient');
  const pagamento = sequelizeClient.define('pagamento', {
    ...BaseModel,
    dataPagamento: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'data_pagamento'
    },
    descricao: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    valor: {
      type: DataTypes.NUMBER,
      allowNull: false
    }
  }, {
    hooks: {
      beforeCount(options: any): HookReturn {
        options.raw = true;
      }
    }
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (pagamento as any).associate = function (models: any): void {
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
  };

  return pagamento;
}