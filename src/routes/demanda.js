const express = require("express");
const DemandaController = require("../../controllers/DemandaController.js");
const checkLogin = require("../directories/authDirectories.js");

const router = express.Router();
//SITE

//BUSCA
router.get("/buscarinfodemanda/:id", checkLogin, DemandaController.buscarDemandaPorId);
router.get("/infodeumaviagem/:viagem", checkLogin, DemandaController.buscarInfoDeUmaViagemRavex);
router.get("/buscardemandaspordata/:data", checkLogin, DemandaController.buscarDemandaPorData);
router.get("/buscarstatusagrupado/:data", checkLogin, DemandaController.buscarDemandaPorStatusData);

//CRIAR
router.post("/cadastrardemanda", checkLogin, DemandaController.criarNovaDemanda);
router.post("/enviaremail/:id", checkLogin, DemandaController.enviarEmail);

//UPDATE
router.put("/finalizardemandaemail/:id", checkLogin, DemandaController.finalizarDemandaParteAdm);
router.put("/reabrirdemandaparaconferencia/:id", checkLogin, DemandaController.reabrirDemandaParaConferencia);

//APP
//BUSCA
router.get("/buscardemandasemabertoporid/:id", checkLogin, DemandaController.buscarDemandaEmAbertoPorConferente);

//UPDATE
router.put("/iniciardemanda/:id", checkLogin, DemandaController.iniciarConferenciaApp);
router.put("/finalizarconferenciafisica/:id", checkLogin, DemandaController.finalizarConferenciaApp);

module.exports = router;
