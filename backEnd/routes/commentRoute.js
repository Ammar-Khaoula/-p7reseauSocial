const express = require("express");
const commentCtrl = require("../controllers/commentCtrl");
const auth = require("../middleware/auth");
const router = express.Router();
const multer = require("../middleware/multerConfig");

router.post("/:postId", multer, commentCtrl.createComment);
router.get("/", commentCtrl.getAllComments);
router.put("/:id", multer, commentCtrl.updateMyComments);
router.delete("/:id/:userId", commentCtrl.deleteMyComment);


module.exports = router;