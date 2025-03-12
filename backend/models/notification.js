const mongoose = require("mongoose")

/*Création du Schéma pour l'utilisateur*/
const notificationSchema = mongoose.Schema({
	title: { type: String, required: true },
	content: { type: String, required: true },
	type: { type: String, required: true },
	priority: { type: String, required: true },
	read: { type: Boolean, required: true },
	read_at: { type: Date, required: true },
	expires_at: { type: Date, required: true },
	action_url: { type: String, required: true },
	context: { type: mongoose.Schema.Types.Mixed, required: true },
})

module.exports = mongoose.model("Notification", notificationSchema)
