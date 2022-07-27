const { checkSchema } = require("express-validator");
const { CommunityModel } = require("../../models");
const { Validate,
        Sanitize } = require("../../utils");
const Api = require("../../db");

const memberSchema = checkSchema({
  name: {
    notEmpty: { errorMessage: "Informe o nome" }
  },
  role: {
    notEmpty: { errorMessage: "Informe o nível" }
  },
  community: {
    notEmpty: { errorMessage: "Informe o ID da comunidade" },
  }
});

module.exports = memberSchema;
