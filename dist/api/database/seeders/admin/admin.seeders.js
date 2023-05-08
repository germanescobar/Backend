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
const client_1 = require("@prisma/client");
const roles_utils_1 = require("../../../utils/roles.utils");
const encryptPWD_utils_1 = __importDefault(require("../../../utils/encryptPWD.utils"));
const dotenv_config_1 = __importDefault(require("../../../../config/dotenv/dotenv.config"));
const winston_logger_1 = __importDefault(require("../../../../config/logger/winston.logger"));
const prisma = new client_1.PrismaClient();
const adminSeeder = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = yield getRole(roles_utils_1.roles.ADMIN);
        const ADMIN_PWD = yield (0, encryptPWD_utils_1.default)(dotenv_config_1.default.ADMIN_KEY);
        yield prisma.admin.create({
            data: {
                name: 'nena dime algo',
                email: 'admin@mebid.com',
                password: ADMIN_PWD,
                role_id: { connect: { id: id } },
            },
        });
    }
    catch (error) {
        winston_logger_1.default.error(error);
    }
});
function getRole(role) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield prisma.role.findFirstOrThrow({
                where: {
                    role,
                },
                select: {
                    id: true,
                },
            });
        }
        catch (error) {
            winston_logger_1.default.error(error);
            throw error;
        }
    });
}
adminSeeder();
