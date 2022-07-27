const { checkSchema } = require("express-validator");

const topicSchema = checkSchema({
  title: {
    notEmpty: { errorMessage: "Digite um assunto" }
  },
  description: {
    notEmpty: { errorMessage: "Descreva o que quer falar" }
  }
});

module.exports = topicSchema;
