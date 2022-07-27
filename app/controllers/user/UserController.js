const { AccountModel,
        UserModel } = require("../../models");
const { validationResult } = require("express-validator");
const Api = require("../../db");
const { Validate,
        Sanitize,
        Generate } = require("../../utils");

const getUserById = async (req, res) => {
  if (!Validate.validateParam(req, "id", true))
    return Generate.generateApiOutput(res, 400, "error", "ID inválido");

  const id = Sanitize.sanitizeId(req.params.id);
  const user = await Api.findOne(UserModel, { _id: id });

  if (!Validate.validateObject(user))
    return Generate.generateApiOutput(res, 200, "error", "Não há usuários com o ID informado");

  const account = await Api.findOne(AccountModel, { _id: user.account });

  if (!Validate.validateObject(account))
    return Generate.generateApiOutput(res, 200, "error", "Não há usuários com o ID informado");

  return Generate.generateApiOutput(res, 200, "success", {
    _id: user._id,
    schema_version: user.schema_version,
    name: user.name,
    surname: user.surname,
    picture: user.picture,
    cover: user.cover,
    bio: user.bio,
    account: user.account,
    created_at: user.created_at,
    email: account.email
  });
}

const getUserByAccountId = async (req, res) => {
  if (!Validate.validateParam(req, "account", true))
    return Generate.generateApiOutput(res, 400, "error", "ID inválido");

  const accountId = Sanitize.sanitizeId(req.params.account);
  const user = await Api.findOne(UserModel, { account: accountId });

  if (!Validate.validateObject(user))
    return Generate.generateApiOutput(res, 200, "error", "Não há usuários com o ID informado");

  const account = await Api.findOne(AccountModel, { _id: accountId });

  if (!Validate.validateObject(account))
    return Generate.generateApiOutput(res, 200, "error", "Não há usuários com o ID informado");

  return Generate.generateApiOutput(res, 200, "success", {
    _id: user._id,
    schema_version: user.schema_version,
    name: user.name,
    surname: user.surname,
    picture: user.picture,
    cover: user.cover,
    bio: user.bio,
    account: user.account,
    created_at: user.created_at,
    email: account.email
  });
}

const createUser = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty())
    return Generate.generateApiOutput(res, 400, "error", errors.array());

  if (!Validate.validateId(req.body.account))
    return Generate.generateApiOutput(res, 400, "error", "ID de conta inválido");

  account = Sanitize.sanitizeId(req.body.account);

  const user = new UserModel({
    schema_version: 1,
    name: req.body.name,
    surname: req.body.surname,
    picture: req.body.picture,
    cover: req.body.cover,
    bio: (req.body.bio) ? req.body.bio : "",
    account: account
  });

  const result = await Api.insertOne(user);

  if (!Validate.validateObject(result))
    return Generate.generateApiOutput(res, 500, "error", "Falha ao cadastrar novo usuário");

  return Generate.generateApiOutput(res, 200, "success", result);
}

const updateUser = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty())
    return Generate.generateApiOutput(res, 400, "error", errors.array());
  if (!Validate.validateParam(req, "id", true))
    return Generate.generateApiOutput(res, 400, "error", "ID inválido");

  const id = Sanitize.sanitizeId(req.params.id);

  const user = await Api.updateOne(UserModel, { _id: id }, {
    name: req.body.name,
    surname: req.body.surname,
    picture: req.body.picture,
    cover: req.body.cover,
    bio: req.body.bio
  });

  if (!Validate.validateObject(user))
    return Generate.generateApiOutput(res, 500, "error", "Falha ao atualizar o usuário");

  return Generate.generateApiOutput(res, 200, "success", user);
}

const updateUserByAccountId = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty())
    return Generate.generateApiOutput(res, 400, "error", errors.array());
  if (!Validate.validateParam(req, "account", true))
    return Generate.generateApiOutput(res, 400, "error", "ID inválido");

  const account = Sanitize.sanitizeId(req.params.account);

  const user = await Api.updateOne(UserModel, { account: account }, {
    name: req.body.name,
    surname: req.body.surname,
    picture: req.body.picture,
    cover: req.body.cover,
    bio: req.body.bio
  });

  if (!Validate.validateObject(user))
    return Generate.generateApiOutput(res, 500, "error", "Falha ao atualizar o usuário");

  return Generate.generateApiOutput(res, 200, "success", user);
}

const deleteUser = async (req, res) => {
  if (!Validate.validateParam(req, "id", true))
    return Generate.generateApiOutput(res, 400, "error", "ID inválido");

  const id = Sanitize.sanitizeId(req.params.id);
  const result = await Api.deleteOne(UserModel, { _id: id });

  if (!Validate.validateObject(result))
    return Generate.generateApiOutput(res, 500, "error", "Falha ao deletar o usuário");

  return Generate.generateApiOutput(res, 200, "success", result);
}

module.exports = {
  getUserById,
  getUserByAccountId,
  createUser,
  updateUser,
  updateUserByAccountId,
  deleteUser
}
