const db = require("../models");
const fs = require("fs");

const Post = db.posts; // post depuis model Post
const User = db.Users; // user depuis model User/Auth
const Comment = db.commentaires;
const LikePost = db.Like_Post;

const { Op } = require("sequelize");

exports.getPostById = (req, res, next) => {
  const postId = req.params.id;
  console.log("postId :", postId);
  Post.findOne({
    where: {
      id: postId,
    },
    attributes: [
      "id",
      "publication",
      "imageUrl",
      "likes",
      "updatedAt",
      "UserId",
    ],
  }) 
    .then((post) => {
      console.log("========== get post by id=======");
      res.status(200).json(post); //recuperer tous le model de user
    })
    .catch((error) => {
      res.status(404).json(error);
    });
};


exports.getAllPost = (req, res, next) => {
    Post.findAll({
        include: [
          {
            model: User,
            attributes: ["last_name", "first_name", "imagesURL", "isAdmin"],
          },
          {
            model: Comment,
            attributes: ["id", "comment",  "createdAt", "userId", "imageUrl"],
            include: [
              {
                model: User,
                attributes: ["last_name", "first_name", "imagesURL", "isAdmin"],
              },
            ],
          },
        ],
        order: [["createdAt", "DESC"]],
      })
        .then((posts) => {
            if (posts) {
            return res.status(200).json({ posts });
          } else {
            return res.status(404).json({ message: "Pas de publication!" });
          }
        })
        .catch((error) => {
          console.error(error.message);
          return res.status(500).json({ error });
        });
};
exports.getAllPostbyUser = (req, res, next) => {
    const userId = req.params.id;

  Post.findAll({
    where: { UserId: userId },
    include: [
      {
        model: User,
        attributes: ["first_name", "last_name", "imagesURL", "isAdmin"],
      },
      {
        model: Comment,
        attributes: ["id", "comment", "createdAt", "UserId", "imageUrl"],
        include: [
          {
            model: User,
            attributes: ["last_name", "first_name", "imagesURL", "isAdmin"],
          },
        ],
      },
    ],
    order: [["createdAt", "DESC"]],
  })
      .then((myPosts) => {
      if (myPosts) {
        return res.status(200).json({ message: "publication trouv??", myPosts });
      } else {
        return res.status(404).json({ message: "Pas de publication!" });
      }
    })
    .catch((error) => {
      console.error(error.message);
      return res.status(400).json({ error });
    });
};
exports.createPost = (req, res, next) => {
    const userId = req.body.userId;
  // const postId = req.params.id;
  const urlImage = req.file
    ? `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
    : null;
    const post = new Post({
    publication: req.body.publication,
    imageUrl: urlImage,
    UserId: userId,
    like: req.body.like
  });
  post
    .save()
    .then((created) => {
      if (created) {
        Post.findOne({
          where: { id: created.id },
          include: [
            {
              model: User,
              attributes: ["last_name", "first_name", "imagesURL", "isAdmin"],
            },
            {
              model: Comment,
              attributes: ["id", "comment",  "createdAt", "imageUrl"],
            },
          ],
        })
          .then((postFounded) => {
            res.status(200).json({
              message: "Le post est trouv?? et sauvegard?? ?? la base de don??es",
              post: postFounded,
            });
          })
          .catch((error) => {
            console.error(error.message);
            return res.status(404).json({ error: "Le post est introuvable" });
          });
        // res.status(200).json({
        //   message: "Objet enregistr??e ?? la base de donn??es",
        //   post: created,
        // });
      } else {
        return res.status(403).json({
          error: "L'enregistrement dans la base de donn??es ??chou??e !",
        });
      }
    })
    .catch((error) => {
      console.error(error.message);
      return res.status(500).json({ error });
    });
};
exports.updatePost = (req, res, next) => {
  console.log("==============update==============");
  const postId = req.params.id;
  const userId = req.body.userId;
  const publication = req.body.publication;
  const likes = req.body.likes;
  console.log("==============update image==============");
  const postObject = req.file
      ? {
        publication: req.body.publication,
          // Si la personne rajoute un nouvel image
          imageUrl: `${req.protocol}://${req.get("host")}/images/${
            req.file.filename
          }`,
          likes: req.body.likes
        }
      : {          
        likes,
        publication
        }; // Si non, on ne modifie que le postContent
        console.log("==============debut update==============");

    User.findOne({
      attributes: ["id", "email", "isAdmin"],
      where: { id: userId },
    })
      .then((user) => {
        Post.findOne({
          where: {
            id: postId,
            // Il n'y a que l'utilisateur qui a poster qui peut le modifier
            UserId: user.id,
          },
        }).then((postFind) => {
          if (postFind.imageUrl != null) {
            const fileName = postFind.imageUrl.split("/images/")[1];
            console.log("image found est ===========" + fileName);
            fs.unlink(`images/${fileName}`, () => {
              if (user && (user.isAdmin || user.id == postFind.UserId)) {
                if (postFind) {
                  console.log("-----update-----");
                  Post.update(postObject, {
                    where: { id: postId },
                  })
                    .then((updated) => {
                      console.log("ici updatee!!!!!!!!!!", updated);
                      Post.findOne({
                        where: {
                          id: postId,
                        },
                      })
                        .then((updatedFound) => {
                          console.log("updated", updatedFound);
                          if (!updatedFound) {
                            throw error;
                          } else {
                            return res.status(200).json({
                              message: "Post modifi??e",
                              post: updatedFound,
                            });
                          }
                        })
                        .catch((error) => {
                          console.error(error.message);
                          return res
                            .status(401)
                            .json({ error: "La modification ??chou??e" });
                        });
                    })
                    .catch((error) => {
                      console.error(error.message);
                      return res.status(500).json({
                        error: "internal error",
                      });
                    });
                } else {
                  res.status(404).json({ message: "Le post introuvable !" });
                }
              } else {
                res.status(403).json({
                  message:
                    "Vous n'avez pas l'autorisation pour modifier ce post!",
                });
              }
            });
          } else {
            if (user && (user.isAdmin || user.id == postFind.UserId)) {
              if (postFind) {
                Post.update(postObject, {
                  where: { id: postId },
                  // returning: true, postid
                  // plain: true,
                })
                  .then((updated) => {
                    console.log("ici:", updated);
                    Post.findOne({
                      where: {
                        id: postId,
                      },
                    })
                      .then((updatedFound) => {
                        console.log("updateeeed", updatedFound);
                        if (!updatedFound) {
                          throw error;
                        } else {
                          return res.status(200).json({
                            message: "Post modifi??e",
                            post: updatedFound,
                          });
                        }
                      })
                      .catch((error) => {
                        console.error(error.message);
                        return res
                          .status(401)
                          .json({ error: "La modification ??chou??e" });
                      });
                  })
                  .catch((error) => {
                    console.error(error.message);
                    return res.status(500).json({
                      error: "internal error",
                    });
                  });
              } else {
                res.status(404).json({ message: "Le post introuvable !" });
              }
            } else {
              res.status(403).json({
                message: "Vous n'avez pas l'autorisation pour modifier ce post!",
              });
            }
          }
        });
      })
      .catch((error) => {
        console.error(error.message);
        return res.status(401).json({
          error: "Utilisateur introuvable",
        });
      });
};
exports.deletePost = (req, res, next) => {
  const postId = req.params.id; // l'id du post
  //const userId = req.body.userId; //l'id de user qui est logg?? (voire dans auth.jwt.js)
 /* User.findOne({
    //On cherche une id d'utilisateur
    attributes: ["id", "email", "isAdmin"],
    where: { id: userId }, 
  })
    .then((user) => {*/
      //apr??s avoir trouv?? l'id de user
      Post.findOne({
        where: {
          id: postId,
        },
        include: [
          {
            model: Comment,
            id: postId,
          },
        ],
      })
        .then((postFind) => {
          Comment.findAll({
            postId, //postId
          })
            .then((commentFind) => {
              if (postFind.imageUrl != null) {
                const fileName = postFind.imageUrl.split("/images/")[1];
                fs.unlink(`images/${fileName}`, () => {
                    if (
                      (postFind && commentFind) ||
                      (postFind && !commentFind)
                    ) {

                      //Si l'id de post a ??t?? envoy?? dans la requ??te
                      //Il faut faire une requ??te postId pour v??rifier s'il existe en bdd avant destroy, si non on envoie message erreur
                      Post.destroy({
                        // attributes: ['id', 'postContent', 'imageUrl'],// Mettre les attributs pour pouvoir trouver l'id du post et l'effacer par rapport ?? l'id de user qu'il a mis pour qu'il puisse effacer sa pubication, admin peut effacer tous le monde pub
                        where: { id: postId }, // Alors, on trouve l'id du poste cet utilisateur l??
                      })
                        .then((destroyed) => {
                          for (const comments of commentFind) {
                             //delete comment -------a faire---------
                          }
                          return res.status(200).json({
                            message: "Publication supprim??e",
                            post: postFind,
                          });
                        })
                        .catch((error) => {
                          res.status(500).json({ error });
                        });
                    } else {
                      res
                        .status(404)
                        .json({ message: "La publication introuvable!" });
                    }
                 /* } else {
                    // Si on ne trouve pas ni l'admin ni l'utilisateur qui a publier cette pubication, alors, on a pas acces pour effacer la publication
                    return res.status(403).json({
                      message: "Vous ne pouvez pas effacer ce post !",
                    });
                  }*/
                });
              } else {
                  if ((postFind && commentFind) || (postFind && !commentFind)) {
                    Post.destroy({
                      where: { id: postId },
                    })
                      .then((destroyed) => {
                        if (!destroyed) {
                          throw error;
                        } else {
                          console.log("File deleted!");
                        }
                        return res.status(200).json({
                          message: "Publication supprim??e",
                          post: postFind,
                        });
                      })
                      .catch((error) => {
                        res.status(500).json({ error });
                      });
                  } else {
                    res
                      .status(404)
                      .json({ message: "La publication introuvable!" });
                  }
               /* } else {
                  // Si on ne trouve pas ni l'admin ni l'utilisateur qui a publier cette pubication, alors, on a pas acces pour effacer la publication
                  return res.status(403).json({
                    message: "Vous ne pouvez pas effacer ce post !",
                  });
                }*/
              }
            })
            .catch((error) => {
              console.error(error.message);
              return res.status(404).json({ error: "Commentaire vide"+ error });
            });
        })
        .catch((error) => {
          console.error(error.message);
          res.status(404).json({ message: "La publication n'existe pas!" });
        });
};
exports.likeApost = (req, res, next) => {
  const postId = req.body.postId;
	const userId = req.body.userId;
  const likeValue = req.body.like;
  Post.findByPk(postId)
    .then(post => {
      switch(likeValue) {
        case 1: // le user like le post
          LikePost.create({ postId, userId })
            .then(() => {
              post.update(
                { likes: post.likes + 1 },
                { where: { id: postId } },
              ).then(() => {
                Post.findAll({
                  order: [['createdAt', 'DESC']],
                  attributes: { 
                    exclude: ['updatedAt']
                  },
                  include: [
                  {
                    model: User,
                    attributes: ['first_name', 'last_name', 'imagesURL', 'isAdmin']
                  },
                  {
                    model: Comment,
                    attributes: ['comment', 'UserId', 'id', "imageUrl"],
                    include: [{
                      model: User,
                      attributes: ['first_name', 'last_name', 'imagesURL', 'isAdmin']
                    }]
                  }
                  ]
                })
                .then( posts => { 
                  // Ajout de la table des likes au renvoi des posts
                  LikePost.findAll()
                    .then((likes) => {
                    likes.forEach(like => {
                      let post = posts.findIndex(search => search.id == like.postId);
                      if (post != null) {
                        if(posts[post].dataValues.usersLiked === undefined){
                          posts[post].dataValues.usersLiked = [like.userId];
                        } else {
                          posts[post].dataValues.usersLiked.push(like.userId);
                        }
                      }
                    })
                    res.status(201).send({posts});
                  })
                  .catch(error => { 
                    res.status(500).send({ error, message: "Impossible d'ajouter la table des likes aux posts"});
                  })
                })
                .catch( error => res.status(500).send({ error,  message:"Impossible d'afficher les posts, like case 1" }));
              })
            })
            .catch(error => {
              res.status(500).send({error, message: "Impossible d'ajouter le couple userId, postId ?? la table de jointure LikePost"});
            })
    
          break;
          case 0: // le user reclique pour retirer son like

          // Supprimer le couple postId userId de la table de jointure
          LikePost.destroy({
            where: { postId: postId, userId: userId}
          })
          .then(() => {
  
            // Mise ?? jour du post
            post.update(
              { likes: post.likes - 1},
              { where: { id : postId }}
            )
            .then (() => {
              Post.findAll({
                order: [['createdAt', 'DESC']],
                attributes: { 
                  exclude: ['updatedAt']
                },
                include: [
                {
                  model: User,
                  attributes: ['first_name', 'last_name', 'imagesURL', 'isAdmin']
                },
                {
                  model: Comment,
                  attributes: ['comment', 'userId', 'id', "imageUrl"],
                  include: [{
                    model: User,
                    attributes: ['first_name', 'last_name', 'imagesURL', 'isAdmin']
                  }]
                }
                ]
              })
              .then( posts => {
                // Ajout de la table des likes au renvoi des posts
                LikePost.findAll()
                .then((likes) => {
                  likes.forEach(like => {
                    let post = posts.findIndex(search => search.id == like.postId);
                    if (post != null) {
                      if(posts[post].dataValues.usersLiked === undefined){
                        posts[post].dataValues.usersLiked = [like.userId];
                      } else {
                        posts[post].dataValues.usersLiked.push(like.userId);
                      }
                    }
                  })
                  res.status(201).send({posts});
                })
                .catch(error => { 
                  res.status(500).send({ error, message: "Impossible d'ajouter la table des likes aux posts"});
                })
              })
              .catch( error => res.status(500).send({ error,  message:"Impossible de r??cup??rer les posts, like case 0" }));
            })
          })
          .catch(error => {
            res.status(500).send({error, message: "Impossible de supprimer le couple postId, userId de la table de jointure LikePost"});
          })
          break;
      }
    })
    .then(() => res.status(201))
    .catch( error => res.status(500).send({ error, message: "Impossible de mettre ?? jour le post"} ));
  
};
