const NotificationType = require("../models/notificationtype")

exports.getAllNotificationType = (req, res, next) => {
	NotificationType.find()
		.then((notif) => res.status(200).json(notif))
		.catch((error) => res.status(400).json({ error }))
}

exports.postNotificationType = (req, res, next) => {
	NotificationType.create(req.body)
		.then(() => {
			res.status(201).json({ message: "Type de notification crée" })
		})
		.catch((error) => res.status(400).json({ error }))
}
