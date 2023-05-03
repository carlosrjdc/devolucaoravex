const { v4: uuidv4 } = require("uuid");

const Helpers = {
  verificarSeTemNumero: (nome) => {
    // Expressão regular para verificar se o nome contém apenas letras
    const regex = /^[a-zA-Z]+$/;

    // Verifica se o nome passado como parâmetro contém apenas letras e não contém números
    if (regex.test(nome) && !/\d/.test(nome)) {
      return true; // O nome está correto
    } else {
      return false; // O nome contém números ou outros caracteres
    }
  },

  diffArray: (arr1, arr2) => {
    return arr1.filter((item) => !arr2.includes(item));
  },
  addNewAttributeToArray: (arr) => {
    return arr.map((product) => ({
      idDemanda: product.idDemanda,
      nota_fiscal: product.nota_fiscal,
      motivo: product.motivo,
      produto: product.produto,
      quantidade: product.quantidade,
      tipo: "contabil",
    }));
  },

  filterByNotaFiscal: (arr) => {
    return arr.map((product) => ({
      idDemanda: product.idDemanda,
      nota_fiscal: product.nota_fiscal,
      motivo: product.motivo,
      produto: product.produto,
      quantidade: product.quantidade,
      tipo: "contabil",
    }));
  },

  differenceQuantityPerProduct: (arr) => {
    const contagem = {};

    arr.forEach((obj) => {
      const produto = obj.produto;
      const descricao = obj.descricao;
      const tipo = obj.tipo;
      const quantidade = obj.quantidade;
      const quantidadeAvaria = obj.quantidadeAvaria == null ? 0 : obj.quantidadeAvaria;

      if (!contagem.hasOwnProperty(produto)) {
        contagem[produto] = {
          tipo1: 0,
          tipo2: 0,
          descricao: descricao,
          verqtd: 0,
        };
      }

      if (tipo === "fisico") {
        contagem[produto].tipo1 += quantidade;
        contagem[produto].verqtd += quantidadeAvaria;
      } else if (tipo === "contabil") {
        contagem[produto].tipo2 += quantidade;
        contagem[produto].verqtd += quantidadeAvaria;
      }
    });

    const resultado = [];

    for (const produto in contagem) {
      const difTipo1Tipo2 = contagem[produto].tipo1 - contagem[produto].tipo2;
      resultado.push({
        produto: produto,
        descricao: contagem[produto].descricao,
        diferenca: difTipo1Tipo2,
        fisico: contagem[produto].tipo1,
        contabil: contagem[produto].tipo2,
        avaria: contagem[produto].verqtd,
      });
    }

    return resultado;
  },

  adjustMaterialPerConference(arr) {
    return arr.map((dado) => {
      if (dado !== null) {
        return {
          produto: dado.produto,
          descricao: dado.materiais?.descricao,
          tipo: dado.tipo,
          quantidade: dado.quantidade,
          quantidadeAvaria: dado.quantidadeAvaria,
        };
      }
    });
  },

  returnAtributteOfArrayMaterial: (arr, id, numero = false) => {
    return arr.map((material) => {
      if (numero) {
        return parseInt(material[id]);
      } else {
        return material[id];
      }
    });
  },

  agruparremoverduplicadas: (arr, atributo) => {
    // Usa o método map para obter um novo array contendo apenas o atributo especificado de cada objeto
    const atributos = arr.map((obj) => obj[atributo]);

    // Usa o método Set para remover os valores duplicados
    const atributosUnicos = [...new Set(atributos)];

    return atributosUnicos.join(", ");
  },

  joinArrays: (arrays) => {
    return [].concat(...arrays).filter((item) => item !== null && item !== undefined);
  },

  adjustRelatorioAnaomalias: (arr) => {
    return arr.map((item) => {
      if (item.conferenciademanda.length > 0) {
        return item.conferenciademanda.map((conferir) => {
          return {
            ...conferir.dataValues,
            placa: item.placa,
            transportadora: item.transportadora,
            conferente: item.conferente?.nome,
            doca: item.Doca,
            Nota_parcial: Helpers.agruparremoverduplicadas(item.demandas, "nota_fiscal_parcial"),
            motivo_devolucao: Helpers.agruparremoverduplicadas(item.demandas, "motivodevolucao"),
          };
        });
      }
    });
  },

  somarComBaseEmCriterios: (dados, criterio1, criterio2, idsomador) => {
    let soma = 0;
    for (const item of dados) {
      if (item.produto === criterio1 && item.motivo === criterio2) {
        soma += item[idsomador];
      }
    }
    return soma;
  }, // CRIAR

  separarDevolucaoDeReentrega: (info) => {
    const resultadomap = info.map((dado) => {
      let verMotivo = "";
      if (dado.motivo === "Devolução Parcial" || dado.motivo === "Devolução Total") {
        verMotivo = "Devolução";
      } else if (dado.motivo === "Reentrega") {
        verMotivo = "Reentrega";
      } else {
        verMotivo = null;
      }
      return {
        produto: dado.produto,
        descricao: dado.materiais.descricao,
        motivo: verMotivo,
        quantidade: dado.quantidade,
        quantidadeAvaria: dado.quantidadeAvaria,
        nota_fiscal: dado.nota_fiscal,
      };
    });
    return resultadomap;
  }, // CRIAR

  //ORGANIZAR DADOS PARA RETURN
  organizarDadosParaResposta: (resultadomap) => {
    const validador = [];
    const resultadoFinal = [];
    const resultado = resultadomap.map((dado) => {
      const ver = dado.produto + dado.motivo;
      if (!validador.includes(ver) && dado.motivo !== "") {
        resultadoFinal.push({
          produto: dado.produto,
          descricao: dado.descricao,
          motivo: dado.motivo,
          quantidade: Helpers.somarComBaseEmCriterios(resultadomap, dado.produto, dado.motivo, "quantidade"),
          quantidadeAvaria: Helpers.somarComBaseEmCriterios(resultadomap, dado.produto, dado.motivo, "quantidadeAvaria"),
          id: uuidv4(),
        });
        validador.push(ver);
        return { dado };
      }
    });

    return resultadoFinal;
  }, // CRIAR

  diferencaQuantidadePorProduto: (arr) => {
    const contagem = {};

    arr.forEach((obj) => {
      const produto = obj.produto;
      const descricao = obj.descricao;
      const tipo = obj.tipo;
      const quantidade = obj.quantidade;
      const quantidadeAvaria = obj.quantidadeAvaria == null ? 0 : obj.quantidadeAvaria;

      if (!contagem.hasOwnProperty(produto)) {
        contagem[produto] = {
          tipo1: 0,
          tipo2: 0,
          descricao: descricao,
          verqtd: 0,
        };
      }

      if (tipo === "fisico") {
        contagem[produto].tipo1 += quantidade;
        contagem[produto].verqtd += quantidadeAvaria;
      } else if (tipo === "contabil") {
        contagem[produto].tipo2 += quantidade;
        contagem[produto].verqtd += quantidadeAvaria;
      }
    });

    const resultado = [];

    for (const produto in contagem) {
      const difTipo1Tipo2 = contagem[produto].tipo1 - contagem[produto].tipo2;
      resultado.push({
        produto: produto,
        descricao: contagem[produto].descricao,
        diferenca: difTipo1Tipo2,
        fisico: contagem[produto].tipo1,
        contabil: contagem[produto].tipo2,
        avaria: contagem[produto].verqtd,
      });
    }

    return resultado;
  },

  ajustarDadosParaResultadoConferencia: async (info) => {
    return await info.map((dado) => {
      if (dado !== null) {
        return {
          produto: dado.produto,
          descricao: dado.materiais?.descricao,
          tipo: dado.tipo,
          quantidade: dado.quantidade,
          quantidadeAvaria: dado.quantidadeAvaria,
        };
      }
    }); //CRIAR
  },
};

module.exports = Helpers;
