import { Sequelize, DataTypes, Model } from 'sequelize';
import { Application } from '../declarations';
import { HookReturn } from 'sequelize/types/lib/hooks';
import { BaseModel } from './common';

export default function (app: Application): typeof Model {
  const sequelizeClient: Sequelize = app.get('sequelizeClient');
  const quarto = sequelizeClient.define('quarto', {
    ...BaseModel,
    numero: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'numero_quarto',
    },
    vacancia: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
      field: 'vacancia',
    },
    categoriaQuartoId: {
      type: DataTypes.NUMBER,
      allowNull: false,
      field: 'categoria_quarto_id',
    },
  }, {
    hooks: {
      beforeCount(options: any): HookReturn {
        options.raw = true;
      }
    }
  });

  (quarto as any).associate = function (models: any): void {
    quarto.belongsTo(models.categoria_quarto,
    {
      foreignKey: 'categoriaQuartoId',
      as: 'categoriaQuarto'
    });
    quarto.hasMany(models.reserva_quarto, {
      foreignKey: "quartoId",
      as: "reservaQuarto",
    }); 
  };

  return quarto;
}
