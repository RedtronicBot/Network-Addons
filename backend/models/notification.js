const mongoose = require("mongoose")

/*Création du Schéma pour l'utilisateur*/
const notificationSchema = mongoose.Schema({
	title: { type: String, required: true },
	content: { type: String, required: true },
	type: { type: String, required: true },
	priority: { type: String, required: true },
	read: { type: Boolean, required: true },
	read_at: { type: Date, required: false },
	created_at: { type: Date, required: true },
	updated_at: { type: Date, required: false },
	expires_at: { type: Date, required: true },
	action_url: { type: String, required: false },
	metadata: { type: mongoose.Schema.Types.Mixed, required: false },
	recipient_id: { type: Number, required: true },
	sender_id: { type: Number, required: false },
	relation_id: { type: Number, required: false },
})
notificationSchema.index({ expires_at: 1 }, { expireAfterSeconds: 0 })
module.exports = mongoose.model("Notification", notificationSchema)
