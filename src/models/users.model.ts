// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
import { Sequelize, DataTypes, Model } from 'sequelize';
import { Application } from '../declarations';
import { HookReturn } from 'sequelize/types/lib/hooks';
import { BaseModel } from './common';
import { RoleUsuario } from './enum/usuario.enum';

export default function (app: Application): typeof Model {
  const sequelizeClient: Sequelize = app.get('sequelizeClient');
  const users = sequelizeClient.define('users', {
    ...BaseModel,
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    name:{
      type: DataTypes.STRING,
      allowNull: false
    },
    funcionarioId: {
      type: DataTypes.INTEGER,
      field: "funcionario_id",
    },
    role:{
      type: DataTypes.STRING,
      allowNull: false,
      values: Object.keys(RoleUsuario),
      defaultValue: RoleUsuario.FUNC,
      validate: {
        isIn: [Object.keys(RoleUsuario)],
      },
    }
  }, {
    hooks: {
      beforeCount(options: any): HookReturn {
        options.raw = true;
      }
    }
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (users as any).associate = function (models: any): void {
    users.belongsTo(models.funcionario, {
      foreignKey: "funcionarioId",
      as: "funcionario",
    });
    users.hasMany(models.reserva, {
      foreignKey: 'userId',
      as: 'user',
    }); 
  };

  return users;
}
