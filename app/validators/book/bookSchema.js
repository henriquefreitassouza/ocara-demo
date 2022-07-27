const { checkSchema } = require("express-validator");

const bookSchema = checkSchema({
  title: {
    notEmpty: { errorMessage: "Informe o título do livro" }
  },
  genre: {
    notEmpty: { errorMessage: "Informe o gênero literário" }
  },
  excerpt: {
    notEmpty: { errorMessage: "Descreva o resumo do livro (sem spoilers)" }
  },
  user: {
    notEmpty: { errorMessage: "Informe o ID do usuário que escreveu a resenha" }
  }
});

module.exports = bookSchema;
