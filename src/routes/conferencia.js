const express = require("express");
const ConferenciaController = require("../../controllers/ConferenciaController.js");
const checkLogin = require("../directories/authDirectories.js");

const router = express.Router();

//BUSCA
router.get("/conferencia/resultadoconferencia/:id", checkLogin, ConferenciaController.resultadoConferencia);

//APP
//BUSCA
router.get("/itensparaconferencia/:id", checkLogin, ConferenciaController.itensContagemDividoRetornoeReentrega);
router.get("/conferenciafisica/:id", checkLogin, ConferenciaController.conferenciaFisicaPorId);

//CREATE
router.post("/addprodutoconferencia/:id", checkLogin, ConferenciaController.addProdutoConferencia);

// UPDATE
router.put("/atualizarregistroconferencia/:id", checkLogin, ConferenciaController.editarConferencia);

//DELETE
router.delete("/deletarconferencia/:id", checkLogin, ConferenciaController.deletarUmaConferencia);

module.exports = router;
