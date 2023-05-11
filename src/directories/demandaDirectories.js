const db = require("../../models");
const moment = require("moment-timezone");
const Helpers = require("../helpers");
const RavexService = require("../services/RavexService");
const conferenciaDirectories = require("./conferenciaDirectories");
const sendEmail = require("../helpers/sendEmail");
const demanda = db.Demanda_retorno;
const sequelize = db.sequelize;

const demandaDirectories = {
  findDemandaById: async (id) => {
    return await demanda.findByPk(id, {
      include: [
        {
          model: db.User,
          as: "cadastrado",
          attributes: ["nome", "funcao"],
        },
        {
          model: db.User,
          as: "conferente",
          attributes: ["nome", "funcao"],
        },
      ],
    });
  },

  findInfoOneTravelInRavex: async (viagem) => {
    return RavexService.retornarDadosdeUmaViagem(viagem);
  },

  deleteDemandaById: async (id) => {
    return demanda.destroy({
      where: {
        id: id,
      },
    });
  },
  findDemandaByDate: async (data) => {
    return await demanda.findAll({
      where: {
        data: data,
      },
      include: [
        {
          model: db.User,
          as: "conferente",
          attributes: ["id", "usuario", "nome", "funcao"],
        },
      ],
    });
  },

  findDemandaByStatusEmConferenciaPerId: async (id) => {
    return await demanda.findAll({
      where: {
        idConferente: id,
        status: "Em Conferencia",
      },
      include: [
        {
          model: db.User,
          as: "conferente",
          attributes: ["id", "usuario", "nome", "funcao"],
        },
      ],
    });
  },

  createNewDemanda: async (placa, transportadora, idCadastro) => {
    return await demanda.create({
      idCadastro,
      placa,
      transportadora,
      status: "A Conferir",
      data: moment(new Date()).format("YYYY-MM-DD"),
    });
  },

  findDemandaPerStatusGroupByDate: async (data) => {
    return await demanda.findAll({
      where: {
        data: data,
      },
      attributes: ["status", [sequelize.fn("COUNT", sequelize.col("status")), "total"]],
      group: ["status"],
    });
  },

  endDemandaPerAdm: async (id) => {
    return await demanda.update(
      {
        status: "Concluido",
        fimProcesso: new Date(),
      },
      {
        where: {
          id: id,
        },
      }
    );
  },

  endConferencia: async (id) => {
    return await demanda.update(
      {
        status: "Conferido",
        fimConferencia: new Date(),
      },
      {
        where: {
          id: id,
        },
      }
    );
  },

  findEmailPerTransportadora: async (idTransportadora) => {
    return await db.FuncionarioTransportadora.findAll({
      where: {
        idTransportadora: idTransportadora,
        recebeEmail: "sim",
      },
    });
  },

  findEmailPerTransportadora: async (idTransportadora) => {
    return await db.FuncionarioTransportadora.findAll({
      where: {
        idTransportadora: idTransportadora,
        recebeEmail: "sim",
      },
    });
  },

  reopenDemanda: async (id) => {
    return await demanda.update(
      {
        status: "Em Conferencia",
        fimConferencia: null,
      },
      {
        where: {
          id: id,
        },
      }
    );
  },

  finalizarDemandaUltimaEtapaEnviarEmail: async (id, idtransportadora, placa, req, res) => {
    const emails = await Helpers.returnAtributteOfArrayMaterial(
      await demandaDirectories.findEmailPerTransportadora(idtransportadora),
      "email"
    );
    const dadosjustados = await Helpers.adjustMaterialPerConference(await conferenciaDirectories.findConferenceById(id));
    const final = await Helpers.differenceQuantityPerProduct(dadosjustados);
    try {
      const verificarEmail = await sendEmail.enviarEmail(id, placa, final, emails, req, res);
      if (verificarEmail !== "erro") {
        return "Email Enviado com sucesso!!!";
      } else {
        return "Email não enviado!";
      }
    } catch (erro) {
      return "Email não enviado!";
    }
  },

  //APP

  cadastrarInicioDeDemanda: async (id, idconferente, doca) => {
    return await demanda.update(
      {
        idConferente: idconferente,
        Doca: doca,
        status: "Em Conferencia",
        inicioConferencia: new Date(),
      },
      {
        where: {
          id: id,
        },
      }
    );
  },
};

module.exports = demandaDirectories;
