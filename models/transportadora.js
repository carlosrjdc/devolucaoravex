"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Transportadora extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Transportadora.hasMany(models.Placa, {
        as: "placas",
        foreignKey: "idTransportadora",
      });
      Transportadora.hasMany(models.FuncionarioTransportadora, {
        as: "funcionarios",
        foreignKey: "idTransportadora",
      });
    }
  }
  Transportadora.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      nome: {
        allowNull: false,
        type: DataTypes.STRING,
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
      modelName: "Transportadora",
    }
  );
  return Transportadora;
};
