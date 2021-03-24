// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
import { Sequelize, DataTypes, Model } from 'sequelize';
import { Application } from '../declarations';
import { HookReturn } from 'sequelize/types/lib/hooks';
import { BaseModel } from './common';

export default function (app: Application): typeof Model {
  const sequelizeClient: Sequelize = app.get('sequelizeClient');
  const reservaQuarto = sequelizeClient.define('reserva_quarto', {
    ...BaseModel,
    reservaId: {
      type: DataTypes.INTEGER,
      field: 'reserva_id',
      allowNull: false,
    },
    quartoId: {
      type: DataTypes.INTEGER,
      field: 'quarto_id',
      allowNull: false,
    }
  }, {
    hooks: {
      beforeCount(options: any): HookReturn {
        options.raw = true;
      }
    }
  });

  (reservaQuarto as any).associate = function (models: any): void {
    reservaQuarto.belongsTo(models.quarto, {
      foreignKey: 'quartoId',
      as: 'quarto',
    });
    reservaQuarto.belongsTo(models.reserva, {
      foreignKey: 'reservaId',
      as: 'reserva',
    });
  };


  return reservaQuarto;
}
