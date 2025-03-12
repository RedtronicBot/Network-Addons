const express = require("express")
const router = express.Router()
const notificationController = require("../controllers/notificationController")
router.get("/", notificationController.getAllNotification)
router.post("/", notificationController.postNotification)
module.exports = router
