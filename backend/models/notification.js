const mongoose = require("mongoose")

/*Création du Schéma pour l'utilisateur*/
const notificationSchema = mongoose.Schema({
	nom: { type: String, required: true },
})

module.exports = mongoose.model("Notification", notificationSchema)
