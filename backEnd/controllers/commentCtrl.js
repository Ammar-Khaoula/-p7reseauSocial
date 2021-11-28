const db = require("../models");
const fs = require("fs");

const Post = db.posts; // post depuis model Post
const User = db.Users; // user depuis model User/Auth
const Comment = db.commentaires;

const { Op } = require("sequelize");
const { Console } = require("console");

exports.createComment = (req, res, next) => {
      //Declarations des varibales pour récuperer les données du modèles
    const userId = req.body.userId; //userId du user
    const postId = req.body.postId; // postId de la post
    const commentPost = req.body.comment;
  //const likeComment = req.body.like;
    
  const urlImage = req.file
    ? `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
    : null;
  console.log("===========" + req.body.comment + " user "+userId);
  console.log("====" + postId);

  const comment = new Comment({
    comment: commentPost,
    imageUrl: urlImage,
    //like: likeComment,
    UserId: userId, //original userId,
    postId: JSON.parse(postId)
  });
  comment
    .save()
    .then((created) => {
      if (created) {
        Comment.findOne({
          where: { id: created.id },
          include: [
            {
              model: User,
              attributes: ["last_name", "first_name", "imagesURL", "isAdmin"],
            },
          ],
        })
          .then((commentFounded) => {
            res.status(200).json({
              message:
                "Le comment est trouvé et sauvegardé à la base de donées",
              comment: commentFounded,
            });
          })
          .catch((error) => {
            console.error(error.message);
            return res
              .status(404)
              .json({ error: "Le comment est introuvable" });
          });
      }
    })
    .catch((error) => {
      console.error(error.message);
      return res.status(500).json({ error });
    });
};
exports.getAllComments = (req, res, next) => {
    Comment.findAll({
        include: [
          {
            model: User,
            attributes: ["email", "imagesURL", "isAdmin"],
          },
          {
            model: Post, 
            attributes: ["publication", "imageUrl"],
          },
        ],
        order: ["createdAt"],
      })
        .then((comment) => {
          if (comment <= null) {
            return res.status(404).json({ message: "Pas de publication!" });
          } else {
            return res.status(200).json({ comment });
          }
        })
        .catch((error) => {
          console.error(error.message);
          return res.status(500).json({ error });
        });
};

exports.getAllCommentbyUser = (req, res, next) => {
  const userId = req.params.id;

  Comment.findAll({
  where: { UserId: userId },
  include: [
    {
      model: User,
      attributes: ["first_name", "last_name", "imagesURL", "isAdmin"],
    },
  ],
  order: [["id", "DESC"]],
})
    .then((myComment) => {
      console.log("*****************length :    " + myComment.length);

    if (myComment) {
      return res.status(200).json({ message: "comments trouvé", myComment });
    } else {
      return res.status(404).json({ message: "Pas de comment!" });
    }
  })
  .catch((error) => {
    console.error(error.message);
    return res.status(400).json({ error });
  });
};
exports.updateMyComments = (req, res, next) => {

  const commentId = req.params.id;
  const userId = req.body.userId;

  console.log("+++++ commentId : " + commentId);
  console.log("user Id : " + userId);
    const commentObject = req.file
    ? {
        //like: req.body.like,
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
        req.file.filename
        }`,
        } :
        {
            comment: req.body.comment,
           // like: req.body.like
        };

  User.findOne({
    attributes: ["id", "email", "isAdmin"],
    where: { id: userId },
  })
    .then((user) => {
      Comment.findOne({
        where: {
          id: commentId,
          // Il n'y a que l'utilisateur qui a poster le commentaire qui peut le modifier
          UserId: user.id
        },
      })
        .then((commentFind) => {
          console.log("debut update comment+++ ", commentFind.comment);
          if (commentFind.imageUrl != null) {
            const fileName = commentFind.imageUrl.split("/images/")[1];
            console.log("fileName", fileName);
            fs.unlink(`images/${fileName}`, () => {
              if (user && (user.isAdmin || user.id == commentFind.UserId)) {
                if (commentFind) {
                  Comment.update(commentObject, {
                    where: { id: commentId },
                  })
                    .then((updated) => {
                      console.log("ici updateeeeeeeeeed", updated);
                      Comment.findOne({
                        where: {
                          id: commentId,
                        },
                      })
                        .then((updatedFound) => {
                          if (!updatedFound) {
                            throw error;
                          } else {
                            // Si il n'y a pas d'erreur alors, l'erreur unlink est réussi
                            console.log("Modified!");
                            return res.status(200).json({
                              message: "Commentaire modifiée",
                              comments: updatedFound,
                            });
                          }
                        })
                        .catch((error) => {
                          console.error(error.message);
                          return res(401).json({
                            error: " La modification échouée",
                          });
                        });
                    })
                    .catch((error) => {
                      console.error(error.message);
                      return res.status(500).json({ error: "internal error" });
                    });
                } else {
                  res
                    .status(404)
                    .json({ message: "Le commentaire est introuvable" });
                }
              } else {
                res.status(403).json({
                  message:
                    "Vous n'avez pas l'autorisation pour modifier ce commentaire!",
                });
              }
            });
          } else {
            if (user && (user.isAdmin || user.id == commentFind.UserId)) {
              if (commentFind) {
                Comment.update(commentObject, {
                  where: { id: commentId },
                })
                  .then((updated) => {
                    console.log("ici updateeeeeeeeeed", updated);
                    Comment.findOne({
                      where: {
                        id: commentId,
                      },
                    })
                      .then((updatedFound) => {
                        if (!updatedFound) {
                          throw error;
                        } else {
                          // Si il n'y a pas d'erreur alors, l'erreur unlink est réussi
                          console.log("Modified!");
                          return res.status(200).json({
                            message: "Commentaire modifiée",
                            comments: updatedFound,
                          });
                        }
                      })
                      .catch((error) => {
                        console.error(error.message);
                        return res(401).json({
                          error: " La modification échouée",
                        });
                      });
                  })
                  .catch((error) => {
                    console.error(error.message);
                    return res.status(500).json({ error: "internal error" });
                  });
              } else {
                res
                  .status(404)
                  .json({ message: "Le commentaire est introuvable" });
              }
            } else {
              res.status(403).json({
                message:
                  "Vous n'avez pas l'autorisation pour modifier ce commentaire!",
              });
            }
          }
        })
        .catch((error) => {
          console.error(error.message);
          return res.status({ message: "Commentaire introuvable!" });
        });
    })
    .catch((error) => {
      console.log(error.message);
      return res
        .status(403)
        .json({ message: "Vous n'avez pas d'autorisation!" });
    });
};
exports.deleteMyComment = (req, res, next) => {
    const commentId = req.params.id; // l'id du comment
    const userId = req.params.userId; //l'id de user
  
  console.log(userId+"++++++++cmt: " + commentId+" user ");
  User.findOne({
      //On cherche une id d'utilisateur
      attributes: ["id", "email", "isAdmin"],
      where: { id: userId }, //l'id de user est trouvé et compare avec l'id dans la base de données
    })
      .then((user) => {
        //après avoir trouvé l'id de user
        console.log("***********user est trouvé***********");
        Comment.findOne({
          where: {
            id: commentId,
          },
        })
          .then((comment) => {
            console.log("***********commentaire est trouvé***********"+user.id +"+++"+comment.UserId);
            console.log("+++++++" + comment.id);
            if (comment.imageUrl != null) {
              // Je ne comprend pas
              //Une fois le post qui correspond a l'id de l'user trouvé, on extrait le nom du fichier (image) à supprimer et on supprimer avec fs.unlinnk, et une fois que la suppression du fichier est fait, on fait la suppreson de l'objet de la base de données
              const fileName = comment.imageUrl.split("/images/")[1];
              fs.unlink(`images/${fileName}`, () => {
                if (user && (user.isAdmin || user.id == comment.UserId)) {

                  //on fait une condition, si c'est un admin (true) ou si c'est l'id de l'utilisateur, on peut accder a la publication
                  //Si l'id de post a été envoyé dans la requête
                  //Il faut faire une requête postId pour vérifier s'il existe en bdd avant destroy, si non on envoie message erreur
                  Comment.destroy({
                    // attributes: ['id', 'postContent', 'imageUrl'],// Mettre les attributs pour pouvoir trouver l'id du post et l'effacer par rapport à l'id de user qu'il a mis pour qu'il puisse effacer sa pubication, admin peut effacer tous le monde pub
                    where: { id: comment.id }, // Alors, on trouve l'id du poste cet utilisateur là
                  })
                    .then(() => {
                      return res.status(200).json({
                        message: "Publication supprimée",
                        comments: comment,
                      });
                    })
                    .catch((error) => {
                      console.error("Erreue :"+error);
                      return res.status(500).json({ error });
                    });
                } else {
                  // Si on ne trouve pas ni l'admin ni l'utilisateur qui a publier cette pubication, alors, on a pas acces pour effacer la publication
                  return res.status(403).json({
                    message: "Vous n'avez pas d'autorisation effacer ce post !",
                  });
                }
              });
            } else {
                console.log("-----" + user.isAdmin+comment.UserId);
                console.log("--///---" + (user.id == comment.UserId)+user.id);
              if (user && (user.isAdmin || user.id == comment.UserId)) {
                //on fait une condition, si c'est un admin (true) ou si c'est l'id de l'utilisateur, on peut accder a la publication
                //Si l'id de post a été envoyé dans la requête
                //Il faut faire une requête postId pour vérifier s'il existe en bdd avant destroy, si non on envoie message erreur
                Comment.destroy({
                  // attributes: ['id', 'postContent', 'imageUrl'],// Mettre les attributs pour pouvoir trouver l'id du post et l'effacer par rapport à l'id de user qu'il a mis pour qu'il puisse effacer sa pubication, admin peut effacer tous le monde pub
                  where: { id: comment.id }, // Alors, on trouve l'id du poste cet utilisateur là
                })
                  .then(() => {
                    return res.status(200).json({
                      message: "commentaire supprimée",
                      comments: comment,
                    });
                  })
                  .catch(() => {
                    console.error(error.message);
                    return res.status(500).json({ error });
                  });
              } else {
                // Si on ne trouve pas ni l'admin ni l'utilisateur qui a publier cette pubication, alors, on a pas acces pour effacer la publication
                return res.status(403).json({
                  message: "Vous n'avez pas d'autorisation effacer ce post !",
                });
              }
            }
          })
          .catch((error) => {
            console.error(error.message);
            res.status(404).json({ message: "Le commentaire n'existe pas!" });
          });
      })
      .catch((error) => {
        console.error(error.message);
        return res.status(500).json({ error });
      });
};