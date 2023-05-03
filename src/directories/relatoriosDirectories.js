const db = require("../../models");
const Helpers = require("../helpers");

const relatoriosDirectories = {
  findAnomaliasPerDate: (data) => {
    return db.Demanda_retorno.findAll({
      where: { data: data },
      include: [
        { model: db.User, as: "conferente", attributes: ["nome", "usuario"] },
        {
          model: db.Conferencia,
          as: "conferenciademanda",
          attributes: {
            exclude: ["id", "temperatura", "observacao", "sif", "lote", "createdAt", "updatedAt"],
          },
          include: [{ model: db.Material, as: "materiais", attributes: ["descricao"] }],
        },
        {
          model: db.NotaFiscal_retorno,
          as: "demandas",
        },
      ],
    });
  },

  relatorioPerDate: async (data) => {
    const info = await Helpers.adjustRelatorioAnaomalias(await relatoriosDirectories.findAnomaliasPerDate(data));
    return Helpers.joinArrays(info);
  },
};

module.exports = relatoriosDirectories;
