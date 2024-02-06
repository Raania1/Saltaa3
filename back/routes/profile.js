const express = require("express")
const router = express.Router();
const profile = require('../controllers/profile')
const validateId = require('../middlewares/validateId');
const photoUpload = require("../middlewares/photoUpload");

router.route("/nbr").get(profile.Nombreprofile);
router.route("/:id").get(validateId,profile.profile).put(validateId,profile.updateProfile).delete(validateId,profile.deleteprofile);
router.route("/updatephoto/:id").post(photoUpload.single("image") , profile.updatepdp);


module.exports = router;
    