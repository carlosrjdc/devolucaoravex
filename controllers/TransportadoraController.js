const demandaDirectories = require("../src/directories/demandaDirectories");
const transportadoraDirectories = require("../src/directories/transportadoraDirectories");
require("dotenv").config();

class TransportadoraController {
  static criarNovaTransportadora = async (req, res) => {
    try {
      const novaTransportadora = await transportadoraDirectories.createNewTransportadora(req.body.nome);
      res.status(200).json(novaTransportadora);
    } catch (erro) {
      return res.status(500).json(erro.message);
    }
  };
  static buscarTodasTransportadoras = async (req, res) => {
    try {
      const todasTransportadoras = await transportadoraDirectories.findAllTransportadora();
      res.status(200).json(todasTransportadoras);
    } catch (erro) {
      return res.status(500).json(erro.message);
    }
  };

  static deletarTransportadora = async (req, res) => {
    const dados = await transportadoraDirectories.deleteTransportadoraById(req.params.id);
    try {
      res.status(200).json("Registro deletado com sucesso");
    } catch (error) {
      // Caso ocorra algum erro
      console.error("Erro ao realizar deletar Registro:", error);
    }
  };
}

module.exports = TransportadoraController;
