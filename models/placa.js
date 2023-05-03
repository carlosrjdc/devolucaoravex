"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Placa extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Placa.belongsTo(models.Transportadora, {
        as: "placas",
        foreignKey: "idTransportadora",
      });
    }
  }
  Placa.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      placa: {
        type: DataTypes.STRING,
      },
      perfil: {
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
      modelName: "Placa",
    }
  );
  return Placa;
};
