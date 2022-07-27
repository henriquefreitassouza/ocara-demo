const { validationResult } = require("express-validator");
const Api = require("../../db");
const { BookModel } = require("../../models");
const { Validate,
        Sanitize,
        Generate } = require("../../utils");

const getAllBooks = async (req, res) => {
  const books = await Api.findAll(BookModel);

  if (!Validate.validateArray(books))
    return Generate.generateApiOutput(res, 200, "error", "Não há livros cadastrados");

  return Generate.generateApiOutput(res, 200, "success", books);
}

const getBooksByTerm = async (req, res) => {
  if (!Validate.validateParam(req, "term", false))
    return Generate.generateApiOutput(res, 400, "error", "Informe o termo para busca de livros");

  const term = req.params.term;
  const books = await Api.findFiltered(BookModel, { title: { $regex: term, $options: 'i' } });

  if (!Validate.validateArray(books))
    return Generate.generateApiOutput(res, 200, "error", "Não há livros cadastrados com o termo informado");

  return Generate.generateApiOutput(res, 200, "success", books);
}

const getBooksByGenre = async (req, res) => {
  if (!Validate.validateParam(req, "genre", false))
    return Generate.generateApiOutput(res, 400, "error", "Informe o gênero literário para busca de livros");

  const genre = req.params.genre;
  const books = await Api.findFiltered(BookModel, { genre: { $regex: genre, $options: 'i' } });

  if (!Validate.validateArray(books))
    return Generate.generateApiOutput(res, 200, "error", "Não há livros cadastrados com o gênero literário informado");

  return Generate.generateApiOutput(res, 200, "success", books);
}

const getBookById = async (req, res) => {
  if (!Validate.validateParam(req, "id", true))
    return Generate.generateApiOutput(res, 400, "error", "ID inválido");

  const id = Sanitize.sanitizeId(req.params.id);
  const book = await Api.findOne(BookModel, { _id: id });

  if (!Validate.validateObject(book))
    return Generate.generateApiOutput(res, 200, "error", "Não há livros com o ID informado");

  return Generate.generateApiOutput(res, 200, "success", book);
}

const getBookByNamespace = async (req, res) => {
  if (!Validate.validateParam(req, "namespace", false))
    return Generate.generateApiOutput(res, 400, "error", "Informe o identificador do livro");

  const book = await Api.findOne(BookModel, { namespace: req.params.namespace });

  if (!Validate.validateObject(book))
    return Generate.generateApiOutput(res, 200, "error", "Não há livros com o identificador informado");

  return Generate.generateApiOutput(res, 200, "success", book);
}

const getBooksByUser = async (req, res) => {
  if (!Validate.validateParam(req, "user", true))
    return Generate.generateApiOutput(res, 400, "error", "Informe o identificador do usuário");

  const user = Sanitize.sanitizeId(req.params.user);
  const books = await Api.findFiltered(BookModel, { user: user });

  if (!Validate.validateArray(books))
    return Generate.generateApiOutput(res, 200, "error", "Não há livros resenhados pelo usuário informado");

  return Generate.generateApiOutput(res, 200, "success", books);
}

const getBookNamespace = async (req, res) => {
  if (!req.body.namespace)
    return Generate.generateApiOutput(res, 400, "error", "Informe o identificador do livro");

  const namespace = req.body.namespace;

  const bookNamespace = await Api.findOne(BookModel, { namespace: namespace });

  if (!Validate.validateObject(bookNamespace))
    return Generate.generateApiOutput(res, 200, "error", "Não há livros com o identificador informado");

  return Generate.generateApiOutput(res, 200, "success", bookNamespace.namespace);
}

const getGenres = async (req, res) => {
  let genres = await Api.findDistinct(BookModel, "genre", {});

  if (!Validate.validateObject(genres))
    return Generate.generateApiOutput(res, 200, "error", "Não há gêneros literários cadastrados");

  genres = [...new Set(genres.map((genre) => genre.toLowerCase()))];
  genres = genres.map((genre) => genre[0].toUpperCase() + genre.substring(1));

  return Generate.generateApiOutput(res, 200, "success", genres);
}

const getGenre = async (req, res) => {
  if (!req.body.genre)
    return Generate.generateApiOutput(res, 400, "error", "Informe o gênero literário");

  const genre = req.body.genre.toLowerCase();
  const booksGenre = await Api.findOne(BookModel, { genre: genre });

  if (!Validate.validateObject(booksGenre))
    return Generate.generateApiOutput(res, 200, "error", "Não há gêneros literários cadastrados com o termo informado");

  return Generate.generateApiOutput(res, 200, "success", booksGenre.genre);
}

const createBook = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty())
    return Generate.generateApiOutput(res, 400, "error", errors.array());

  if (!Validate.validateId(req.body.user))
    return Generate.generateApiOutput(res, 400, "error", "ID de usuário inválido");

  const namespace = Generate.generateSlug(req.body.title) + "-" + Generate.generateId();
  const user = Sanitize.sanitizeId(req.body.user);

  const book = new BookModel({
    schema_version: 1,
    title: req.body.title,
    isbn: req.body.isbn,
    publisher: req.body.publisher,
    author: [{
      name: req.body.author[0].name,
      role: req.body.author[0].role
    }],
    genre: req.body.genre.toLowerCase(),
    edition: req.body.edition,
    year_published: req.body.year_published,
    excerpt: req.body.excerpt,
    namespace: namespace,
    cover: req.body.cover,
    user: user
  });

  const result = await Api.insertOne(book);

  if (!Validate.validateObject(result))
    return Generate.generateApiOutput(res, 500, "error", "Falha ao cadastrar novo livro");

  return Generate.generateApiOutput(res, 200, "success", result);
}

const updateBook = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty())
    return Generate.generateApiOutput(res, 400, "error", errors.array());

  if (!Validate.validateParam(req, "id", true))
    return Generate.generateApiOutput(res, 400, "error", "ID inválido");

  const id = Sanitize.sanitizeId(req.params.id);

  const book = await Api.updateOne(BookModel, { _id: id }, {
    title: req.body.title,
    isbn: req.body.isbn,
    publisher: req.body.publisher,
    author: [{
      name: req.body.author[0].name,
      role: req.body.author[0].role
    }],
    genre: req.body.genre.toLowerCase(),
    edition: req.body.edition,
    year_published: req.body.year_published,
    excerpt: req.body.excerpt,
    cover: req.body.cover
  });

  if (!Validate.validateObject(book))
    return Generate.generateApiOutput(res, 500, "error", "Falha ao atualizar o livro");

  return Generate.generateApiOutput(res, 200, "success", book);
}

const deleteBook = async (req, res) => {
  if (!Validate.validateParam(req, "id", true))
    return Generate.generateApiOutput(res, 400, "error", "ID inválido");

  const id = Sanitize.sanitizeId(req.params.id);
  const result = await Api.deleteOne(BookModel, { _id: id });

  if (!Validate.validateObject(result))
    return Generate.generateApiOutput(res, 500, "error", "Falha ao deletar o livro");

  return Generate.generateApiOutput(res, 200, "success", result);
}

module.exports = {
  getAllBooks,
  getBooksByTerm,
  getBooksByGenre,
  getBookById,
  getBookByNamespace,
  getBooksByUser,
  getBookNamespace,
  getGenres,
  getGenre,
  createBook,
  updateBook,
  deleteBook
}
