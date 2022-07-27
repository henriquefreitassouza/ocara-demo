const { checkSchema } = require("express-validator");

const eventSchema = checkSchema({
  title: {
    notEmpty: { errorMessage: "Informe o título do evento" }
  },
  date: {
    notEmpty: { errorMessage: "Informe a data do evento" }
  },
  online: {
    notEmpty: { errorMessage: "Informe se o evento acontecerá de forma online ou presencial" }
  },
  description: {
    notEmpty: { errorMessage: "Descreva o evento" }
  },
  community: {
    notEmpty: { errorMessage: "Informe a comunidade que organizará o evento" }
  },
  user: {
    notEmpty: { errorMessage: "Informe o identificador do usuário que organizará o evento" }
  }
});

module.exports = eventSchema;
