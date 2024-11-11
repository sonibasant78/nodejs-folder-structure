const router = require("express").Router();
const { validateBloodBank } = require("../../middleware/api");
const {
  loginBloodBank,issueCertificate
} = require("../../controllers");


// auth
router.post("/login", loginBloodBank);


// functionalities
router.post("/issue-certificate",validateBloodBank,issueCertificate)




module.exports = router;
