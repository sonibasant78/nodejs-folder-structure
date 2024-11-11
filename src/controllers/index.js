
// admin
const {loginAuth , logOut  } = require("./admin/AuthControllers");
const {createBloodBank } = require("./admin/FuntionalityControllers");
const {signUp,loginDonor} = require("./donor/AuthControllers");
const {loginBloodBank} = require("./bloodBank/AuthControllers")
const {issueCertificate } = require("./bloodBank/FuntionalityControllers");

module.exports = { loginDonor,issueCertificate,loginBloodBank , loginAuth , logOut ,signUp,createBloodBank}