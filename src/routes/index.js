const express = require("express");
const cors = require("cors");
const users = require("./users.js");
const notaFiscal = require("./notaFiscal.js");
const demanda = require("./demanda.js");
const conferencia = require("./conferencia.js");
const transportadora = require("./transportadora.js");
const usuarioTransportadora = require("./usuarioTransportadora.js");
const placa = require("./placa.js");
const relatorio = require("./relatorios.js");
const material = require("./material.js");

const routes = (app) => {
  app.route("/").get((req, res) => {
    res.status(200).send({ Titulo: "Carlos Roberto" });
  });

  app.use(
    express.json(),
    cors(),
    users,
    notaFiscal,
    demanda,
    conferencia,
    transportadora,
    usuarioTransportadora,
    placa,
    relatorio,
    material,
    express.raw({ type: "application/pdf" })
  );
};

module.exports = routes;
