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
	const htmlTemplate = readFileSync("./src/services/emailTemplate.html", "utf8");
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
