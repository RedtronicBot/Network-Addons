const express = require("express")
const router = express.Router()
const notificationController = require("../controllers/notificationController")
router.get("/", notificationController.getAllNotification)
router.post("/", notificationController.postNotification)
router.put("/", notificationController.putNotification)
router.put("/all", notificationController.putAllNotification)
module.exports = router
