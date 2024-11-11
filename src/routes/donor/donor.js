const router = require("express").Router();
const { validateAdmin } = require("../../middleware/api");
const {
  signUp,loginDonor
} = require("../../controllers");


// auth
router.post("/signup", signUp);
router.post("/login",loginDonor);

// functionalities

module.exports = router;
