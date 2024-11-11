const router = require("express").Router();
const { validateAdmin } = require("../../middleware/api");
const {
  loginAuth,logOut,createBloodBank
} = require("../../controllers");


// auth
router.post("/login", loginAuth);
// router.get("/logout", logOut);


// functionalities
router.post("/create-blood-bank",validateAdmin,createBloodBank)

module.exports = router;
