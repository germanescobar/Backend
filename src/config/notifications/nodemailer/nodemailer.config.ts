import nodemailer from 'nodemailer';
import env from '../../dotenv/dotenv.config';
import logger from '../../logger/winston.logger';

export const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: env.SMTP_EMAIL,
    pass: env.SMTP_PASSWORD,
  },
});

transporter.verify().then(() => {
  logger.info(`Ready for send mails!`);
});
