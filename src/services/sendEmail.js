import { createTransport } from "nodemailer";
import { readFileSync } from "fs";


const transporter = createTransport({
	service: "gmail",
	auth: {
		user: process.env.MAILACC,
		pass: process.env.MAILPASS,
	},
});

export const sendEmail = (username, to) => {
	let htmlTemplate = readFileSync("./src/services/registerEmail.html", "utf8");
	htmlTemplate = htmlTemplate.replace(
		"document.getElementById('username').textContent = 'username';",
		`document.getElementById('username').textContent = '${username}';`
	);
	const mailOptions = {
		from: process.env.MAILACC,
		to,
		SUBJECT: `Hi ${username}`,
		html: htmlTemplate,
	};

	transporter.sendMail(mailOptions, (error, info) => {
		if (error) {
			console.error("Email not sent:", error);
		} else {
			console.log("Email sent successfully:", info.response);
		}
	});
};
