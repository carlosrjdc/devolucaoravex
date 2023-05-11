const userDirectories = require("../src/directories/userDirectories.js");
const db = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

class UserController {
  static buscarUsuarios = async (req, res) => {
    try {
      const usuarios = await userDirectories.findAllUser();
      res.status(200).json(usuarios);
    } catch (erro) {
      return res.status(500).json(erro.message);
    }
  };

  static buscarUmUsuario = async (req, res) => {
    try {
      const usuarios = await userDirectories.findUserByPk(req.params.id);
      res.status(200).json(usuarios);
    } catch (erro) {
      return res.status(500).json(erro.message);
    }
  };

  static criarUsuario = async (req, res) => {
    const { usuario, nome, senha, funcao } = req.body;

    try {
      const salt = await bcrypt.genSalt(12);
      const senhaHash = await bcrypt.hash(senha, salt);
      const User = await db.User.create({
        usuario,
        nome,
        senha: senhaHash,
        funcao,
      });
      res.status(200).json(User);
    } catch (erro) {
      return res.status(500).json(erro.message);
    }
  };

  static autenticarUsuario = async (req, res) => {
    try {
      const { usuario, senha } = req.body;

      const dadosUsuario = await db.User.findOne({
        where: {
          usuario: usuario,
        },
      });

      if (dadosUsuario) {
        const checkSenha = await bcrypt.compare(senha, dadosUsuario.senha);
        if (!checkSenha) {
          res.status(200).json({ Erro: "Usuario ou Senha Invalidos" });
        } else {
          const secret = process.env.SECRET;
          const token = jwt.sign(
            {
              usuario: {
                user: dadosUsuario.usuario,
                permissao: dadosUsuario.funcao,
              },
            },
            secret
          );

          res.status(200).json({
            Autenticado: "Autenticado com Sucesso",
            user: dadosUsuario.nome,
            token,
            id: dadosUsuario.id,
          });
        }
      } else {
        res.status(200).json({ Erro: "Usuario ou Senha Invalidos" });
      }
    } catch (erro) {
      return res.status(500).json(erro.message);
    }
  };
}

module.exports = UserController;
