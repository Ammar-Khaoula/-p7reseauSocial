'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

const user = (db.Users = require("./user")(sequelize, Sequelize));
const post = (db.posts = require("./post")(sequelize, Sequelize));
const comment = (db.commentaires = require("./commentaire")(sequelize, Sequelize));
db.Like_Post = sequelize.define('Like_Post', {}, { timestamps: false});
db.Like_Comment = sequelize.define('Like_Comment', {}, { timestamps: false });

//Un usert peut avoir plusieurs post, et un post appartient à cet users la
user.hasMany(post, {
  onDelete: 'CASCADE',
  hooks: true
});
post.belongsTo(user, {
  // foreignKey: "userId",
  allowNull: false,
});

//un User peut avoir plusieurs comments, et les comments appartients a cet users la
user.hasMany(comment, {
  onDelete: 'CASCADE',
  hooks: true
  // Pour dire que si l'utilisateur est effacé, on va effacer tous les posts associé a l'id d'un user
});
comment.belongsTo(user, {
  // foreignKey: "userId",
  allowNull: false,
});

//Un post peut avoir plusieurs comments, et les comments appartiennent à l'id du post respectifs
post.hasMany(comment, {
  onDelete: 'CASCADE',
  hooks: true
  // Pour dire que si le poste est effacé, on va effacer tous les posts associé a l'id d'un user
});
comment.belongsTo(post, {
  // foreignKey: "userId",//userId
  allowNull: false,
});

user.belongsToMany(comment, {
	through: db.Like_Comment,
	foreignKey: 'commentId',
	onDelete: 'CASCADE',
	onUpdate: 'NO ACTION',
	allowNull: false
});

comment.belongsToMany(user, {
	through: db.Like_Comment,
	foreignKey: 'userId',
	onDelete: 'CASCADE', 
	onUpdate: 'NO ACTION',
	allowNull: false
});


post.belongsToMany(user, {
	through: db.Like_Post,
	foreignKey: 'userId',
	onDelete: 'CASCADE',
	onUpdate: 'NO ACTION',
	allowNull: false
});
user.belongsToMany(post, {
	through: db.Like_Post,
	foreignKey: 'postId',
	onDelete: 'CASCADE',
	onUpdate: 'NO ACTION',
	allowNull: false
});

module.exports = db;
