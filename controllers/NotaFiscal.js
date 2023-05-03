const notaFiscalDirectories = require("../src/directories/notasFiscaisDirectories");
require("dotenv").config();

class NotaFiscalController {
  static buscarNotasPorDemanda = async (req, res) => {
    try {
      const notas = await notaFiscalDirectories.findNotasByIdDemanda(req.params.id);
      res.status(200).json(notas);
    } catch (erro) {
      return res.status(500).json(erro.message);
    }
  };

  static notasFiscaisComAnomalias = async (req, res) => {
    try {
      const notas = await notaFiscalDirectories.invoicesWithAnomalies(req.params.id);
      res.status(200).json(notas);
    } catch (erro) {
      return res.status(500).json(erro.message);
    }
  };

  static deletarNotaPorIdEConferenciaPorNota = async (req, res) => {
    const { id, nota } = req.params;
    try {
      const notas = await notaFiscalDirectories.deleteNoteEDeleteConferenciaById(id, nota);
      res.status(200).json(notas);
    } catch (erro) {
      return res.status(500).json(erro.message);
    }
  };

  static cadastrarNotaEProduto = async (req, res) => {
    const { nota_fiscal, idDemanda, nota_fiscal_parcial, motivodevolucao, operador, status_nf, transporte, id_viagem } = req.body;

    const produtos = req.body.produtos;
    try {
      const Produtos = await notaFiscalDirectories.insertNoteAndProductInConferencia(
        nota_fiscal,
        idDemanda,
        nota_fiscal_parcial,
        motivodevolucao,
        operador,
        status_nf,
        transporte,
        id_viagem,
        produtos
      );
      res.status(200).json(Produtos);
    } catch (erro) {
      return res.status(500).json(erro.message);
    }
  };
}

module.exports = NotaFiscalController;
