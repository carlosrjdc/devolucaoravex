const express = require("express");
const RelatoriosController = require("../../controllers/RelatoriosController.js");
const checkLogin = require("../directories/authDirectories.js");

const router = express.Router();

//BUSCA
router.get("/relatorio/anomalia/:data", checkLogin, RelatoriosController.anomaliaPorData);

module.exports = router;
