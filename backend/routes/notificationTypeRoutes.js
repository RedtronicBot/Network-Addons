const express = require("express")
const router = express.Router()
const notificationTypeController = require("../controllers/notificationTypeController")
router.get("/", notificationTypeController.getAllNotificationType)
router.post("/", notificationTypeController.postNotificationType)
module.exports = router
