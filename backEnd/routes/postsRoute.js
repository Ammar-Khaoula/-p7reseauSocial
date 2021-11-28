const express = require("express");
const postCtrl = require("../controllers/postsCtrl");
const auth = require("../middleware/auth");
const router = express.Router();

const multer = require("../middleware/multerConfig");

router.get("/", postCtrl.getAllPost);
router.get("/:id", postCtrl.getAllPostbyUser);
router.get("/post/:id", postCtrl.getPostById);
router.post("/", multer, postCtrl.createPost);
router.put("/:id", multer, postCtrl.updatePost);
router.delete("/:id", postCtrl.deletePost);
// Liker un post
router.put("/like", postCtrl.likeApost);

module.exports = router;