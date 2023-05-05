const express = require("express");
const PlacaController = require("../../controllers/PlacaController");
const checkLogin = require("../directories/authDirectories.js");
const multer = require("multer");

const storage = multer.memoryStorage();
const upload = multer({ storage });

const router = express.Router();
//UPLOAD PLACA
router.post("/uploadplacaemmassa", upload.single("arquivo"), PlacaController.InputEmMassaSku);

//CREATE
router.post("/transporte/cadastrarplaca", checkLogin, PlacaController.cadastrarNovaPlaca);

//BUSCAR
router.get("/transporte/buscarplaca/:placa", checkLogin, PlacaController.buscraPlacaPorPlaca);
router.get("/buscartodasplacas", checkLogin, PlacaController.buscarTodasAsPlacas);

//DELETE
router.delete("/apagarplaca/:id", checkLogin, PlacaController.deletarPlaca);

module.exports = router;
