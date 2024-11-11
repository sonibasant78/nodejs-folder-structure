var nodemailer = require("nodemailer");
var Email = require("email-templates");
require('dotenv').config();
const {EMAIL_PATH} = require("./Constant");

module.exports = {
	sendMail: async (toEmail, mailSubject, templateName, locale) => {
		if (process.env.SEND_EMAIL === "true") {
			const configOption = {
				service: 'gmail',
				auth: {
					user: process.env.MAIL_USER_NAME,
					pass: process.env.MAIL_PASSWORD
				}				
			};
			
			const viewPath = EMAIL_PATH;
			const transporter =  nodemailer.createTransport(configOption);
			const email = new Email({
				transport: transporter,
				send: true,
				preview: false,
				views: {
					options: {
						extension: "ejs",
					},
					root: viewPath,
				},
			});
			let mailDetails ={
				template: templateName,
				message: {
					from:  'lavkeshchhatani@gmail.com',
					to: toEmail,
					subject: mailSubject
				},
				locals: locale,
			}
			
			let info;
				// send mail with defined transport object
				
			info = await email.send(mailDetails, function(err, data) {
				if(err) {
					console.log("error",err);
					console.log('Error Occurs');
				} else {
					console.log('Email sent successfully::',data);
				}
			});
			if (info) {
				console.log("Message sent: %s", info.messageId);
			}
			return info;
		} else {
			return true;
		}
	},
};

