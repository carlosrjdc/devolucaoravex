const relatoriosDirectories = require("../src/directories/relatoriosDirectories");
require("dotenv").config();

class RelatoriosController {
  static anomaliaPorData = async (req, res) => {
    try {
      const anomalias = await relatoriosDirectories.relatorioPerDate(req.params.data);
      res.status(200).json(anomalias);
    } catch (erro) {
      return res.status(500).json(erro.message);
    }
  };
}

module.exports = RelatoriosController;
