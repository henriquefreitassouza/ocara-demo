const { Router } = require("express");
const { AccountController } = require("../../controllers");
const { accountSchema } = require("../../validators");
const { TokenMiddleware } = require("../../middlewares");

const router = Router();

router.get("/:id", AccountController.getAccountById);
router.get("/email/:email", AccountController.getAccountByEmail);
router.post("/validate", AccountController.getAccountCredentials);
router.post("/", accountSchema, AccountController.createAccount);
router.patch("/:id", accountSchema, AccountController.updateAccount);
router.delete("/:id", AccountController.deleteAccount);

module.exports = router;
