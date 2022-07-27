const { checkSchema } = require("express-validator");
const { ApiModel } = require("../../models");
const Api = require("../../db");
const { Validate } = require("../../utils");

const apiSchema = checkSchema({
  email: {
    notEmpty: { errorMessage: "Forneça um endereço de e-mail" },
    isEmail: { errorMesssage: "Forneça um endereço de e-mail válido" },
    custom: {
      options: async (value, { req, location, path }) => {
        const api = await Api.findFiltered(ApiModel, { email: value });
        if (api.length > 0) return Promise.reject("Endereço de e-mail já está em uso");
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

module.exports = apiSchema;
