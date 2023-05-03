const html_tablify = require("html-tablify");
const transporter = require("../../config/email.js");
const { OAuth2Client } = require("google-auth-library");

const sendEmail = {
  enviarEmail: async (id, placa, arr, emails, req, res) => {
    let options = {
      data: arr,
      cellpadding: 3,
      css: "td {text-align: center, padding: 2px} th{ padding: 5px,text-align: center}",
    };

    let tableHtml = html_tablify.tablify(options);

    let mailOptions = {
      from: "gestaodevolucao@outlook.com", // sender address
      to: emails,
      subject: `Conferencia ID:${id} - Placa:${placa}`, // Subject line
      text: "Hello world!", // plain text body
      html: `<div><br></br><div>Conferencia Referente a Placa:${placa} ID:${id}<div><br></br>${tableHtml}<div>`,
    };

    await transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("Erro ao enviar o email:", error);
        res.status(500).send("Erro ao enviar o email");
      } else {
        console.log("Email enviado com sucesso:", info.response);
        res.status(200).send("Email enviado com sucesso");
      }
    });
  },

  tokenAtualizacao: () => {
    // Crie um novo objeto de cliente OAuth2 com suas credenciais
    const oauth2Client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

    // Use o token de atualização para solicitar um novo token de acesso
    oauth2Client.refreshToken(REFRESH_TOKEN, (err, tokens) => {
      if (err) {
        console.error("Erro ao atualizar o token:", err);
        return;
      }
      // tokens.access_token contém o novo token de acesso
      console.log("Novo token de acesso:", tokens.access_token);
    });
  },
};

module.exports = sendEmail;
