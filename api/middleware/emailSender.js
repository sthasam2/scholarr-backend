require("dotenv").config();
const nodemailer = require("nodemailer");
// let confirmationEmail = require("../templates/confirmationEmail");

// transporter
const transporter = nodemailer.createTransport({
	host: "smtp.gmail.com",
	port: 587,
	auth: {
		user: process.env.GMAIL_USER,
		pass: process.env.GMAIL_PASS,
	},
});

// verify connection
const verifyConnection = async () => {
	transporter.verify((error, success) => {
		if (error) {
			console.log(error);
		} else {
			console.log("Server is ready to send messages");
		}
	});
};

/** Email sender nodemailer module
 * @param1 req - request made
 * @param2 res - response to send
 * @param3 user - user model object
 * @param4 token - token model object
 *
 * @returns error
 */
module.exports.confirmEmailSender = async (req, res, user, token) => {
	await verifyConnection();

	// console.log(`user: ${user}, \t token: ${token}`);

	const message = {
		from: process.env.GMAIL_USER,
		to: req.body.email,
		subject: "[Scholarr] Email Confirmation",
		html: `<html>
        <head>
            <style>
                p.custom {
                    font-family: 'Muli', sans-serif;
                    font-size: 20px;
                    line-height: 1.5;
                }
        
                h1.custom {
                    font-family: "Libre Baskerville", serif;
                    font-size: 3em;
                    font-weight: bold;
                    justify-content: center;
                }
        
                div.container {
                    margin: 10vh 5vw;
                    display: flex;
                    justify-content: center;
                }
        
                div.custom {
                    padding: 35px;
                    display: grid;
                    /* justify-content: center; */
                    border-style: solid;
                    border-color: #000000;
                    border-radius: 1em;
                    min-width: 80%;
                }
            </style>
        </head>
        <body>
            <link
                href="https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Muli:wght@400;700&display=swap"
                rel="stylesheet"
            />
            <div class="container">
                <div class="custom">
                    <h1 class="custom">Confirm your e-mail address</h1>
                    <p class="custom">
                        Dear <strong>${user.username}</strong>,<br />
                        Please confirm <strong>'${user.email}'</strong> as your email by clicking the
                        following link:<br />
                        <a href="http:\/\/${req.headers.host}\/api\/user\/confirmation\/${token.token}">
                            <strong>Click here</strong></a
                        ><br />
                        Or, copy the following link into your browser:<br />
                        <strong>
                            http:\/\/${req.headers.host}\/api\/user\/confirmation\/${token.token}
                        </strong>
                        <br /><br />
                        Sincerely,
                        <br />
                        <strong>
                            The Scholarr Team
                        </strong>
                    </p>
                </div>
            </div>
        </body>
        </html>
        `,
	};

	// Send Message
	try {
		const success = await transporter.sendMail(message);
		console.log("The verification email has been sent\nSuccess : " + success);
	} catch (error) {
		console.log("An error occured");
		return err;
	}
};

//
//
// RESET PASSWORD EMAIL SENDER
/** Email sender nodemailer module
 * @param1 req - request made
 * @param2 res - response to send
 * @param3 user - user model object
 * @param4 token - token model object
 *
 * @returns error
 */
module.exports.resetPasswordEmailSender = async (req, res, user, token) => {
	await verifyConnection();

	// console.log(`user: ${user}, \t token: ${token}`);

	const message = {
		from: process.env.GMAIL_USER,
		to: req.body.email,
		subject: "[Scholarr] Reset Email Password",
		html: `<html>
        <head>
            <style>
                p.custom {
                    font-family: "Muli", sans-serif;
                    font-size: 20px;
                    line-height: 1.5;
                }
    
                h1.custom {
                    font-family: "Libre Baskerville", serif;
                    font-size: 3em;
                    font-weight: bold;
                    justify-content: center;
                }
    
                div.container {
                    margin: 10vh 5vw;
                    display: flex;
                    justify-content: center;
                }
    
                div.custom {
                    padding: 35px;
                    display: grid;
                    /* justify-content: center; */
                    border-style: solid;
                    border-color: #000000;
                    border-radius: 1em;
                    min-width: 80%;
                }
            </style>
        </head>
        <body>
            <link
                href="https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Muli:wght@400;700&display=swap"
                rel="stylesheet"
            />
            <div class="container">
                <div class="custom">
                    <h1 class="custom">Reset your e-mail address</h1>
                    <p class="custom">
                        Dear <strong>${user.username}</strong>,<br />
                        A request for password reset to your
                        <strong>Scholarr</strong> account <strong>'${user.email}'</strong> has been issued. Please click
                        the following link to reset your password<br />
                        <a
                            href="http:\/\/${req.headers.host}\/api\/user\/reset_password\/${token.token}"
                        >
                            <strong>Click here</strong></a
                        ><br />
                        Or, copy the following link into your browser:<br />
                        <strong>
                            http:\/\/${req.headers.host}\/api\/user\/reset_password\/${token.token}
                        </strong><br/>
                        If this was not done by you, please secure you account.
                        <br /><br />
                        Sincerely,
                        <br />
                        <strong>
                            The Scholarr Team
                        </strong>
                    </p>
                </div>
            </div>
        </body>
    </html>`,
	};

	// Send Message
	try {
		await transporter.sendMail(message);
		console.log("The verification email has been sent");
	} catch (error) {
		console.log("An error occured");
		return err;
	}
	// return (success = { type: "Sucess", message: "The verification email has been sent" });
};
