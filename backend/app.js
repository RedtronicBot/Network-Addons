const express = require("express")
const mongoose = require("mongoose")
var cors = require("cors")
require("dotenv").config()
const app = express()

/*Reglage du CORS*/
app.options("*", cors())
/*Récupération des routes*/
const notificationRoutes = require("./routes/notificationRoutes")
/*Connexion à la base de données mongodb*/
mongoose
	.connect(process.env.MONGO_URI)
	.then(() => console.warn("Connexion à MongoDB réussie !"))
	.catch((err) => console.warn("Connexion à MongoDB échouée !", err))

app.use(cors())
app.use(express.json())
/*Acces au fichier statiques*/
app.use(express.static(__dirname))
/*Utilisation des routes*/
app.use("/notification", notificationRoutes)
module.exports = app
