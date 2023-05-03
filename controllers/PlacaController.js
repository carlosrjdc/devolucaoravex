const placaDirectories = require("../src/directories/placaDirectories");
require("dotenv").config();

class PlacaController {
  static cadastrarNovaPlaca = async (req, res) => {
    const { placa, perfil, idTransportadora } = req.body;
    try {
      const novoRegistro = await placaDirectories.findTransportadoraByIdAndCreateNewPlaca(placa, perfil, idTransportadora);
      res.status(200).json(novoRegistro);
    } catch (erro) {
      return res.status(500).json(erro.message);
    }
  };

  static buscraPlacaPorPlaca = async (req, res) => {
    const { placa } = req.params;
    try {
      const buscarPlaca = await placaDirectories.findPlacaByPlaca(placa);
      res.status(200).json(buscarPlaca);
    } catch (erro) {
      return res.status(500).json(erro.message);
    }
  };

  static buscarTodasAsPlacas = async (req, res) => {
    const { placa } = req.params;
    try {
      const placas = await placaDirectories.findAllPlaca();
      res.status(200).json(placas);
    } catch (erro) {
      return res.status(500).json(erro.message);
    }
  };

  static deletarPlaca = async (req, res) => {
    const { id } = req.params;
    try {
      const placas = await placaDirectories.deletePlacaById(id);
      res.status(200).json("Placa Apagada com sucesso");
    } catch (erro) {
      return res.status(500).json(erro.message);
    }
  };
}

module.exports = PlacaController;
