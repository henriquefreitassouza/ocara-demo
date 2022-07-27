const { ObjectId } = require("mongoose").Types;
const bcrypt = require("bcrypt");

const validateEmail = (email) => {
  return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email);
}

const validateId = (id) => {
  return ObjectId.isValid(id);
}

const validateParam = (req, param, id) => {
  if (!req.params.hasOwnProperty(param)) return false;
  if (id === true && !validateId(req.params[param])) return false;

  return true;
}

const validatePassword = (textPassword, hash) => {
  return bcrypt.compareSync(textPassword, hash);
}

const validateObject = (obj) => {
  if (typeof obj !== "object" ||
      obj === null ||
      Object.keys(obj).length === 0) return false;

  return true;
}

const validateArray = (arr) => {
  if (typeof arr !== "object" ||
      arr === null ||
      !Array.isArray(arr) ||
      arr.length === 0) return false;

  return true;
}

module.exports = {
  validateEmail,
  validateId,
  validateParam,
  validatePassword,
  validateObject,
  validateArray
}
