import { createTransport } from "nodemailer";

const transporter = createTransport({
	service: "gmail",
	auth: {
		user: process.env.MAILACC,
		pass: process.env.MAILPASS,
	},
});

export const sendEmail = (username, to) => {
	const mailOptions = {
		from: process.env.MAILACC,
		to,
		SUBJECT: `Hi ${username}`,
		text: "dies ist eine Test-Mail deiner Werkstatt.",
	};

	transporter.sendMail(mailOptions, (error, info) => {
		if (error) {
			console.error("Email not sent:", error);
		} else {
			console.log("Email sent successfully:", info.response);
		}
	});
};
