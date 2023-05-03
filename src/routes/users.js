const express = require("express");
const UserController = require("../../controllers/User.js");
const checkLogin = require("../directories/authDirectories.js");

const router = express.Router();

router.get("/users", UserController, checkLogin, UserController.buscarUsuarios);
router.get("/user/:id", checkLogin, UserController.buscarUmUsuario);
router.post("/user", UserController.criarUsuario);
router.post("/autenticar", UserController.autenticarUsuario);

module.exports = router;
