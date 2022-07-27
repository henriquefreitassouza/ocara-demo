const { Router } = require("express");
const { TopicController } = require("../../controllers");
const { topicSchema } = require("../../validators");
const { TokenMiddleware } = require("../../middlewares");

const router = Router();

router.get("/list", TopicController.getAllTopics);
router.get("/list/:community", TopicController.getCommunityTopics);
router.get("/list/term/:term", TopicController.getTopicsByTerm);
router.get("/:id", TopicController.getTopicById);
router.post("/", topicSchema, TopicController.createTopic);
router.patch("/:id", topicSchema, TopicController.updateTopic);
router.delete("/:id", TopicController.deleteTopic);

module.exports = router;
