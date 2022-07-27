const { Router } = require("express");
const { S3Controller } = require("../../controllers");
const { TokenMiddleware } = require("../../middlewares");

const router = Router();

router.post("/sign", S3Controller.signS3Url);

module.exports = router;
