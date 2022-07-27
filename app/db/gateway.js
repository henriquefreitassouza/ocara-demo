const Connector = require("./connect");

const findOne = async (model, condition) => {
  if (Object.keys(condition).length > 1) return {}

  await Connector.connect();

  const result = await model.findOne(condition).exec();

  if (result) return result;

  return {};
}

const findAll = async (model) => {
  await Connector.connect();

  const result = await model.find({}).exec();

  if (result) return result;

  return {};
}

const findFiltered = async (model, condition) => {
  await Connector.connect();

  const result = await model.find(condition).exec();

  if (result) return result;

  return {};
}

const findDistinct = async (model, field, condition) => {
  await Connector.connect();

  const result = await model.distinct(field, condition).exec();

  if (result) return result;

  return {};
}

const sort = (resultSet, field, direction) => {
  if (!typeof resultSet === "object" || typeof resultSet.then === "function") return {};

  return resultSet.sort({ field: direction });
}

const insertOne = async (model) => {
  await Connector.connect();

  try {
    const result = await model.save();
    return result;
  } catch (e) { console.log(e); }

  return {};
}

const updateOne = async (model, condition, body) => {
  if (Object.keys(condition).length > 1) return {}

  await Connector.connect();

  try {
    const result = await model.updateOne(condition, body);
    return result;
  } catch (e) { console.log(e);}

  return {};
}

const deleteOne = async (model, condition) => {
  if (Object.keys(condition).length > 1) return {};

  await Connector.connect();

  const result = await model.deleteOne(condition);

  if (result.deletedCount > 0) return result;

  return {};
}

module.exports = {
  findOne,
  findAll,
  findFiltered,
  findDistinct,
  sort,
  insertOne,
  updateOne,
  deleteOne
}
