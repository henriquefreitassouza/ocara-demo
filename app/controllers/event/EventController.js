const { validationResult } = require("express-validator");
const { EventModel } = require("../../models");
const Api = require("../../db");
const { Validate,
        Sanitize,
        Generate } = require("../../utils");

const getAllEvents = async (req, res) => {
  const events = await Api.findAll(EventModel);

  if (!Validate.validateArray(events))
    return Generate.generateApiOutput(res, 200, "error", "Não há eventos cadastrados");

  return Generate.generateApiOutput(res, 200, "success", events);
}

const getEventById = async (req, res) => {
  if (!Validate.validateParam(req, "id", true))
    return Generate.generateApiOutput(res, 400, "error", "ID inválido");

  const id = Sanitize.sanitizeId(req.params.id);
  const communityEvent = await Api.findOne(EventModel, { _id: id });

  if (!Validate.validateObject(communityEvent))
    return Generate.generateApiOutput(res, 200, "error", "Não há eventos com o ID informado");

  return Generate.generateApiOutput(res, 200, "success", communityEvent);
}

const getNextEvent = async (req, res) => {
  if (!Validate.validateParam(req, "community", false))
    return Generate.generateApiOutput(res, 400, "error", "Informe o identificador da comunidade para busca de eventos");

  const communityEvent = await Api.findOne(EventModel, {
    $and: [
      { community: req.params.community },
      { date: { $gte: Date.now() } }
    ]
  });

  if (!Validate.validateObject(communityEvent))
    return Generate.generateApiOutput(res, 200, "error", "Não há próximos eventos nesta comunidade");

  return Generate.generateApiOutput(res, 200, "success", communityEvent);
}

const getPreviousEvents = async (req, res) => {
  if (!Validate.validateParam(req, "community", false))
    return Generate.generateApiOutput(res, 400, "error", "Informe o identificador da comunidade para busca de eventos");

  const communityEvents = await Api.findFiltered(EventModel, {
    $and: [
      { community: req.params.community },
      { date: { $lt: Date.now() }}
    ]
  });

  if (!Validate.validateArray(communityEvents))
    return Generate.generateApiOutput(res, 200, "error", "Não há eventos cadastrados nesta comunidade");

  return Generate.generateApiOutput(res, 200, "success", communityEvents);
}

const getCommunityEvents = async (req, res) => {
  if (!Validate.validateParam(req, "community", false))
    return Generate.generateApiOutput(res, 400, "error", "Informe o identificador da comunidade para busca de eventos");

  const communityEvents = await Api.findFiltered(EventModel, { community: req.params.community });

  if (!Validate.validateArray(communityEvents))
    return Generate.generateApiOutput(res, 200, "error", "Não há eventos cadastrados nesta comunidade");

  return Generate.generateApiOutput(res, 200, "success", communityEvents);
}

const getEventByNamespace = async (req, res) => {
  if (!Validate.validateParam(req, "namespace", false))
    return Generate.generateApiOutput(res, 400, "error", "Informe o identificador do evento");

  const communityEvent = await Api.findOne(EventModel, { namespace: req.params.namespace });

  if (!Validate.validateObject(communityEvent))
    return Generate.generateApiOutput(res, 200, "error", "Não há eventos com o identificador informado");

  return Generate.generateApiOutput(res, 200, "success", communityEvent);
}

const getEventsByUser = async (req, res) => {
  if (!Validate.validateParam(req, "user", true))
    return Generate.generateApiOutput(res, 400, "error", "Informe o identificador do usuário");

  const user = Sanitize.sanitizeId(req.params.user);
  const communityEvents = await Api.findFiltered(EventModel, { user: user });

  if (!Validate.validateArray(communityEvents))
    return Generate.generateApiOutput(res, 200, "error", "Não há eventos organizados pelo usuário informado");

  return Generate.generateApiOutput(res, 200, "success", communityEvents);
}

const getEventNamespace = async (req, res) => {
  if (!req.body.namespace)
    return Generate.generateApiOutput(res, 400, "error", "Informe o identificador do evento");

  const namespace = req.body.namespace;

  const eventNamespace = await Api.findOne(EventModel, { namespace: namespace });

  if (!Validate.validateObject(eventNamespace))
    return Generate.generateApiOutput(res, 200, "error", "Não há eventos com o identificador informado");

  return Generate.generateApiOutput(res, 200, "success", eventNamespace.namespace);
}

const getEventsRsvp = async (req, res) => {
  if (!Validate.validateParam(req, "member", true))
    return Generate.generateApiOutput(res, 400, "error", "Informe um ID válido de membro");

  const member = Sanitize.sanitizeId(req.params.member);

  const membersFind = await Api.findFiltered(EventModel, { rsvp_list: { $elemMatch: { _id: member } } });

  if (!Validate.validateObject(membersFind))
    return Generate.generateApiOutput(res, 200, "error", "Não há participantes em eventos com o identificador informado");

  return Generate.generateApiOutput(res, 200, "success", membersFind);
}

const getEventMemberRsvp = async (req, res) => {
  if (!req.body.member || !req.body.event || !Validate.validateId(req.body.member))
    return Generate.generateApiOutput(res, 400, "error", "Informe os IDs do membro e do evento");

  const member = Sanitize.sanitizeId(req.body.member);
  const communityEvent = req.body.event;

  const memberFind = await Api.findOne(EventModel, {
    $and: [
      { rsvp_list: { $elemMatch: { _id: member } } },
      { namespace: communityEvent }
    ]
  });

  if (!Validate.validateObject(memberFind))
    return Generate.generateApiOutput(res, 200, "error", "Não há participantes confirmados com o identificador informado");

  return Generate.generateApiOutput(res, 200, "success", memberFind);
}

const createEvent = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty())
    return Generate.generateApiOutput(res, 400, "error", errors.array());

  if (!Validate.validateId(req.body.user))
    return Generate.generateApiOutput(res, 400, "error", "ID de usuário inválido");

  const user = Sanitize.sanitizeId(req.body.user);
  const namespace = Generate.generateSlug(req.body.title) + "-" + Generate.generateId();

  const communityEvent = new EventModel({
    schema_version: 1,
    title: req.body.title,
    date: req.body.date,
    online: req.body.online,
    cover: req.body.cover,
    place: {
      address: req.body.place.address,
      number: req.body.place.number,
      reference: req.body.place.reference,
      neighborhood: req.body.place.neighborhood,
      city: req.body.place.city,
      state: req.body.place.state,
      country: req.body.place.country,
      postal_code: req.body.place.postal_code
    },
    community: req.body.community,
    namespace: namespace,
    description: req.body.description,
    user: user
  });

  const result = await Api.insertOne(communityEvent);

  if (!Validate.validateObject(result))
    return Generate.generateApiOutput(res, 500, "error", "Falha ao cadastrar novo evento");

  return Generate.generateApiOutput(res, 200, "success", result);
}

const addEventRsvp = async (req, res) => {
  if (!req.body.member || !req.body.event || !Validate.validateId(req.body.member))
    return Generate.generateApiOutput(res, 400, "error", "Informe os IDs do membro e do evento");

  const member = Sanitize.sanitizeId(req.body.member);
  const communityEvent = req.body.event;

  const eventFind = await Api.findOne(EventModel, { namespace: communityEvent });

  if (!Validate.validateObject(eventFind))
    return Generate.generateApiOutput(res, 200, "error", "Não há eventos com o ID informado");

  const rsvps = eventFind.rsvp_list;
  rsvps.push({
    _id: member,
    status: "rsvp",
    confirmed: true
  });

  const eventUpdate = await Api.updateOne(EventModel, { _id: eventFind._id }, {
    rsvp_list: rsvps
  });

  if (!Validate.validateObject(eventUpdate))
    return Generate.generateApiOutput(res, 500, "error", "Falha ao adicionar novo participante no evento");

  return Generate.generateApiOutput(res, 200, "success", member);
}

const updateEvent = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty())
    return Generate.generateApiOutput(res, 400, "error", errors.array());
  if (!Validate.validateParam(req, "id", true))
    return Generate.generateApiOutput(res, 400, "error", "ID inválido");

  const id = Sanitize.sanitizeId(req.params.id);

  const communityEvent = await Api.updateOne(EventModel, { _id: id }, {
    title: req.body.title,
    date: req.body.date,
    online: req.body.online,
    cover: req.body.cover,
    place: {
      address: req.body.place.address,
      number: req.body.place.number,
      reference: req.body.place.reference,
      neighborhood: req.body.place.neighborhood,
      city: req.body.place.city,
      state: req.body.place.state,
      country: req.body.place.country,
      postal_code: req.body.place.postal_code
    },
    description: req.body.description
  });

  if (!Validate.validateObject(communityEvent))
    return Generate.generateApiOutput(res, 500, "error", "Falha ao atualizar o evento");

  return Generate.generateApiOutput(res, 200, "success", communityEvent);
}

const deleteEvent = async (req, res) => {
  if (!Validate.validateParam(req, "id", true))
    return Generate.generateApiOutput(res, 400, "error", "ID inválido");

  const id = Sanitize.sanitizeId(req.params.id);
  const result = await Api.deleteOne(EventModel, { _id: id });

  if (!Validate.validateObject(result))
    return Generate.generateApiOutput(res, 500, "error", "Falha ao deletar o evento");

  return Generate.generateApiOutput(res, 200, "success", result);
}

const deleteEventRsvp = async (req, res) => {
  if (!req.body.member || !req.body.event || !Validate.validateId(req.body.member))
    return Generate.generateApiOutput(res, 400, "error", "Informe os IDs do membro e do evento");

  const member = Sanitize.sanitizeId(req.body.member);
  const communityEvent = req.body.event;

  const eventFind = await Api.findOne(EventModel, { namespace: communityEvent });

  if (!Validate.validateObject(eventFind))
    return Generate.generateApiOutput(res, 200, "error", "Não há eventos com o ID informado");

  let rsvps = eventFind.rsvp_list;

  if (!rsvps || rsvps.length === 0)
    return Generate.generateApiOutput(res, 200, "error", "Não há participantes confirmados no evento");

  if (!rsvps.find(m => m._id == req.body.member))
    return Generate.generateApiOutput(res, 200, "error", "Membro informado não encontrado");

  rsvps = rsvps.filter(m => m._id != req.body.member);

  const eventUpdate = await Api.updateOne(EventModel, { _id: eventFind._id }, {
    rsvp_list: rsvps
  });

  if (!Validate.validateObject(eventUpdate))
    return Generate.generateApiOutput(res, 500, "error", "Falha ao remover participante do evento");

  return Generate.generateApiOutput(res, 200, "success", member);
}

module.exports = {
  getAllEvents,
  getEventById,
  getNextEvent,
  getPreviousEvents,
  getCommunityEvents,
  getEventByNamespace,
  getEventsByUser,
  getEventNamespace,
  getEventsRsvp,
  getEventMemberRsvp,
  createEvent,
  addEventRsvp,
  updateEvent,
  deleteEvent,
  deleteEventRsvp
}
