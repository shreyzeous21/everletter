import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.NODEMAILER_USER!,
    pass: process.env.NODEMAILER_APP_PASSWORD!,
  },
});

export default transporter;

export async function sendEmail({
  to,
  subject,
  text,
}: {
  to: string;
  subject: string;
  text: string;
}) {
  await transporter.sendMail({
    from: process.env.NODEMAILER_USER,
    to,
    subject,
    html: text,
  });
}
