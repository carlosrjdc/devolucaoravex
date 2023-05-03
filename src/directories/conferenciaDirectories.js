const db = require("../../models");
const Helpers = require("../helpers");
const { Op } = require("sequelize");
const conferencia = db.Conferencia;

const conferenciaDirectories = {
  deleteConferenciaByNote: async (nota, transaction) => {
    return conferencia.destroy(
      {
        where: {
          nota_fiscal: nota,
        },
      },
      { transaction }
    );
  },

  deletarUmaConferenciaFisicaById: async (id) => {
    return conferencia.destroy({
      where: {
        id: id,
      },
    });
  },

  findConferenceById: async (id) => {
    return await conferencia.findAll({
      where: {
        idDemanda: id,
      },
      include: [
        {
          model: db.Material,
          as: "materiais",
        },
      ],
    });
  },
  insertItemsInConference: async (arrayComAtributo, transaction) => {
    return await conferencia.bulkCreate(
      arrayComAtributo,
      {
        fields: ["idDemanda", "nota_fiscal", "motivo", "produto", "quantidade", "tipo"],
      },
      { transaction }
    );
  },

  diferencaContagem: async (id) => {
    const info = await conferenciaDirectories.findConferenceById(id);
    const final = await Helpers.differenceQuantityPerProduct(Helpers.adjustMaterialPerConference(info));

    return final;
  },

  //ORGANIZAR

  itensContagemDividoRetornoeReentrega: async (id) => {
    const dados = await conferenciaDirectories.findConferenceById(id);
    const resultadoMap = await Helpers.separarDevolucaoDeReentrega(dados);
    const resultado = Helpers.organizarDadosParaResposta(resultadoMap);

    return resultado;
  },

  cadastrarProdutoConferencia: async (id, produto, quantidade, quantidadeAvaria, temperatura, sif, lote, observacao) => {
    conferencia.create({
      produto,
      quantidade,
      quantidadeAvaria,
      temperatura,
      sif,
      lote,
      tipo: "fisico",
      idDemanda: id,
      observacao,
    });
  },

  diferencaoContagem: async (id) => {
    const dados = await conferenciaDirectories.findConferenceById(id);
    const ajustarDados = await Helpers.ajustarDadosParaResultadoConferencia(dados);
    const final = await Helpers.diferencaQuantidadePorProduto(ajustarDados);

    return final;
  },

  buscarConferenciaFisica: async (id) => {
    return await conferencia.findAll({
      where: {
        [Op.and]: {
          idDemanda: id,
          tipo: "fisico",
        },
      },
      include: [
        {
          model: db.Material,
          as: "materiais",
        },
      ],
      order: [["produto", "ASC"]],
    });
  },

  editarConferencia: async (
    id,
    temperatura = null,
    quantidade = null,
    quantidadeAvaria = null,
    sif = null,
    lote = null,
    observacao = null
  ) => {
    const info = await conferencia.update(
      {
        temperatura,
        quantidade,
        quantidadeAvaria,
        sif,
        lote,
        observacao,
      },
      {
        where: {
          id: id,
        },
      }
    );
  },
};

module.exports = conferenciaDirectories;
