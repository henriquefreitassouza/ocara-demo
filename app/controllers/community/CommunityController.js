const { validationResult } = require("express-validator");
const { CommunityModel } = require("../../models");
const Api = require("../../db");
const { Validate,
        Sanitize,
        Generate } = require("../../utils");

const getAllCommunities = async (req, res) => {
  const communities = await Api.findAll(CommunityModel);

  if (!Validate.validateArray(communities))
    return Generate.generateApiOutput(res, 200, "error", "Não há comunidades cadastradas");

  return Generate.generateApiOutput(res, 200, "success", communities);
}

const getCommunityById = async (req, res) => {
  if (!Validate.validateParam(req, "id", true))
    return Generate.generateApiOutput(res, 400, "error", "ID inválido");

  const id = Sanitize.sanitizeId(req.params.id);
  const community = await Api.findOne(CommunityModel, { _id: id });

  if (!Validate.validateObject(community))
    return Generate.generateApiOutput(res, 200, "error", "Não há comunidades com o ID informado");

  return Generate.generateApiOutput(res, 200, "success", community);
}

const getCommunityByNamespace = async (req, res) => {
  if (!Validate.validateParam(req, "namespace", false))
    return Generate.generateApiOutput(res, 400, "error", "Informe o identificador para busca de comunidades");

  const community = await Api.findOne(CommunityModel, { namespace: req.params.namespace });

  if (!Validate.validateObject(community))
    return Generate.generateApiOutput(res, 200, "error", "Não há comunidades com o identificador informado");

  return Generate.generateApiOutput(res, 200, "success", community);
}

const getCommunitiesByUser = async (req, res) => {
  if (!Validate.validateParam(req, "user", true))
    return Generate.generateApiOutput(res, 400, "error", "Informe o identificador para busca de comunidades");

  const user = Sanitize.sanitizeId(req.params.user);

  const communities = await Api.findFiltered(CommunityModel, { user: user });

  if (!Validate.validateArray(communities))
    return Generate.generateApiOutput(res, 200, "error", "Não há comunidades gerenciadas pelo usuário");

  return Generate.generateApiOutput(res, 200, "success", communities);
}

const getCommunityNamespace = async (req, res) => {
  if (!req.body.namespace)
    return Generate.generateApiOutput(res, 400, "error", "Informe o identificador da comunidade");

  const namespace = req.body.namespace;

  const communityNamespace = await Api.findOne(CommunityModel, { namespace: namespace });

  if (!Validate.validateObject(communityNamespace))
    return Generate.generateApiOutput(res, 200, "error", "Não há comunidades com o identificador informado");

  return Generate.generateApiOutput(res, 200, "success", communityNamespace.namespace);
}

const getCommunityMember = async (req, res) => {
  if (!req.body.member || !req.body.community || !Validate.validateId(req.body.member))
    return Generate.generateApiOutput(res, 400, "error", "Informe os IDs do membro e da comunidade");

  const member = Sanitize.sanitizeId(req.body.member);
  const community = req.body.community;

  const memberFind = await Api.findOne(CommunityModel, {
    $and: [
      { member_list: { $elemMatch: { _id: member } } },
      { namespace: community }
    ]
  });

  if (!Validate.validateObject(memberFind))
    return Generate.generateApiOutput(res, 200, "error", "Não há membros com o identificador informado nesta comunidade");

  return Generate.generateApiOutput(res, 200, "success", memberFind);
}

const createCommunity = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty())
    return Generate.generateApiOutput(res, 400, "error", errors.array());

  if (!Validate.validateId(req.body.user))
    return Generate.generateApiOutput(res, 400, "error", "ID de usuário inválido");
    
  const namespace = Generate.generateSlug(req.body.name) + "-" + Generate.generateId();
  const user = Sanitize.sanitizeId(req.body.user);

  const community = new CommunityModel({
    schema_version: 1,
    name: req.body.name,
    excerpt: req.body.excerpt,
    description: req.body.description,
    picture: req.body.picture,
    cover: req.body.cover,
    namespace: namespace,
    user: user,
    active: true
  });

  const result = await Api.insertOne(community);

  if (!Validate.validateObject(result))
    return Generate.generateApiOutput(res, 500, "error", "Falha ao cadastrar nova comunidade");

  return Generate.generateApiOutput(res, 200, "success", result);
}

const updateCommunity = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty())
    return Generate.generateApiOutput(res, 400, "error", errors.array());
  if (!Validate.validateParam(req, "id", true))
    return Generate.generateApiOutput(res, 400, "error", "ID inválido");

  const id = Sanitize.sanitizeId(req.params.id);

  const community = await Api.updateOne(CommunityModel, { _id: id }, {
    name: req.body.name,
    excerpt: req.body.excerpt,
    description: req.body.description,
    picture: req.body.picture,
    cover: req.body.cover
  });

  if (!Validate.validateObject(community))
    return Generate.generateApiOutput(res, 500, "error", "Falha ao atualizar a comunidade");

  return Generate.generateApiOutput(res, 200, "success", community);
}

const addCommunityMember = async (req, res) => {
  if (!req.body.member || !req.body.community || !Validate.validateId(req.body.member))
    return Generate.generateApiOutput(res, 400, "error", "Informe os IDs do membro e da comunidade");

  const member = Sanitize.sanitizeId(req.body.member);
  const community = req.body.community;

  const communityFind = await Api.findOne(CommunityModel, { namespace: community });

  if (!Validate.validateObject(communityFind))
    return Generate.generateApiOutput(res, 200, "error", "Não há comunidades com o ID informado");

  const members = communityFind.member_list;
  members.push(member);

  const communityUpdate = await Api.updateOne(CommunityModel, { _id: communityFind._id }, {
    member_list: members
  });

  if (!Validate.validateObject(communityUpdate))
    return Generate.generateApiOutput(res, 500, "error", "Falha ao adicionar novo membro na comunidade");

  return Generate.generateApiOutput(res, 200, "success", member);
}

const deleteCommunity = async (req, res) => {
  if (!Validate.validateParam(req, "id", true))
    return Generate.generateApiOutput(res, 400, "error", "ID inválido");

  const id = Sanitize.sanitizeId(req.params.id);
  const result = await Api.deleteOne(CommunityModel, { _id: id });

  if (!Validate.validateObject(result))
    return Generate.generateApiOutput(res, 500, "error", "Falha ao deletar a comunidade");

  return Generate.generateApiOutput(res, 200, "success", result);
}

const deleteCommunityMember = async (req, res) => {
  if (!req.body.member || !req.body.community || !Validate.validateId(req.body.member))
    return Generate.generateApiOutput(res, 400, "error", "Informe os IDs do membro e da comunidade");

  const member = Sanitize.sanitizeId(req.body.member);
  const community = req.body.community;

  const communityFind = await Api.findOne(CommunityModel, { namespace: community });

  if (!Validate.validateObject(communityFind))
    return Generate.generateApiOutput(res, 200, "error", "Não há comunidades com o ID informado");

  let members = communityFind.member_list;

  if (!members || members.length === 0)
    return Generate.generateApiOutput(res, 200, "error", "Não há membros na comunidade");

  if (!members.find(m => m._id == req.body.member))
    return Generate.generateApiOutput(res, 200, "error", "Membro informado não encontrado");

  members = members.filter(m => m._id != req.body.member);

  const communityUpdate = await Api.updateOne(CommunityModel, { _id: communityFind._id }, {
    member_list: members
  });

  if (!Validate.validateObject(communityUpdate))
    return Generate.generateApiOutput(res, 500, "error", "Falha ao remover membro da comunidade");

  return Generate.generateApiOutput(res, 200, "success", member);
}

module.exports = {
  getAllCommunities,
  getCommunityById,
  getCommunityByNamespace,
  getCommunitiesByUser,
  getCommunityNamespace,
  getCommunityMember,
  createCommunity,
  updateCommunity,
  addCommunityMember,
  deleteCommunity,
  deleteCommunityMember
}
