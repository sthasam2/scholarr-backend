require("dotenv").config();
const { transporter, verifyConnection } = require("../../config/nodemailer");
const nodemailer = require("nodemailer");

/**
 * ### Email confirmation email sender
 * @param {object} req Request object
 * @param {object} user User mongodb document
 * @param {*} token Token mongodb document
 *
 * @returns  {object} err
 */
module.exports.confirmEmailSender = async (req, user, token) => {
	await verifyConnection();

	const message = {
		from: process.env.GMAIL_USER,
		to: req.body.email,
		subject: "[Scholarr] Email Confirmation",
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
                  <h1 class="custom">Confirm your e-mail address</h1>
                  <p class="custom">
                    Dear <strong>${user.username}</strong>,<br />
                    Please confirm <strong>'${user.email}'</strong> as your email by clicking the following
                    link:<br />
                    <a href="http:\/\/${req.headers.host}\/api\/auth\/confirmation\/${token.token}">
                      <strong>Click here</strong></a
                    ><br />
                    Or, copy the following link into your browser:<br />
                    <strong>
                      http:\/\/${req.headers.host}\/api\/auth\/confirmation\/${token.token}
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
          </html>`,
	};

	// Send Message
	try {
		const success = await transporter.sendMail(message);
		console.log("The verification email has been sent\nSuccess : " + success);
	} catch (err) {
		console.log("An error occured");
		return err;
	}
};

/**
 * ### Email verified email sender
 * @param {object} req Request object
 * @param {object} user User mongodb document
 * @param {*} token Token mongodb document
 *
 * @returns  {object} err
 */
module.exports.emailVerifiedEmailSender = async (user) => {
	await verifyConnection();

	const message = {
		from: process.env.GMAIL_USER,
		to: user.email,
		subject: "[Scholarr] Email verified",
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
                            Your'${user.email}'</strong> has been verified. Thank you for using our services. Please have a great time. 
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
		const success = await transporter.sendMail(message);
		console.log("The verification email has been sent\nSuccess : " + success);
	} catch (err) {
		console.log("An error occured");
		return err;
	}
};

//
//
// RESET PASSWORD EMAIL SENDER
/**
 * ### Reset password Email sender
 * @param {object} req Request object
 * @param {object} user User mongodb document
 * @param {*} token Token mongodb document
 *
 * @returns  {object} err
 */
module.exports.resetPasswordEmailSender = async (req, user, token) => {
	await verifyConnection();

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
                        A request for resetting the password for your
                        <strong>Scholarr</strong> account <strong>'${user.email}'</strong> has been issued. Please click
                        the following link to reset your password<br />
                        <a
                            href="http:\/\/${req.headers.host}\/api\/auth\/reset_password\/${token.token}"
                        >
                            <strong>Click here</strong></a
                        ><br />
                        Or, copy the following link into your browser:<br />
                        <strong>
                            http:\/\/${req.headers.host}\/api\/auth\/reset_password\/${token.token}
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
		console.log("The password reset email has been sent");
	} catch (err) {
		console.log("An error occured");
		return err;
	}
	// return (success = { type: "Sucess", message: "The verification email has been sent" });
};

//
//
// DELETE ACCOUNT EMAIL SENDER
/**
 * ### Account delete email sender
 * @param {object} req Request object
 * @param {object} user User mongodb document
 * @param {*} token Token mongodb document
 *
 * @returns  {object} err
 */
module.exports.deleteAccountEmailSender = async (req, user, token) => {
	await verifyConnection();

	// console.log(`user: ${user}, \t token: ${token}`);

	const message = {
		from: process.env.GMAIL_USER,
		to: req.body.email,
		subject: "[Scholarr] Delete Account",
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
                    <h1 class="custom">Account Deletion</h1>
                    <p class="custom">
                        Dear <strong>${user.username}</strong>,<br />
                        A request for deletion of your
                        <strong>Scholarr</strong> account <strong>'${user.email}'</strong> has been issued. Please click
                        the following link to delete your account.<a
                            href="http:\/\/${req.headers.host}\/api\/auth\/delete_account\/${token.token}"
                        >
                            <strong>Click here</strong></a
                        >.<br />
                        Or, copy the following link into your browser:<br />
                        <strong>
                            http:\/\/${req.headers.host}\/api\/auth\/delete_account\/${token.token}
                        </strong><br/>
                        If this was not done by you, please secure your account. However, if not the case We hope you had a wonderful time using our services. We feel obliged to have been of use and wish to see you here again. Have a nice day!
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
		console.log("The account deletion email has been sent");
	} catch (err) {
		console.log("An error occured");
		return err;
	}
	// return (success = { type: "Sucess", message: "The verification email has been sent" });
};
