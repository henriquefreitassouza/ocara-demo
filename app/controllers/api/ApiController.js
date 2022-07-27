const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const Api = require("../../db");
const { ApiModel } = require("../../models");
const { Validate,
        Sanitize,
        Generate } = require("../../utils");

const getApiCredentials = async (req, res) => {
  if (!req.body.email || !req.body.password)
    return Generate.generateApiOutput(res, 400, "error", "Informe o e-mail e a senha");

  const email = req.body.email;
  const password = req.body.password;

  const apiEmail = await Api.findOne(ApiModel, { email: email });

  if (!Validate.validateObject(apiEmail) || !Validate.validatePassword(password, apiEmail.password))
    return Generate.generateApiOutput(res, 200, "error", "E-mail ou senha inválido(s)");

  const accessToken = jwt.sign({
    id: apiEmail._id
  }, process.env.API_SECRET, {
    expiresIn: 86400
  });

  return Generate.generateApiOutput(res, 200, "success", { accessToken: accessToken });
}

const createApi = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty())
    return Generate.generateApiOutput(res, 400, "error", errors.array());

  const hash = Generate.generatePassword(req.body.password);

  const api = new ApiModel({
    schema_version: 1,
    email: req.body.email,
    password: hash
  });

  const result = await Api.insertOne(api);

  if (!Validate.validateObject(api))
    return Generate.generateApiOutput(res, 500, "error", "Falha ao cadastrar nova conta");

  return Generate.generateApiOutput(res, 200, "success", result);
};

const updateApi = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty())
    return Generate.generateApiOutput(res, 400, "error", errors.array());

  if (!Validate.validateParam(req, "id", true))
    return Generate.generateApiOutput(res, 400, "error", "ID inválido");

  const id = Sanitize.sanitizeId(req.params.id);
  const hash = Generate.generatePassword(req.body.password);

  const api = await Api.updateOne(ApiModel, { _id: id }, {
    email: req.body.email,
    password: hash
  });

  if (!Validate.validateObject(api))
    return Generate.generateApiOutput(res, 500, "error", "Falha ao atualizar a conta");

  return Generate.generateApiOutput(res, 200, "success", api);
}

const deleteApi = async (req, res) => {
  if (!Validate.validateParam(req, "id", true))
    return Generate.generateApiOutput(res, 400, "error", "ID inválido");

  const id = Sanitize.sanitizeId(req.params.id);
  const result = await Api.deleteOne(ApiModel, { _id: id });

  if (!Validate.validateObject(result))
    return Generate.generateApiOutput(res, 500, "error", "Falha ao deletar a conta");

  return Generate.generateApiOutput(res, 200, "success", result);
}

module.exports = {
  getApiCredentials,
  createApi,
  updateApi,
  deleteApi
}
