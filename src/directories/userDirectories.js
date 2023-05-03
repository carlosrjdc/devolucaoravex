const db = require("../../models");
const user = db.User;
const Services = require("../services");

const userDirectories = {
  findAllUser: async () => {
    return await user.findAll({ attributes: ["usuario", "nome"] });
  },
  findUserByPk: async (id) => {
    return await user.findByPk(id, { attributes: ["usuario", "nome"] });
  },
  createUser: async (usuario, nome, senha, funcao) => {
    return await user.create({ usuario, nome, senha, funcao });
  },
};

module.exports = userDirectories;
