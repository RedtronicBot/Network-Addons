const mongoose = require("mongoose")

/*Création du Schéma pour l'utilisateur*/
const notificationTypeSchema = mongoose.Schema({
	name: { type: String, required: true },
})

module.exports = mongoose.model("NotificationType", notificationTypeSchema)
