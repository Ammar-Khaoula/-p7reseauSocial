const models = require('../models');
//const user = db.User;
const bcrypt = require('bcrypt');
const asyncLib = require('async');
const jwt = require('../middleware/auth');
const bcryptjs = require('bcryptjs');
const user = require('../models/user');



//* **************signUp************** 
// Constants
const EMAIL_REGEX     = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PASSWORD_REGEX = /^(?=.*\d).{4,8}$/;

// Routes
module.exports = {
	signup: function (req, res) {
		// Params
		const email = req.body.email;
		const first_name = req.body.first_name;
		const last_name = req.body.last_name;
		const password = req.body.password;
		const bio = req.body.bio;
		const imageUrl = req.body.imagesURL;
		/*const urlImage = req.file
    ? `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
    : null;
		const imagesURL = urlImage;*/
		if (email == null || first_name == null || last_name == null || password == null) {
			return res.status(400).json({ 'error': 'missing parameters' });
		}
  
		if (first_name.length >= 13 || first_name.length <= 2) {
			return res.status(400).json({ 'error': 'wrong first_name (must be length 3 - 12)' });
		}
		if (last_name.length >= 13 || last_name.length <= 2) {
			return res.status(400).json({ 'error': 'wrong last_name (must be length 3 - 12)' });
		}
		if (!EMAIL_REGEX.test(email)) {
			return res.status(400).json({ 'error': 'email is not valid' });
		}
  
		if (!PASSWORD_REGEX.test(password)) {
			return res.status(400).json({ 'error': 'password invalid (must length 4 - 8 and include 1 number at least)' });
		}
  
		asyncLib.waterfall([
			function (done) {
				models.User.findOne({
					attributes: ['email'],
					where: { email: email }
				})
					.then(function (userFound) {
						done(null, userFound);
					})
					.catch(function (err) {
						return res.status(500).json({ 'error': 'unable to verify user' });
					});
			},
			function (userFound, done) {
				if (!userFound) {
					bcrypt.hash(password, 5, function (err, bcryptedPassword) {
						done(null, userFound, bcryptedPassword);
					});
				} else {
					return res.status(409).json({ 'error': 'user already exist' });
				}
			},
			function (userFound, bcryptedPassword, done) {
				const newUser = models.User.create({
					email: email,
					first_name: first_name,
					last_name: last_name,
					password: bcryptedPassword,
					bio: bio,
					imagesURL: imageUrl,
					isAdmin: 0,
				})
					.then(function (newUser) {
						done(newUser);
					})
					.catch(function (err) {
						return res.status(500).json({ 'error': 'cannot add user :' +err });
					});
			}
		], function (newUser) {
			if (newUser) {
				return res.status(201).json({
					'userId': newUser.id,
					'isAdmin': newUser.isAdmin
				});
			} else {
				return res.status(500).json({ 'error': 'cannot add user' });
			}
		});
	},

	//---------------------login-------
	login: function (req, res) {
		const email = req.body.email;
		const password = req.body.password;
		bio = req.body.bio;
		first_name = req.body.first_name;
		last_name = req.body.last_name;
		imagesURL = req.body.imagesURL;
		if (email == null || password == null) {
			return res.status(400).json({ 'error': 'paramètres manquants' });
		}
		asyncLib.waterfall([
			function (done) {
				models.User.findOne({
					where: { email: email }
				})
					.then(function (userFound) {
						done(null, userFound);
					})
					.catch(function (err) {
						return res.status(500).json({ 'error': 'unable to verify user' });
					});
			},
			function (userFound, done) {
				if (userFound) {
					bcrypt.compare(password, userFound.password, function (errBycrypt, resBycrypt) {
						done(null, userFound, resBycrypt);
					});
				} else {
					return res.status(404).json({ 'error': 'user not exist in DB' });
				}
			},
			function (userFound, resBycrypt, done) {
				if (resBycrypt) {
					done(userFound);
				} else {
					return res.status(403).json({ 'error': 'invalid password' });
				}
			}
		], function (userFound) {
			if (userFound) {
				return res.status(201).json({
					'userId': userFound.id,
					'isAdmin' : userFound.isAdmin,
					'token': jwt.generateTokenForUser(userFound)
				}),
					userFound = {
						id: userFound.id,
						first_name: userFound.first_name,
						last_name: userFound.last_name,
						bio: userFound.bio,
						email: req.body.email,
						password: req.body.password,
						imagesURL: userFound .imagesURL,
						isAdmin: userFound.isAdmin,
					};
			} else {
				return res.status(500).json({ 'error': 'cannot log on user' });
			}
		});
	}
};
