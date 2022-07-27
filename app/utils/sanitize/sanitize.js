const { ObjectId } = require("mongoose").Types;

const sanitizeId = (id) => {
  return ObjectId(id);
}

module.exports = {
  sanitizeId
};
