const express = require("express");
const ctrlUser = require("../../controller/users");
const auth = require("../../middlewares/auth");
const controllerWrapper = require("../../helpers/controllerWrapper");
const upload = require("../../middlewares/upload");
const router = express.Router();

router.patch(
  "/users/avatar",
  controllerWrapper(auth),
  upload.single("avatar"),
  ctrlUser.updateAvatar
);
router.get('/users/verify/:token', controllerWrapper(ctrlUser.verifyEmail))
router.post('/users/verify/', controllerWrapper(ctrlUser.resendVerificationEmail))
module.exports = router;
