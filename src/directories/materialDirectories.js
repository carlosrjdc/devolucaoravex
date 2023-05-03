const db = require("../../models");
const { Op } = require("sequelize");
const Helpers = require("../helpers");
const material = db.Material;

const materialDirectories = {
  verificarItensNaoCadastrado: async (ids) => {
    const dados = await material.findAll({
      where: { id: { [Op.in]: ids } },
    });

    const dadosBanco = Helpers.returnAtributteOfArrayMaterial(dados, "id", true);

    return ids.filter((item) => !dadosBanco.includes(item));
  },

  buscarItem: async (id) => {
    return await material.findOne({
      where: {
        [Op.or]: [
          {
            id: id,
          },
          {
            codean: id,
          },
          {
            coddum: id,
          },
        ],
      },
    });
  },
};

module.exports = materialDirectories;
