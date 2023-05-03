const demandaDirectories = require("../src/directories/demandaDirectories");
require("dotenv").config();

class DemandaController {
  //ADM
  static buscarDemandaPorId = async (req, res) => {
    try {
      const notas = await demandaDirectories.findDemandaById(req.params.id);
      res.status(200).json(notas);
    } catch (erro) {
      return res.status(500).json(erro.message);
    }
  };

  static buscarDemandaPorData = async (req, res) => {
    try {
      const demanda = await demandaDirectories.findDemandaByDate(req.params.data);
      res.status(200).json(demanda);
    } catch (erro) {
      return res.status(500).json(erro.message);
    }
  };

  static buscarDemandaPorStatusData = async (req, res) => {
    try {
      const status = await demandaDirectories.findDemandaPerStatusGroupByDate(req.params.data);
      res.status(200).json(status);
    } catch (erro) {
      return res.status(500).json(erro.message);
    }
  };

  static finalizarDemandaParteAdm = async (req, res) => {
    try {
      const status = await demandaDirectories.endDemandaPerAdm(req.params.id);
      res.status(200).json(status);
    } catch (erro) {
      return res.status(500).json(erro.message);
    }
  };

  static buscarInfoDeUmaViagemRavex = async (req, res) => {
    try {
      const viagem = await demandaDirectories.findInfoOneTravelInRavex(req.params.viagem);
      res.status(200).json(viagem);
    } catch (erro) {
      return res.status(500).json(erro.message);
    }
  };

  static criarNovaDemanda = async (req, res) => {
    const { placa, transportadora, idCadastro } = req.body;
    try {
      const demanda = await demandaDirectories.createNewDemanda(placa, transportadora, idCadastro);
      res.status(200).json(demanda);
    } catch (erro) {
      return res.status(500).json(erro.message);
    }
  };

  static enviarEmail = async (req, res) => {
    const { idtransportadora, placa } = req.body;

    try {
      const dados = await demandaDirectories.finalizarDemandaUltimaEtapaEnviarEmail(
        req.params.id,
        idtransportadora,
        placa,
        req,
        res
      );
    } catch (erro) {
      return res.status(500).json(erro.message);
    }
  };

  static reabrirDemandaParaConferencia = async (req, res) => {
    const { idtransportadora, placa } = req.body;

    try {
      const dados = await demandaDirectories.reopenDemanda(req.params.id);
      res.status(200).json("Demanda Atualizada com sucesso");
    } catch (erro) {
      return res.status(500).json(erro.message);
    }
  };

  //APP
  static buscarDemandaEmAbertoPorConferente = async (req, res) => {
    try {
      const demanda = await demandaDirectories.findDemandaByStatusEmConferenciaPerId(req.params.id);
      res.status(200).json(demanda);
    } catch (erro) {
      return res.status(500).json(erro.message);
    }
  };

  static iniciarConferenciaApp = async (req, res) => {
    const { idConferente, doca } = req.body;
    try {
      const demanda = await demandaDirectories.cadastrarInicioDeDemanda(req.params.id, idConferente, doca);
      res.status(200).json(demanda);
    } catch (erro) {
      return res.status(500).json(erro.message);
    }
  };
  static finalizarConferenciaApp = async (req, res) => {
    try {
      const demanda = await demandaDirectories.endConferencia(req.params.id);
      res.status(200).json(demanda);
    } catch (erro) {
      return res.status(500).json(erro.message);
    }
  };
}

module.exports = DemandaController;
