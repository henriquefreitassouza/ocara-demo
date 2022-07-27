const jwt = require("jsonwebtoken");
const Api = require("../../db");
const { AccountModel } = require("../../models");
const { Validate,
        Generate } = require("../../utils");

const verifyAuthorization = (req, res, next) => {
  if (!req.headers || !req.headers.hasOwnProperty("authorization") || !req.headers.authorization.split(" ")[0] === "JWT")
    return Generate.generateApiOutput(res, 403, "error", "Forneça um token para autenticação");

  const authorization = req.headers.authorization.split(" ")[1];
  return jwt.verify(authorization, process.env.API_SECRET, (async (error, decode) => {
    if (!decode || !decode.hasOwnProperty("account")) {
      return Generate.generateApiOutput(res, 403, "error", "Token inválido");
    }

    const api = await Api.findOne(AccountModel, { _id: decode.account });
    if (!Validate.validateObject(api))
      return Generate.generateApiOutput(res, 403, "error", "Token inválido");

    next();
  }));
}

module.exports = {
  verifyAuthorization
}
