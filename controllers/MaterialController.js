const materialDirectories = require("../src/directories/materialDirectories");
require("dotenv").config();

class MaterialController {
  static buscarMaterial = async (req, res) => {
    try {
      const item = await materialDirectories.buscarItem(req.params.id);
      if (item) {
        return res.status(200).json(item);
      } else {
        return res.status(200).json("Não localizado!");
      }
    } catch (erro) {
      return res.status(500).json(erro.message);
    }
  };
}

module.exports = MaterialController;
