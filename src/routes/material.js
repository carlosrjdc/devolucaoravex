const express = require("express");
const MaterialController = require("../../controllers/MaterialController.js");
const checkLogin = require("../directories/authDirectories.js");

const router = express.Router();

//BUSCA
router.get("/buscarmaterial/:id", checkLogin, MaterialController.buscarMaterial);

//CRIAR
router.post("/criaritem", checkLogin, MaterialController.cadastrarItem);

module.exports = router;
