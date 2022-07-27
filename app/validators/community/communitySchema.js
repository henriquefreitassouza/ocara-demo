const { checkSchema } = require("express-validator");

const communitySchema = checkSchema({
  name: {
    notEmpty: { errorMessage: "Informe o nome da comunidade" }
  },
  excerpt: {
    notEmpty: { errorMessage: "Informe a descrição curta da comunidade" }
  },
  description: {
    notEmpty: { errorMessage: "Descreva sobre o que é esta comunidade" }
  },
  user: {
    notEmpty: { errorMessage: "Informe o ID do usuário que criou a comunidade" }
  }
});

module.exports = communitySchema;
