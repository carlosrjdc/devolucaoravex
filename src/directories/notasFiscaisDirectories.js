const db = require("../../models");
const Helpers = require("../helpers");
const notafiscal = db.NotaFiscal_retorno;
const serviceRavex = require("../services/RavexService.js");
const conferenciaDirectories = require("../directories/conferenciaDirectories.js");
const materialDirectories = require("./materialDirectories");

const notaFiscalDirectories = {
  findNotasByIdDemanda: async (id) => {
    return await notafiscal.findAll({
      where: {
        idDemanda: id,
      },
      order: [
        ["status_nf", "DESC"], // substitua "status_nf" pelo nome do atributo desejado
      ],
    });
  },

  invoicesWithAnomalies: async (idViagem) => {
    const dados = await serviceRavex.relacionarNotasdeUmaViagem(idViagem);
    return dados;
  },

  findNotaOne: async (id) => {
    return await notafiscal.findOne({ where: { nota_fiscal: id } });
  },

  deleteNoteById: async (id, transaction) => {
    return notafiscal.destroy(
      {
        where: {
          id: id,
        },
      },
      { transaction }
    );
  },

  deleteNoteEDeleteConferenciaById: async (id, nota) => {
    const transaction = await db.sequelize.transaction();
    try {
      await notaFiscalDirectories.deleteNoteById(id, transaction);
      await conferenciaDirectories.deleteConferenciaByNote(nota, transaction);

      await transaction.commit();
      return "Registro Deletado com sucesso";
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },

  createNote: async (
    idDemanda,
    nota_fiscal,
    nota_fiscal_parcial,
    motivodevolucao,
    operador,
    status_nf,
    transporte,
    id_viagem,
    transaction
  ) => {
    await notafiscal.create(
      {
        idDemanda,
        nota_fiscal,
        nota_fiscal_parcial,
        motivodevolucao,
        operador,
        status_nf,
        transporte,
        id_viagem,
      },
      { transaction }
    );
  },

  insertNoteAndProductInConferencia: async (
    //PARAMETROS
    nota_fiscal,
    idDemanda,
    nota_fiscal_parcial,
    motivodevolucao,
    operador,
    status_nf,
    transporte,
    id_viagem,
    produtos
  ) => {
    const materiais = await materialDirectories.verificarItensNaoCadastrado(
      Helpers.returnAtributteOfArrayMaterial(produtos, "produto", true)
    );

    //VERIFICAR SE A NOTA JÁ EXISTE NO BANCO
    const localizar = await notaFiscalDirectories.findNotaOne(nota_fiscal);

    try {
      //SE NÃO EXISTIR EXECUTA O CADASTRO NO BANCO
      if (localizar) {
        return { erro: "Nota Fiscal Já cadastrada", localizar };
      } else if (materiais.length > 0) {
        return { erro: "Produtos não cadastrado", materiais };
      } else {
        const transaction = await db.sequelize.transaction();
        try {
          await notaFiscalDirectories.createNote(
            idDemanda,
            nota_fiscal,
            nota_fiscal_parcial,
            motivodevolucao,
            operador,
            status_nf,
            transporte,
            id_viagem,
            transaction
          );

          //INCLUIR ATRIBUTO CONTABIL DENTRO DE ARRAY
          const arrayComAtributo = await Helpers.addNewAttributeToArray(produtos);

          //ADICIONAR PRODUTOS PARA CONFERENCIA
          await conferenciaDirectories.insertItemsInConference(arrayComAtributo, transaction);

          await transaction.commit();
          return "Cadastro com sucesso";
        } catch (error) {
          await transaction.rollback();
          return { erro: "erro", materiais };
        }
      }
    } catch (error) {
      await transaction.rollback();
      return { erro: "erro", materiais };
    }
  },
};

module.exports = notaFiscalDirectories;
