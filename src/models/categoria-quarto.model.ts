// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (categoriaQuarto as any).associate = function (models: any): void {
    categoriaQuarto.hasMany(models.quarto,
    {
      foreignKey: 'categoriaQuartoId',
      as: 'quarto'
    });
  };

  return categoriaQuarto;
}
