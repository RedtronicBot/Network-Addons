const NotificationPriority = require("../models/notificationpriority")

exports.getAllNotificationPriority = (req, res, next) => {
	NotificationPriority.find()
		.then((notif) => res.status(200).json(notif))
		.catch((error) => res.status(400).json({ error }))
}

exports.postNotificationPriority = (req, res, next) => {
	NotificationPriority.create(req.body)
		.then(() => {
			res.status(201).json({ message: "priorité de notification crée" })
		})
		.catch((error) => res.status(400).json({ error }))
}
