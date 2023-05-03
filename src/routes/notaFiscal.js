const express = require("express");
const NotaFiscalController = require("../../controllers/NotaFiscal.js");
const checkLogin = require("../directories/authDirectories.js");

const router = express.Router();

//BUSCA
router.get("/listarnotaspordemanda/:id", checkLogin, NotaFiscalController.buscarNotasPorDemanda);
router.get("/ravex/relacionarnotas/:id", checkLogin, NotaFiscalController.notasFiscaisComAnomalias);

//CRIAÇÃO
router.post("/cadastrarnotafiscal", checkLogin, NotaFiscalController.cadastrarNotaEProduto);

//DELETAR
router.delete("/deletarnota/:id/:nota", checkLogin, NotaFiscalController.deletarNotaPorIdEConferenciaPorNota);

module.exports = router;
