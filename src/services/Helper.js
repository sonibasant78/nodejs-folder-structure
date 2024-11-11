const fs = require("fs");
const Mailer = require("./Mailer");
const moment = require('moment')
const AdminPanelError = require("../error/AdminPanelError");

module.exports = {
  makeRandomNumber: (length) => {
    let result = "";
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  },
  uploadLogger: (next, logString) => {
    fs.appendFile("./src/public/uploadLogs/log.txt", logString, function (err) {
      if (err) {
        console.log(err);
        next(AdminPanelError.internalAdmin("Error in updating log file"));
      }
      console.log("data Saved::");
    });
  },
   errorLogger : (error) => {
    var now	= moment();
    let today = now.format('YYYY-MM-DD');
    let logString = `\n${today}||${error.message} || ${error.stack}` 
    fs.appendFile("./src/public/uploadLogs/error.txt", logString, function (err) {
      if (err) {
        console.log(err);
      }
      console.log("data Saved::");
    });
  },

};
