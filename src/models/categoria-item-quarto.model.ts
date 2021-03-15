// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
import { Sequelize, DataTypes, Model } from 'sequelize';
import { Application } from '../declarations';
import { HookReturn } from 'sequelize/types/lib/hooks';
import { BaseModel } from './common';

export default function (app: Application): typeof Model {
  const sequelizeClient: Sequelize = app.get('sequelizeClient');
  const categoriaItemQuarto = sequelizeClient.define('categoria_item_quarto', {
    ...BaseModel,
    quantidade: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    categoriaQuartoId: {
      type: DataTypes.INTEGER,
      field: "categoria_quarto_id",
      allowNull: false,
    },
    itemQuartoId: {
      type: DataTypes.INTEGER,
      field: "item_quarto_id",
      allowNull: false,
    },
  }, {
    hooks: {
      beforeCount(options: any): HookReturn {
        options.raw = true;
      }
    }
  });

  (categoriaItemQuarto as any).associate = function (models: any): void {
    categoriaItemQuarto.belongsTo(models.item_quarto, {
      foreignKey: "itemQuartoId",
      as: "item",
    });
    categoriaItemQuarto.belongsTo(models.categoria_quarto, {
      foreignKey: "categoriaQuartoId",
      as: "categoria",
    });
  };

  return categoriaItemQuarto;
}
