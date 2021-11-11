const express = require("express");
const userCtrl = require("../controllers/userCtrl");
const auth = require("../middleware/auth");
const router = express.Router();


router.get("/", userCtrl.findAllUsers);
router.get("/me/:id", userCtrl.userProfil);
router.put("/me/:id", userCtrl.updateUser);
router.delete("/me/:id", userCtrl.deleteProfile);

module.exports = router;