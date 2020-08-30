const nodemailer = require("nodemailer");

// transporter
module.exports.transporter = nodemailer.createTransport({
	host: "smtp.gmail.com",
	port: 587,
	auth: {
		user: process.env.GMAIL_USER,
		pass: process.env.GMAIL_PASS,
	},
});

// verify connection
module.exports.verifyConnection = async () => {
	transporter.verify((error, success) => {
		if (error) {
			console.log(error);
		} else {
			console.log("Server is ready to send messages");
		}
	});
};
