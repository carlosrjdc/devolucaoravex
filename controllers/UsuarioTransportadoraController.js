const demandaDirectories = require("../src/directories/demandaDirectories");
const transportadoraDirectories = require("../src/directories/transportadoraDirectories");
const usuarioTransporteDirectories = require("../src/directories/usuarioTransporte");
require("dotenv").config();

class UsuarioTransportadoraController {
  static cadastarNovoUsuario = async (req, res) => {
    const { nome, email, receberEmail, idTransportadora } = req.body;
    try {
      const novoUsuario = await usuarioTransporteDirectories.findTransportadoraByPkAndCreateNewFuncionario(
        nome,
        email,
        receberEmail,
        idTransportadora
      );
      res.status(200).json(novoUsuario);
    } catch (erro) {
      return res.status(500).json(erro.message);
    }
  };

  static deletarFuncionarioPorId = async (req, res) => {
    try {
      const deletarRegistro = await usuarioTransporteDirectories.deleteFuncionarioTransportadoraById(req.params.id);
      res.status(200).json("Registro deletado com sucesso");
    } catch (erro) {
      return res.status(500).json(erro.message);
    }
  };

  static todosFuncionarios = async (req, res) => {
    try {
      const usuarios = await usuarioTransporteDirectories.findAllFuncionarios();
      res.status(200).json(usuarios);
    } catch (erro) {
      return res.status(500).json(erro.message);
    }
  };
}

module.exports = UsuarioTransportadoraController;
