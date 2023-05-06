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
const winston_logger_1 = __importDefault(require("../../../../config/logger/winston.logger"));
const prisma = new client_1.PrismaClient();
const roles = [1993, 2023, 1000];
const rolesSeeder = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        for (const role of roles) {
            try {
                yield prisma.role.create({
                    data: {
                        role,
                    },
                });
                winston_logger_1.default.info('The role seeder was completed succesfully.');
                yield prisma.$disconnect();
            }
            catch (error) {
                winston_logger_1.default.error(error);
            }
        }
    }
    catch (error) {
        winston_logger_1.default.error(error);
    }
});
rolesSeeder();
