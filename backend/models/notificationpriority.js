const mongoose = require("mongoose")

/*Création du Schéma pour l'utilisateur*/
const notificationPrioritySchema = mongoose.Schema({
	name: { type: String, required: true },
})

module.exports = mongoose.model("NotificationPriority", notificationPrioritySchema)
