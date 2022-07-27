const bcrypt = require("bcrypt");

const generatePassword = (textPassword, rounds = 10) => {
  const salt = bcrypt.genSaltSync(rounds);
  return bcrypt.hashSync(textPassword, salt);
}

const generateSlug = (str) => {
	return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '') // Remove accents
		.replace(/([^\w]+|\s+)/g, '-') // Replace space and other characters by hyphen
		.replace(/\-\-+/g, '-')	// Replaces multiple hyphens by one hyphen
		.replace(/(^-+|-+$)/g, '') // Remove extra hyphens from beginning or end of the string
    .toLowerCase();
}

const generateId = () => {
  return String(Date.now().toString(32) + Math.random().toString(16))
    .replace(/\./g, '');
}

const generateApiOutput = (response, code, type, body) => {
  return response.status(code).json({
    result: type,
    body: body
  });
}


module.exports = {
  generatePassword,
  generateSlug,
  generateId,
  generateApiOutput
};
