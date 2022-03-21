const nodemailer = require('nodemailer')


const getTemplate = ( name, path ) => {
	return `<head>
			    <link rel="stylesheet" href="../public/style.css">
				</head>

				<div id="email___content">
				    <h1 class="big__logo" >obber</h1>
				    <h2>Hi ${name} !! Thanks for joining us</h2>
				    <p>Please follow this link and confirm your account</p>
				    <a
				        href="${path}"
				        target="_blank"
				    >Confirm account</a>
				</div>`
}




const sendEmail = async( email, subject, html ) => {


	let transporter = nodemailer.createTransport({
	   host: process.env.SMTP,
	   port: process.env.EMAIL_PORT,
	   secure: process.env.EMAIL_SECURE, // true for 465, false for other ports
	   auth: {
	     user: process.env.MAIL, // generated ethereal user
	     pass: process.env.MAIL_PASSWORD, // generated ethereal password
	   },
	})
	try{
		await transporter.sendMail({
		   from: `Jobber <${process.env.MAIL}>`, // sender address
		   to: email, // list of receivers
		   subject: subject, // Subject line
		   text: "Hello!", // plain text body
		   html: html
		})
	} catch(err){
		throw new Error(err)
	}

}


module.exports = {
	sendEmail,
	getTemplate
}