const Notification = require("../models/notification")

exports.getAllNotification = (req, res, next) => {
	Notification.find()
		.then((notif) => res.status(200).json(notif))
		.catch((error) => res.status(400).json({ error }))
}

exports.postNotification = (req, res, next) => {
	Notification.create(req.body)
		.then((notification) => {
			res.status(201).json({ data: notification })
		})
		.catch((error) => res.status(400).json({ error }))
}
