const express = require("express");
const usuarioTransportadora = require("../../controllers/UsuarioTransportadoraController");
const checkLogin = require("../directories/authDirectories.js");

const router = express.Router();

//CREATE
router.post("/transporte/cadastrarfuncionariotransportadora", checkLogin, usuarioTransportadora.cadastarNovoUsuario);

//DELETE
router.delete("/funcionariotransportadora/:id", checkLogin, usuarioTransportadora.deletarFuncionarioPorId);

//GET
router.get("/transporte/buscarfuncionarios", checkLogin, usuarioTransportadora.todosFuncionarios);

module.exports = router;
