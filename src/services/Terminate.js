const { DEVELOPER_EMAIL } = require("./Constant");
const Helper = require("./Helper");
const Mailer = require("./Mailer");


function terminate(server, options = { coredump: false, timeout: 500 }) {
  // Exit function
  const exit = (code) => {
    options.coredump ? process.abort() : process.exit(code);
  };

  return (code, reason) => async (err, promise) => {
      if (err && err instanceof Error) {
        let errorDetails = `${err.message} || ${err.stack}`
      console.log("error:: caused terminate", err.message, err.stack);
      console.log("inside handler");
      const locals = {
        username: DEVELOPER_EMAIL.split('@')[0],
        appName: "hga",
        errorDetails,
        preHeader:'Hga Server Crashed'
      }
      const mail = await Mailer.sendMail(
        DEVELOPER_EMAIL,
        "Server Crashed !!",
        "serverCrashDetails",
        locals
      );

      if (!mail) {
        console.log("hi can not sent");
      } 
      // Log error information, use a proper logging library here :)
      Helper.errorLogger(err)
    }

    // Attempt a graceful shutdown
    // server.close(exit);
    // setTimeout(exit, options.timeout).unref();
  };
}

module.exports = terminate;
