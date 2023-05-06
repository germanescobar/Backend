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
const roles_utils_1 = require("../../../utils/roles.utils");
const encryptPWD_utils_1 = __importDefault(require("../../../utils/encryptPWD.utils"));
const doctors_json_1 = __importDefault(require("./doctors.json"));
const prisma = new client_1.PrismaClient();
const doctorsSeeders = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id: role_id } = yield getRole(roles_utils_1.roles.DOCTOR);
        for (const doctor of doctors_json_1.default) {
            const { headquarter: { city }, area, } = doctor;
            const encryptedPassword = yield (0, encryptPWD_utils_1.default)(doctor.password);
            const { id: locationId } = yield getLocation(city);
            const { id: areaId } = yield getArea(area);
            yield prisma.doctor.create({
                data: Object.assign(Object.assign({}, doctor), { password: encryptedPassword, headquarter: { connect: { id: locationId } }, area: { connect: { id: areaId } }, role_id: { connect: { id: role_id } } }),
            });
        }
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
function getLocation(city) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield prisma.headquarter.findFirstOrThrow({
                where: { city },
                select: { id: true },
            });
        }
        catch (error) {
            throw error;
        }
    });
}
function getArea(area) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield prisma.area.findFirstOrThrow({
                where: { area },
                select: { id: true, area: true },
            });
        }
        catch (error) {
            throw error;
        }
    });
}
doctorsSeeders();
