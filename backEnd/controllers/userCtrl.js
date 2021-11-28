const bcryptjs = require("bcryptjs");
const db = require("../models");
const fs = require("fs");

const Post = db.posts; // post depuis model Post
const User = db.Users; // user depuis model User/Auth
const Comment = db.commentaires;

const { Op } = require("sequelize");

exports.findAllUsers = (req, res, next) => {
    User.findAll({
        attributes: ["id", "first_name", "last_name", "bio", "imagesURL"],
      })
        .then((users) => {
          if (users) {
            res
              .status(200)
              .json({ message: "Tous les utilisateurs disponibles", users });
          } else {
            return res.status(404).json({ message: "Il n'y a aucun utilisaturs" });
          }
        })
        .catch((error) => {
          console.error(error.message);
          return res.status(404).json({ error: "Il n'y a aucun utilisaturs" });
        });
};
exports.userProfil = (req, res, next) => {
  const userId = req.params.id;
  console.log("userId :", userId);
  User.findOne({
    where: {
      id: userId,
    },
    attributes: [
      "first_name",
      "last_name",
      "bio",
      "imagesURL",
      "email",
      "isAdmin",
    ],
  }) //A veifier
    .then((user) => {
      res.status(200).json(user); //recuperer tous le model de user
    })
    .catch((error) => {
      res.status(404).json(error);
    });
};

exports.updateUser = (req, res, next) => {
    //Write to Update a User informations
  const loggedUserId = req.params.id;
  const email= req.body.email;
  const first_name = req.body.first_name;
  const last_name = req.body.last_name;
  const bio = req.body.bio;
  const password = req.body.password;
  const isAdmin = req.body.isAdmin
  const imageUrl = req.body.imagesURL;
  console.log("  ===user=== : " + loggedUserId)
    //ici declaration de regex
    const regexMail     = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const regexPassword = /^(?=.*\d).{4,8}$/;

    if (
      (!email || regexMail.test(email)) &&
      (!password || regexPassword.test(password))
    ) {
      User.findOne({
        where: {
          id: loggedUserId,
        },
      })
        .then(async (loggedUser) => {
          if (loggedUser) {
            if (imageUrl) {
              loggedUser.imagesURL = req.file
                ? `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
                : null;
            }
            if (first_name) {
              loggedUser.first_name = first_name;
            }
            if (last_name) {
              loggedUser.last_name = last_name;
            }
            if (bio) {
              loggedUser.bio = bio;
            }
            if (email) {
              loggedUser.email = email;
            }
            if (password) {
              loggedUser.password = await bcryptjs.hash(password, 10);
            }
            loggedUser.isAdmin = isAdmin;
            console.log("Image ======= ", loggedUser.imagesURL);
                User.update(loggedUser.dataValues, {
                  where: {
                    id: loggedUserId,
                  },
                })
                  .then((updated) => {
                    if (updated) {
                      return res
                        .status(200)
                        .json({ message: "Utilisateur modifié", user: loggedUser });
                    } else {
                      return res.status(403).json({
                        error: "La modification d'utilisateur échoué !",
                      });
                    }
                  })
                  .catch((error) => {
                    console.error(error.message);
                    return res.status(400).json({
                      error: "Impossible a mettre a jour" +error,
                    });
                  });                         
          }
        })
        .catch((error) => {
          console.error(error.message);
          res.status(404).json({ error: "Utilisateur non trovué" });
        });
    } else {
      return res
        .status(401)
        .json({ message: "Email, mot de passe ou le nom n'est pas bon" });
    }
};
exports.deleteProfile = (req, res, next) => {
  const deletedUser = req.params.id;
 // const loggedUser = req.params.userId; //l'id de user
  console.log("user logger : " + deletedUser);

  if (deletedUser != null) {
    User.findOne({
      //On cherche une id d'utilisateur
      attributes: ["id", "email", "isAdmin"],
      where: { id: deletedUser }, //l'id de user est trouvé et compare avec l'id dans la base de données
    })
      .then((user) => {
        //après avoir trouvé l'id de user on cherche tous les id associé a l'id trouvé plus haut
        Post.findAll({
          where: { userId: deletedUser },
        })
          .then((post) => {
            Comment.findAll({
              where: { userId: deletedUser },
            })
              .then((comment) => {
                console.log(user + "   : " +user.isAdmin);
                if (user) {
                  User.destroy({
                    where: {
                      id: deletedUser,
                    },
                  })
                    .then((destroyed) => {
                      for (const posts of post) {
                        if (posts.imageUrl != null) {
                          const fileName = posts.imageUrl.split("/images/")[1];
                          fs.unlink(`images/${fileName}`, () => {
                            if (!destroyed) {
                              throw error;
                            } else {
                              // Si il n'y a pas d'erreur alors, l'erreur unlink est réussi
                              console.log("File deleted!!!!!!!!!!!!!!");
                            }
                          });
                        }
                     if (posts.publication) {
                          posts.destroy({
                         where: { id: posts.id }, 
                       })
                     }
                      }
                      for (const comments of comment) {
                        if (comments.comment) {
                          comments.destroy({
                            where: { id: comments.id }, 
                          })
                        }
                      }
                      // "error": "Ici, Internal error !"
                      res
                        .status(200)
                        .json({ message: "Utilisateur supprimée !" });
                    })
                    .catch((error) => {
                      console.error(error.message);
                      return res
                        .status(500)
                        .json({ error: "Ici, Internal error !" });
                    });
                } else {
                  res
                    .status(403)
                    .json({ error: "Vous n'avez pas d'autorisation "+error });
                }
              })
              .catch((error) => {
                console.error(error.message);
                return res
                  .status(404)
                  .json({ error: "Commentaires introuvable" + error });
              });
          })
          .catch((error) => {
            console.error(error.message);
            return res.status(404).json({ error: "Post introuvable" +error});
          });
      })
      .catch((error) => {
        console.error(error.message);
        return res.status(403).json({ error: "Utilisateur n'existe pas !" });
      });
  } else {
    return res.status(500).json({ error: "internal Error" });
  }
};