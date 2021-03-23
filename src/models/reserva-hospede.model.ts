// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
import { Sequelize, DataTypes, Model } from 'sequelize';
import { Application } from '../declarations';
import { HookReturn } from 'sequelize/types/lib/hooks';
import { BaseModel } from './common';

export default function (app: Application): typeof Model {
  const sequelizeClient: Sequelize = app.get('sequelizeClient');
  const reservaHospede = sequelizeClient.define('reserva_hospede', {
    ...BaseModel,
    reservaId: {
      type: DataTypes.INTEGER,
      field: "reserva_id",
      allowNull: false,
    },
    hospedeId: {
      type: DataTypes.INTEGER,
      field: "hospede_id",
      allowNull: false,
    },
  }, {
    hooks: {
      beforeCount(options: any): HookReturn {
        options.raw = true;
      }
    }
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (reservaHospede as any).associate = function (models: any): void {
    reservaHospede.belongsTo(models.hospede, {
      foreignKey: "hospedeId",
      as: "hospede",
    });
    reservaHospede.belongsTo(models.reserva, {
      foreignKey: "reservaId",
      as: "reserva",
    });
  };

  return reservaHospede;
}
