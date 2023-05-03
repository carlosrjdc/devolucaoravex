const db = require("../../models");
const Helpers = require("../helpers");
const transportadora = db.Transportadora;

const transportadoraDirectories = {
  createNewTransportadora: async (nome) => {
    return await transportadora.create({ nome });
  },
  findAllTransportadora: async () => {
    return await transportadora.findAll();
  },
  findTransportadoraById: async (id) => {
    return await transportadora.findByPk(id);
  },
  deleteTransportadoraById: async (id) => {
    return await transportadora.destroy({ where: { id: id } });
  },
};

module.exports = transportadoraDirectories;
