const express = require("express");
const PlacaController = require("../../controllers/PlacaController");
const checkLogin = require("../directories/authDirectories.js");

const router = express.Router();

//CREATE
router.post("/transporte/cadastrarplaca", checkLogin, PlacaController.cadastrarNovaPlaca);

//BUSCAR
router.get("/transporte/buscarplaca/:placa", checkLogin, PlacaController.buscraPlacaPorPlaca);
router.get("/buscartodasplacas", checkLogin, PlacaController.buscarTodasAsPlacas);

//DELETE
router.delete("/apagarplaca/:id", checkLogin, PlacaController.deletarPlaca);

module.exports = router;
