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

exports.putNotification = (req, res, next) => {
	Notification.findOneAndUpdate(
		{ _id: req.body.id },
		{ $set: { read: true, updated_at: req.body.date } },
		{ new: true }
	)
		.then((notification) => {
			res.status(201).json({ data: notification })
		})
		.catch((error) => res.status(400).json({ error }))
}

exports.putAllNotification = (req, res, next) => {
	Notification.updateMany({ read: false }, { $set: { read: true, updated_at: req.body.date } })
		.then((result) => {
			if (result.nModified === 0) {
				return res.status(200).json({ message: "Aucune notification à mettre à jour" })
			}
			res.status(200).json({ message: "Toutes les notifications sont marquées comme lues" })
		})
		.catch((error) => res.status(400).json({ error }))
}
