const express = require("express")
const router = express.Router()
const notificationPriorityController = require("../controllers/notificationPriorityController")
router.get("/", notificationPriorityController.getAllNotificationPriority)
router.post("/", notificationPriorityController.postNotificationPriority)
module.exports = router
