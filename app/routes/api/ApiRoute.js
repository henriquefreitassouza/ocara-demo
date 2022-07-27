const { Router } = require("express");
const { ApiController } = require("../../controllers");
const { apiSchema } = require("../../validators");
const { TokenMiddleware } = require("../../middlewares");

const router = Router();

router.post("/validate", ApiController.getApiCredentials);
router.post("/", apiSchema, ApiController.createApi);
router.patch("/:id", apiSchema, ApiController.updateApi);
router.delete("/:id", ApiController.deleteApi);

module.exports = router;
