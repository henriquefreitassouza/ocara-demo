const { checkSchema } = require("express-validator");

const userSchema = checkSchema({
  name: {
    notEmpty: { errorMessage: "Informe seu primeiro nome" }
  },
  account: {
    notEmpty: { errorMessage: "Informe o ID da conta" }
  }
});

module.exports = userSchema;
