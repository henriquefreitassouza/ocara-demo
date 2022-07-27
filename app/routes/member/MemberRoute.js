const { Router } = require("express");
const { MemberController } = require("../../controllers");
const { memberSchema } = require("../../validators");
const { TokenMiddleware } = require("../../middlewares");

const router = Router();

router.get("/list/:community", MemberController.getCommunityMembers);
router.get("/:id", MemberController.getMemberById);
router.post("/user", MemberController.getMemberByUserId);
router.post("/", memberSchema, MemberController.createMember);
router.patch("/:id", memberSchema, MemberController.updateMember);
router.delete("/:id", MemberController.deleteMember);

module.exports = router;
