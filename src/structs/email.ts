import nodemailer from "nodemailer";
import { mailConfig } from "./config";

let config = mailConfig();

export const transport = nodemailer.createTransport(config);

export async function sendVerificationMessage(mailcode: string, authcode: number): Promise<number> {
  const message = {
    from: config.senderAddress,
    to: mailcode + "@student.kit.edu",
    subject: "KITchen Bestätigungscode: " + authcode,
    text: `Dein KITchen Bestätigungscode ist: ${authcode}\nDiesen Code musst du bei der Registrierung eingeben.\nBitte antworte nicht auf diese Nachricht.`
  };

  const mailSender = await transport.sendMail(message);

  if (mailSender.error) {
    console.error(mailSender.error);
    return 500;
  }

  return mailSender.statusCode;
}
