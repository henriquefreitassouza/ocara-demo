const { Router } = require("express");
const { CommunityController } = require("../../controllers");
const { communitySchema } = require("../../validators");
const { TokenMiddleware } = require("../../middlewares");

const router = Router();

router.get("/list", CommunityController.getAllCommunities);
router.get("/list/namespace/:namespace", CommunityController.getCommunityByNamespace);
router.get("/list/user/:user", CommunityController.getCommunitiesByUser);
router.get("/:id", CommunityController.getCommunityById);
router.post("/validate", CommunityController.getCommunityNamespace);
router.post("/validate/member/", CommunityController.getCommunityMember);
router.post("/", communitySchema, CommunityController.createCommunity);
router.post("/member", CommunityController.addCommunityMember);
router.post("/member/delete", CommunityController.deleteCommunityMember);
router.patch("/:id", communitySchema, CommunityController.updateCommunity);
router.delete("/:id", CommunityController.deleteCommunity);
module.exports = router;
