"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class FuncionarioTransportadora extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      FuncionarioTransportadora.belongsTo(models.Transportadora, {
        as: "funcionarios",
        foreignKey: "idTransportadora",
      });
    }
  }
  FuncionarioTransportadora.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      nome: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
      },
      recebeEmail: {
        defaultValue: "não",
        type: DataTypes.STRING,
      },
      idTransportadora: {
        type: DataTypes.INTEGER,
        references: { model: "Transportadoras", key: "id" },
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: "FuncionarioTransportadora",
    }
  );
  return FuncionarioTransportadora;
};
