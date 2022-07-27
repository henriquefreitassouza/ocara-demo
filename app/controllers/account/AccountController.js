const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const Api = require("../../db");
const { AccountModel,
        UserModel } = require("../../models");
const { Validate,
        Sanitize,
        Generate } = require("../../utils");

const getAccountCredentials = async (req, res) => {
  if (!req.body.email || !req.body.password)
    return Generate.generateApiOutput(res, 400, "error", "Informe o e-mail e a senha");

  const email = req.body.email;
  const password = req.body.password;

  const accountEmail = await Api.findOne(AccountModel, { email: email });

  if (!Validate.validateObject(accountEmail) || !Validate.validatePassword(password, accountEmail.password))
    return Generate.generateApiOutput(res, 200, "error", "E-mail ou senha inválido(s)");

  const userEmail = await Api.findOne(UserModel, { account: accountEmail._id });

  if (!Validate.validateObject(userEmail))
    return Generate.generateApiOutput(res, 200, "error", "E-mail ou senha inválido(s)");

  const accessToken = jwt.sign({
    account: accountEmail._id
  }, process.env.API_SECRET, {
    expiresIn: 86400
  });

  return Generate.generateApiOutput(res, 200, "success", { account: accountEmail._id,
                                                           user: userEmail._id,
                                                           email: accountEmail.email,
                                                           name: userEmail.name,
                                                           accessToken: accessToken });
}

const getAccountById = async (req, res) => {
  if (!Validate.validateParam(req, "id", true))
    return Generate.generateApiOutput(res, 400, "error", "ID inválido");

  const id = Sanitize.sanitizeId(req.params.id);
  const account = await Api.findOne(AccountModel, { _id: id });

  if (!Validate.validateObject(account))
    return Generate.generateApiOutput(res, 200, "error", "Não há contas de usuário com o ID informado");

  return Generate.generateApiOutput(res, 200, "success", account);
}

const getAccountByEmail = async (req, res) => {
  if (!Validate.validateParam(req, "email", false))
    return Generate.generateApiOutput(res, 400, "error", "E-mail inválido");

  const email = req.params.email;
  const account = await Api.findOne(AccountModel, { email: email });

  if (!Validate.validateObject(account))
    return Generate.generateApiOutput(res, 200, "error", "E-mail não encontrado");

  return Generate.generateApiOutput(res, 200, "success", account);
}

const createAccount = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty())
    return Generate.generateApiOutput(res, 400, "error", errors.array());

  const hash = Generate.generatePassword(req.body.password);

  const account = new AccountModel({
    schema_version: 1,
    email: req.body.email,
    password: hash,
    verified: true,
    active: true,
    suspended: false
  });

  const result = await Api.insertOne(account);

  if (!Validate.validateObject(account))
    return Generate.generateApiOutput(res, 500, "error", "Falha ao cadastrar nova conta");

  return Generate.generateApiOutput(res, 200, "success", result);
};

const updateAccount = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty())
    return Generate.generateApiOutput(res, 400, "error", errors.array());

  if (!Validate.validateParam(req, "id", true))
    return Generate.generateApiOutput(res, 400, "error", "ID inválido");

  const id = Sanitize.sanitizeId(req.params.id);
  const hash = Generate.generatePassword(req.body.password);

  const account = await Api.updateOne(AccountModel, { _id: id }, {
    email: req.body.email,
    password: hash
  });

  if (!Validate.validateObject(account))
    return Generate.generateApiOutput(res, 500, "error", "Falha ao atualizar a conta");

  return Generate.generateApiOutput(res, 200, "success", account);
}

const deleteAccount = async (req, res) => {
  if (!Validate.validateParam(req, "id", true))
    return Generate.generateApiOutput(res, 400, "error", "ID inválido");

  const id = Sanitize.sanitizeId(req.params.id);
  const result = await Api.deleteOne(AccountModel, { _id: id });

  if (!Validate.validateObject(result))
    return Generate.generateApiOutput(res, 500, "error", "Falha ao deletar a conta");

  return Generate.generateApiOutput(res, 200, "success", result);
}

module.exports = {
  getAccountById,
  getAccountByEmail,
  getAccountCredentials,
  createAccount,
  updateAccount,
  deleteAccount
}
