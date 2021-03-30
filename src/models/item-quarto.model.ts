import { Sequelize, DataTypes, Model } from 'sequelize';
import { Application } from '../declarations';
import { HookReturn } from 'sequelize/types/lib/hooks';
import { BaseModel } from './common';

export default function (app: Application): typeof Model {
  const sequelizeClient: Sequelize = app.get('sequelizeClient');
  const itemQuarto = sequelizeClient.define('item_quarto', {
    ...BaseModel,
    nome: {
      type: DataTypes.STRING,
      field:'nome_item',
      allowNull: false
    },
  }, {
    hooks: {
      beforeCount(options: any): HookReturn {
        options.raw = true;
      }
    }
  });

  (itemQuarto as any).associate = function (models: any): void {
    itemQuarto.hasMany(models.categoria_item_quarto, {
      foreignKey: 'itemQuartoId',
      as: 'categoriaItemQuarto',
    });
  };

  return itemQuarto;
}
