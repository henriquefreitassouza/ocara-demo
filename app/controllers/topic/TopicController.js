const { validationResult } = require("express-validator");
const { TopicModel } = require("../../models");
const Api = require("../../db");
const { Validate,
        Sanitize,
        Generate } = require("../../utils");

const getAllTopics = async (req, res) => {
  const topics = await Api.findAll(TopicModel);

  if (!Validate.validateArray(topics))
    return Generate.generateApiOutput(res, 200, "error", "Não há tópicos cadastrados");

  return Generate.generateApiOutput(res, 200, "success", topics);
}

const getTopicsByTerm = async (req, res) => {
  if (!Validate.validateParam(req, "term", false))
    return Generate.generateApiOutput(res, 400, "error", "Informe o termo para busca de tópicos");

  const term = req.params.term;
  const topics = await Api.findFiltered(TopicModel, { title: { $regex: term, $options: 'i' } });

  if (!Validate.validateArray(topics))
    return Generate.generateApiOutput(res, 200, "error", "Não há tópicos cadastrados com o termo informado");

  return Generate.generateApiOutput(res, 200, "success", topics);
}

const getTopicById = async (req, res) => {
  if (!Validate.validateParam(req, "id", true))
    return Generate.generateApiOutput(res, 400, "error", "ID inválido");

  const id = Sanitize.sanitizeId(req.params.id);
  const topic = await Api.findOne(TopicModel, { _id: id });

  if (!Validate.validateObject(topic))
    return Generate.generateApiOutput(res, 200, "error", "Não há tópicos com o ID informado");

  return Generate.generateApiOutput(res, 200, "success", topic);
}

const getCommunityTopics = async (req, res) => {
  if (!Validate.validateParam(req, "community", false))
    return Generate.generateApiOutput(res, 400, "error", "Informe o identificador da comunidade para busca de tópicos");

  const topics = await Api.findFiltered(TopicModel, { community: req.params.community });

  if (!Validate.validateArray(topics))
    return Generate.generateApiOutput(res, 200, "error", "Não há tópicos cadastrados nesta comunidade");

  return Generate.generateApiOutput(res, 200, "success", topics);
}

const createTopic = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty())
    return Generate.generateApiOutput(res, 400, "error", errors.array());

  const topic = new TopicModel({
    schema_version: 1,
    title: req.body.title,
    description: req.body.description,
    open: true
  });

  const result = await Api.insertOne(topic);

  if (!Validate.validateObject(result))
    return Generate.generateApiOutput(res, 500, "error", "Falha ao cadastrar novo tópico");

  return Generate.generateApiOutput(res, 200, "success", result);
}

const updateTopic = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty())
    return Generate.generateApiOutput(res, 400, "error", errors.array());
  if (!Validate.validateParam(req, "id", true))
    return Generate.generateApiOutput(res, 400, "error", "ID inválido");

  const id = Sanitize.sanitizeId(req.params.id);

  const topic = await Api.updateOne(TopicModel, { _id: id }, {
    title: req.body.title,
    description: req.body.description,
    open: req.body.open
  });

  if (!Validate.validateObject(topic))
    return Generate.generateApiOutput(res, 500, "error", "Falha ao atualizar o tópico");

  return Generate.generateApiOutput(res, 200, "success", topic);
}

const deleteTopic = async (req, res) => {
  if (!Validate.validateParam(req, "id", true))
    return Generate.generateApiOutput(res, 400, "error", "ID inválido");

  const id = Sanitize.sanitizeId(req.params.id);
  const result = await Api.deleteOne(TopicModel, { _id: id });

  if (!Validate.validateObject(result))
    return Generate.generateApiOutput(res, 500, "error", "Falha ao deletar o tópico");

  return Generate.generateApiOutput(res, 200, "success", result);
}

module.exports = {
  getAllTopics,
  getTopicsByTerm,
  getTopicById,
  getCommunityTopics,
  createTopic,
  updateTopic,
  deleteTopic
}
