const express = require("express");
const TransportadoraController = require("../../controllers/TransportadoraController");
const checkLogin = require("../directories/authDirectories.js");

const router = express.Router();

//BUSCA
router.get("/transporte/todastransprotadora", checkLogin, TransportadoraController.buscarTodasTransportadoras);

//CREATE
router.post("/transporte/cadastrartransportadora", checkLogin, TransportadoraController.criarNovaTransportadora);

//DELETE
router.delete("/transportadora/:id", checkLogin, TransportadoraController.deletarTransportadora);

module.exports = router;

///transporte/todastransprotadora
