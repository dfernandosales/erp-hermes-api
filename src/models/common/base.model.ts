import { DataTypes } from 'sequelize';

// Desativar ordenação das chaves do objeto pra organizar
// os dados do modelo de maneira lógica.
// tslint:disable:object-literal-sort-keys
export const BaseModel = {
  createdAt: {
    allowNull: false,
    defaultValue: DataTypes.NOW,
    type: DataTypes.DATE,
    field: 'created_at',
  },
  updatedAt: {
    allowNull: false,
    defaultValue: DataTypes.NOW,
    type: DataTypes.DATE,
    field: 'updated_at',
  },
  deletedAt: {
    allowNull: true,
    defaultValue: null,
    type: DataTypes.DATE,
    field: 'deleted_at',
  },
};

export interface BaseModelType {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}
