const { Router } = require("express");
const { UserController } = require("../../controllers");
const { userSchema } = require("../../validators");
const { TokenMiddleware } = require("../../middlewares");

const router = Router();

router.get("/:id", UserController.getUserById);
router.get("/account/:account", UserController.getUserByAccountId);
router.post("/", userSchema, UserController.createUser);
router.patch("/:id", userSchema, UserController.updateUser);
router.patch("/account/:account", userSchema, UserController.updateUserByAccountId);
router.delete("/:id", UserController.deleteUser);

module.exports = router;
