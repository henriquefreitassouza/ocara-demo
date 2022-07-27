const { Router } = require("express");
const { EventController } = require("../../controllers");
const { eventSchema } = require("../../validators");
const { TokenMiddleware } = require("../../middlewares");

const router = Router();

router.get("/list", EventController.getAllEvents);
router.get("/list/next/:community", EventController.getNextEvent);
router.get("/list/prev/:community", EventController.getPreviousEvents);
router.get("/list/community/:community", EventController.getCommunityEvents);
router.get("/list/namespace/:namespace", EventController.getEventByNamespace);
router.get("/list/user/:user", EventController.getEventsByUser);
router.get("/:id", EventController.getEventById);
router.get("/rsvp/:member", EventController.getEventsRsvp);
router.post("/list/rsvp", EventController.getEventMemberRsvp);
router.post("/validate", EventController.getEventNamespace);
router.post("/rsvp", EventController.addEventRsvp);
router.post("/", eventSchema, EventController.createEvent);
router.patch("/:id", eventSchema, EventController.updateEvent);
router.delete("/:id", EventController.deleteEvent);
router.post("/rsvp/delete", EventController.deleteEventRsvp);

module.exports = router;
