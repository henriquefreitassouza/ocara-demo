const { Router } = require("express");
const { BookController } = require("../../controllers");
const { bookSchema } = require("../../validators");
const { TokenMiddleware } = require("../../middlewares");

const router = Router();

router.get("/list", BookController.getAllBooks);
router.get("/list/term/:term", BookController.getBooksByTerm);
router.get("/list/genre/:genre", BookController.getBooksByGenre);
router.get("/list/genre", BookController.getGenres);
router.get("/list/namespace/:namespace", BookController.getBookByNamespace);
router.get("/list/user/:user", BookController.getBooksByUser);
router.get("/:id", BookController.getBookById);
router.post("/validate/genre", BookController.getGenre);
router.post("/validate", BookController.getBookNamespace);
router.post("/", bookSchema, BookController.createBook);
router.patch("/:id", bookSchema, BookController.updateBook);
router.delete("/:id", BookController.deleteBook);

module.exports = router;
