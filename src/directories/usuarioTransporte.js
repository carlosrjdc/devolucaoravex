const db = require("../../models");
const Helpers = require("../helpers");
const transportadoraDirectories = require("./transportadoraDirectories");
const userTransporte = db.FuncionarioTransportadora;

const usuarioTransporteDirectories = {
  createNewFunctionarioTransportadora: async (nome, email, receberEmail, idTransportadora) => {
    return await userTransporte.create({ nome, email, receberEmail, idTransportadora });
  },

  findTransportadoraByPkAndCreateNewFuncionario: async (nome, email, receberEmail, idTransportadora) => {
    const verificarTransportadora = await transportadoraDirectories.findTransportadoraById(idTransportadora);
    if (verificarTransportadora) {
      return usuarioTransporteDirectories.createNewFunctionarioTransportadora(nome, email, receberEmail, idTransportadora);
    }
  },
  deleteFuncionarioTransportadoraById: async (id) => {
    return await userTransporte.destroy({
      where: {
        id: id,
      },
    });
  },

  findAllFuncionarios: async (id) => {
    return await userTransporte.findAll();
  },
};

module.exports = usuarioTransporteDirectories;
