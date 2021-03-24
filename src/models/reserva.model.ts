// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
import { Sequelize, DataTypes, Model } from 'sequelize';
import { Application } from '../declarations';
import { HookReturn } from 'sequelize/types/lib/hooks';
import { BaseModel } from './common';
import { StatusReserva } from './enum/reservaEnum';

export default function (app: Application): typeof Model {
  const sequelizeClient: Sequelize = app.get('sequelizeClient');
  const reserva = sequelizeClient.define('reserva', {
    ...BaseModel,
    dataInicioReserva: {
      type: DataTypes.DATE,
      field: 'data_inicio_reserva',
      allowNull: false
    },
    dataFimReserva: {
      type: DataTypes.DATE,
      field: 'data_fim_reserva',
    },
    valorReserva:{
      type: DataTypes.BIGINT,
      field: 'valor_reserva',
    },
    status:{
      type: DataTypes.STRING,
      defaultValue:StatusReserva.ABERTA
    }
  }, {
    hooks: {
      beforeCount(options: any): HookReturn {
        options.raw = true;
      }
    }
  });

  (reserva as any).associate = function (models: any): void {
    reserva.hasMany(models.reserva_quarto, {
      foreignKey: 'reservaId',
      as: 'reservaQuarto',
    }); 
    reserva.hasMany(models.reserva_hospede, {
      foreignKey: 'reservaId',
      as: 'reservaHospede',
    }); 
  };

  return reserva;
}
