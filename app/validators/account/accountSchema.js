const { checkSchema } = require("express-validator");
const { AccountModel } = require("../../models");
const Api = require("../../db");
const { Validate } = require("../../utils");

const accountSchema = checkSchema({
  email: {
    notEmpty: { errorMessage: "Forneça um endereço de e-mail" },
    isEmail: { errorMesssage: "Forneça um endereço de e-mail válido" },
    custom: {
      options: async (value, { req, location, path }) => {
        const account = await Api.findFiltered(AccountModel, { email: value });
        if (account.length > 0) return Promise.reject("Endereço de e-mail já está em uso");
      }
    }
  },
  password: {
    isLength: {
      options: { min: 6 },
      errorMessage: "A senha deve conter pelo menos 6 caracteres"
    }
  }
});

module.exports = accountSchema;
