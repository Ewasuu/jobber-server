const nodemailer = require('nodemailer')


const getTemplate = ( name, path ) => {
	return `<head>
			      <style>
				    .big__logo{
				      position: relative;
				      font-size: 3rem;
				      margin-left: 10px;
				      margin-bottom: 2rem;
				      color: #000000;
				    }
				    .span {
				        color: #ff3c01;
				        font-size: 5.5rem;
				    }
				  </style>
			</head>

			<body>
				<div id="email___content">
				    <h1 class="big__logo" ><span class="span" >J</span>obber</h1>
				    <h2>Hi ${name} !! Thanks for joining us</h2>
				    <p>Please follow this link and confirm your account</p>
				    <a
				        href="${path}"
				        target="_blank"
				    >Confirm account</a>
				</div>
			</body>`
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
		   from: `Edward from Jobber <${process.env.MAIL}>`, // sender address
		   to: email, // list of receivers
		   subject: subject, // Subject line
		   text: "Hello!", // plain text body
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