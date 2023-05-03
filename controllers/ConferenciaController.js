const conferenciaDirectories = require("../src/directories/conferenciaDirectories.js");
require("dotenv").config();

class ConferenciaController {
  static resultadoConferencia = async (req, res) => {
    try {
      const notas = await conferenciaDirectories.diferencaContagem(req.params.id);
      res.status(200).json(notas);
    } catch (erro) {
      return res.status(500).json(erro.message);
    }
  };

  static conferenciaFisicaPorId = async (req, res) => {
    try {
      const notas = await conferenciaDirectories.buscarConferenciaFisica(req.params.id);
      res.status(200).json(notas);
    } catch (erro) {
      return res.status(500).json(erro.message);
    }
  };

  static editarConferencia = async (req, res) => {
    const { temperatura, quantidade, quantidadeAvaria, avaria, sif, lote, observacao } = req.body;

    try {
      const notas = await conferenciaDirectories.editarConferencia(
        req.params.id,
        temperatura,
        quantidade,
        quantidadeAvaria,
        sif,
        lote,
        observacao
      );
      res.status(200).json(notas);
    } catch (erro) {
      return res.status(500).json(erro.message);
    }
  };

  static itensContagemDividoRetornoeReentrega = async (req, res) => {
    try {
      const itens = await conferenciaDirectories.itensContagemDividoRetornoeReentrega(req.params.id);
      res.status(200).json(itens);
    } catch (erro) {
      return res.status(500).json(erro.message);
    }
  };

  static deletarUmaConferencia = async (req, res) => {
    try {
      const itens = await conferenciaDirectories.deletarUmaConferenciaFisicaById(req.params.id);
      res.status(200).json("Registro Deletado com sucesso");
    } catch (erro) {
      return res.status(500).json(erro.message);
    }
  };

  static addProdutoConferencia = async (req, res) => {
    const { produto, quantidade, quantidadeAvaria, temperatura, sif, lote, observacao } = req.body;
    try {
      const itens = await conferenciaDirectories.cadastrarProdutoConferencia(
        req.params.id,
        produto,
        quantidade,
        quantidadeAvaria,
        temperatura,
        sif,
        lote,
        observacao
      );
      res.status(200).json(itens);
    } catch (erro) {
      return res.status(500).json(erro.message);
    }
  };
}

module.exports = ConferenciaController;
