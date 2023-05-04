import { Users } from './Users.service';
import { transporter } from '../../config/notifications/nodemailer/nodemailer.config';
import env from '../../config/dotenv/dotenv.config';

export class Notifications {
  constructor() {}

  static async sendEmail(userId: string, orderId: string) {
    try {
      const { email, name, lastname } = await Users.getUser(userId);
      await transporter.sendMail({
        from: `"Medical Healthcare" <${env.SMTP_EMAIL}>`,
        to: `${email}`,
        subject: 'Thank u for choosing us! 💖',
        html: `
        <div style="max-width: 600px; margin: auto; padding: 20px; font-family: Arial, sans-serif;">
          <h1>Thank You for Your Purchase</h1>
          <p>Dear ${name} ${lastname},</p>
          <p>We appreciate your choice to buy our product and trust in us. We hope you enjoy it and find it useful.</p>
          <p>If you have any questions or comments about your purchase, please don't hesitate to contact our customer support team with your order id <strong>${orderId}</strong>. We'll be happy to assist you.</p>
          <p>Best regards,</p>
          <p>The Mebid team</p>
        </div>
      `,
      });
    } catch (error) {
      throw error;
    }
  }
}
