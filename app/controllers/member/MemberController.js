const { validationResult } = require("express-validator");
const { MemberModel } = require("../../models");
const Api = require("../../db");
const { Validate,
        Sanitize,
        Generate } = require("../../utils");

const getMemberById = async (req, res) => {
  if (!Validate.validateParam(req, "id", true))
    return Generate.generateApiOutput(res, 400, "error", "ID inválido");

  const id = Sanitize.sanitizeId(req.params.id);
  const member = await Api.findOne(MemberModel, { _id: id });

  if (!Validate.validateObject(member))
    return Generate.generateApiOutput(res, 200, "error", "Não há membros com o ID informado");

  return Generate.generateApiOutput(res, 200, "success", member);
}

const getMemberByUserId = async (req, res) => {
  if (!req.body.community || !req.body.user || !Validate.validateId(req.body.user))
    return Generate.generateApiOutput(res, 400, "error", "IDs de usuário e comunidade inválidos");

  const user = Sanitize.sanitizeId(req.body.user);
  const member = await Api.findOne(MemberModel, {
    $and: [
      { community: req.body.community },
      { user: user }
    ]
  });

  if (!Validate.validateObject(member))
    return Generate.generateApiOutput(res, 200, "error", "Não há membros com o ID informado");

  return Generate.generateApiOutput(res, 200, "success", member);
}

const getCommunityMembers = async (req, res) => {
  if (!Validate.validateParam(req, "community", false))
    return Generate.generateApiOutput(res, 400, "error", "Informe o identificador da comunidade para busca de membros");

  const members = await Api.findFiltered(MemberModel, { community: req.params.community });

  if (!Validate.validateArray(members))
    return Generate.generateApiOutput(res, 200, "error", "Não há membros cadastrados nesta comunidade");

  return Generate.generateApiOutput(res, 200, "success", members);
}

const createMember = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty())
    return Generate.generateApiOutput(res, 400, "error", errors.array());

  if (!Validate.validateId(req.body.user))
    return Generate.generateApiOutput(res, 400, "error", "ID de usuário inválido");

  const user = Sanitize.sanitizeId(req.body.user);

  const member = new MemberModel({
    schema_version: 1,
    name: req.body.name,
    surname: req.body.surname,
    bio: req.body.bio,
    badge: req.body.badge,
    role: req.body.role,
    community: req.body.community,
    user: user,
    active: true,
    suspended: false
  });

  const result = await Api.insertOne(member);

  if (!Validate.validateObject(result))
    return Generate.generateApiOutput(res, 500, "error", "Falha ao cadastrar novo membro");

  return Generate.generateApiOutput(res, 200, "success", result);
}

const updateMember = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty())
    return Generate.generateApiOutput(res, 400, "error", errors.array());
  if (!Validate.validateParam(req, "id", true))
    return Generate.generateApiOutput(res, 400, "error", "ID inválido");

  const id = Sanitize.sanitizeId(req.params.id);

  const member = await Api.updateOne(MemberModel, { _id: id }, {
    name: req.body.name,
    surname: req.body.surname,
    bio: req.body.bio,
    badge: req.body.badge,
    role: req.body.role,
    community: req.body.community
  });

  if (!Validate.validateObject(member))
    return Generate.generateApiOutput(res, 500, "error", "Falha ao atualizar o membro");

  return Generate.generateApiOutput(res, 200, "success", member);
}

const deleteMember = async (req, res) => {
  if (!Validate.validateParam(req, "id", true))
    return Generate.generateApiOutput(res, 400, "error", "ID inválido");

  const id = Sanitize.sanitizeId(req.params.id);
  const result = await Api.deleteOne(MemberModel, { _id: id });

  if (!Validate.validateObject(result))
    return Generate.generateApiOutput(res, 500, "error", "Falha ao deletar o membro");

  return Generate.generateApiOutput(res, 200, "success", result);
}

module.exports = {
  getMemberById,
  getMemberByUserId,
  getCommunityMembers,
  createMember,
  updateMember,
  deleteMember
}
