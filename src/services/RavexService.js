const Axios = require("../../config/Ravex");

const RavexService = {
  relacionarNotasdeUmaViagem: async (viagem) => {
    const dadosmap = await Axios.get(`/api/viagem-faturada/${viagem}/anomalias-registradas`)
      .then(async (response) => {
        return response.data.data;
      })
      .catch((erro) => {
        console.log(erro);
        return { erro: "não localizado" };
      });
    return dadosmap;
  },

  retornarDadosdeUmaViagem: async (viagem) => {
    const dadosmap = await Axios.get(`/api/viagem-faturada/${viagem}`)
      .then(async (response) => {
        return response.data.data;
      })
      .catch((erro) => {
        return { erro: erro };
      });

    return dadosmap;
  },
};
module.exports = RavexService;
