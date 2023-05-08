"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Notifications = void 0;
const Users_service_1 = require("./Users.service");
const nodemailer_config_1 = require("../../config/notifications/nodemailer/nodemailer.config");
const dotenv_config_1 = __importDefault(require("../../config/dotenv/dotenv.config"));
class Notifications {
    constructor() { }
    static sendEmail(userId, orderId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, name, lastname } = yield Users_service_1.Users.getUser(userId);
                yield nodemailer_config_1.transporter.sendMail({
                    from: `"Medical Healthcare" <${dotenv_config_1.default.SMTP_EMAIL}>`,
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
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.Notifications = Notifications;
