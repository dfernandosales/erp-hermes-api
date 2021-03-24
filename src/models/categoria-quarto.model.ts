import { Sequelize, DataTypes, Model } from 'sequelize';
import { Application } from '../declarations';
import { HookReturn } from 'sequelize/types/lib/hooks';
import { BaseModel } from './common';

export default function (app: Application): typeof Model {
  const sequelizeClient: Sequelize = app.get('sequelizeClient');
  const categoriaQuarto = sequelizeClient.define('categoria_quarto', {
    ...BaseModel,
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'nome_categoria',
    },
    valor: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      field: 'valor'
    },
  }, {
    hooks: {
      beforeCount(options: any): HookReturn {
        options.raw = true;
      }
    }
  });

  (categoriaQuarto as any).associate = function (models: any): void {
    categoriaQuarto.hasMany(models.quarto,
      {
        foreignKey: 'categoriaQuartoId',
        as: 'quarto'
      });
    categoriaQuarto.hasMany(models.categoria_item_quarto, {
      foreignKey: 'categoriaQuartoId',
      as: 'categoriaItemQuarto',
    });
  };

  return categoriaQuarto;
}
