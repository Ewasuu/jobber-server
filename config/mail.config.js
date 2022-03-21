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

	const mail = {
		user: process.env.MAIL,
		pass: process.env.MAIL_PASSWORD
	}
	console.log(mail.user, mail.pass)

	let transporter = nodemailer.createTransport({
	   host: "smtp.office365.com",
	   port: 587,
	   secure: false, // true for 465, false for other ports
	   auth: {
	     user: mail.user, // generated ethereal user
	     pass: mail.pass, // generated ethereal password
	   },
	})
	try{
		await transporter.sendMail({
		   from: `Jobber <${mail.user}>`, // sender address
		   to: email, // list of receivers
		   subject: subject, // Subject line
		   text: "Hello world?", // plain text body
		   html: html
		})
	} catch(err){
		console.log(err)
	}

}


module.exports = {
	sendEmail,
	getTemplate
}