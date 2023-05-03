const db = require("../../models");
const Helpers = require("../helpers");
const transportadoraDirectories = require("./transportadoraDirectories");
const dbplaca = db.Placa;

const placaDirectories = {
  createNewPlaca: async (placa, perfil, idTransportadora) => {
    return await dbplaca.create({ placa, perfil, idTransportadora });
  },

  findTransportadoraByIdAndCreateNewPlaca: async (placa, perfil, idTransportadora) => {
    const verificarTransportadora = await transportadoraDirectories.findTransportadoraById(idTransportadora);

    if (verificarTransportadora) {
      const criarPlaca = await placaDirectories.createNewPlaca(placa, perfil, idTransportadora);
      return criarPlaca;
    } else {
      return "placa não existe";
    }
  },

  findPlacaByPlaca: async (placa) => {
    return await dbplaca.findOne({
      where: { placa: placa },
      attributes: ["placa", "perfil", "idTransportadora"],
      include: [{ model: db.Transportadora, as: "placas", attributes: ["nome"] }],
    });
  },

  findAllPlaca: async () => {
    return await dbplaca.findAll({
      attributes: ["id", "placa", "perfil", "createdAt"],
      include: [{ model: db.Transportadora, as: "placas", attributes: ["nome"] }],
    });
  },

  deletePlacaById: async (id) => {
    return await dbplaca.destroy({ where: { id: id } });
  },
};

module.exports = placaDirectories;
