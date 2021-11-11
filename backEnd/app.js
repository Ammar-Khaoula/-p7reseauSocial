const express = require("express");
const bodyParser = require("body-parser");
const helmet = require("helmet");

//Connexion
const db = require('./models');
const authRoutes = require('./routes/authRoute');
const userRoutes = require('./routes/userRoute');
const postsRoute = require('./routes/postsRoute');
const commentRoute = require('./routes/commentRoute');

const app = express();
const path = require("path");

// Connexion de l'API à la bdd
db.sequelize.sync().then(result => {
	// db.sequelize.sync({ force: true }).then(result => {
	//console.log(result);
}).catch( error =>  { console.log(error )});

require("dotenv").config();

// middleware général 1 pour définir les headers de toutes les requetes
app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH', 'OPTIONS');
	next();
});


//Pour lire le format application/JSON
app.use(bodyParser.json());
//Pour lire le format application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// Helmet pour securiser les cookies
app.use(helmet());

app.use("/images", express.static(path.join(__dirname, "images")));
app.use('/api/', authRoutes);
app.use('/api/profile', userRoutes);
app.use('/api/postes', postsRoute);
app.use('/api/comment', commentRoute);
module.exports = app;