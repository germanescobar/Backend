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
exports.Appointments = void 0;
const client_1 = require("@prisma/client");
const prismaErrorsCodes_utils_1 = require("../utils/prismaErrorsCodes.utils");
const ApiError_middlewares_1 = require("../../config/middlewares/errorHandler/ApiError.middlewares");
const Patients_service_1 = require("./Patients.service");
const Doctors_service_1 = require("./Doctors.service");
const Users_service_1 = require("./Users.service");
const Locations_service_1 = require("./Locations.service");
const roles_utils_1 = require("../utils/roles.utils");
const winston_logger_1 = __importDefault(require("../../config/logger/winston.logger"));
const PrismaErrorHandler_middleware_1 = __importDefault(require("../../config/middlewares/errorHandler/PrismaErrorHandler.middleware"));
const prisma = new client_1.PrismaClient();
class Appointments {
    constructor() { }
    static getAppointments(id, role) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (role === roles_utils_1.roles.USER) {
                    return yield Users_service_1.Users.getUserAppointments(id);
                }
                if (role === roles_utils_1.roles.DOCTOR) {
                    return yield Doctors_service_1.Doctors.getDoctorsAppointments(id);
                }
            }
            catch (error) {
                if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                    winston_logger_1.default.info('Prisma error:', error);
                    if (prismaErrorsCodes_utils_1.prismaErrorsCodes404.includes(error.code))
                        throw new PrismaErrorHandler_middleware_1.default(error.message, 404);
                    if (prismaErrorsCodes_utils_1.prismaErrorsCodes400.includes(error.code))
                        throw new PrismaErrorHandler_middleware_1.default(error.message, 400);
                    throw new PrismaErrorHandler_middleware_1.default(error.message, 500);
                }
                throw ApiError_middlewares_1.ApiError.Internal('Error unknown in Prisma');
            }
        });
    }
    static createAppointment(appointments, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const appointmentsIds = [];
                for (const appointment of appointments) {
                    const { patientEmail } = appointment.patientData;
                    const { patientData, appointmentData } = appointment;
                    const { preferredDoctorSelected, specialitySelected, appointmentDate, appointmentTime, citySelected, consultationReasons, } = appointmentData;
                    const [day, month, year] = appointmentDate.split('/');
                    const isPatient = yield Patients_service_1.Patient.getPatient(patientEmail);
                    const locatiodId = yield Locations_service_1.Locations.getLocation(citySelected);
                    if (!isPatient) {
                        const { id: patientId } = yield Patients_service_1.Patient.createPatient(patientData);
                        const { id } = yield prisma.appointment.create({
                            data: {
                                user: { connect: { id: userId } },
                                patient: { connect: { id: patientId } },
                                doctor: { connect: { id: preferredDoctorSelected.id } },
                                area: { connect: { id: specialitySelected.id } },
                                date: new Date(`${year}-${month}-${day}`),
                                scheduleAt: appointmentTime,
                                headquarter: { connect: { id: locatiodId === null || locatiodId === void 0 ? void 0 : locatiodId.id } },
                                reason: consultationReasons,
                            },
                        });
                        appointmentsIds.push({ id });
                    }
                    else {
                        const { id } = yield prisma.appointment.create({
                            data: {
                                user: { connect: { id: userId } },
                                patient: { connect: { id: isPatient.id } },
                                doctor: { connect: { id: preferredDoctorSelected.id } },
                                area: { connect: { id: specialitySelected.id } },
                                date: new Date(`${year}-${month}-${day}`),
                                scheduleAt: appointmentTime,
                                headquarter: { connect: { id: locatiodId === null || locatiodId === void 0 ? void 0 : locatiodId.id } },
                                reason: consultationReasons,
                            },
                        });
                        appointmentsIds.push({ id });
                    }
                }
                return appointmentsIds;
            }
            catch (error) {
                if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                    winston_logger_1.default.info('Prisma error:', error);
                    if (prismaErrorsCodes_utils_1.prismaErrorsCodes404.includes(error.code))
                        throw new PrismaErrorHandler_middleware_1.default(error.message, 404);
                    if (prismaErrorsCodes_utils_1.prismaErrorsCodes400.includes(error.code))
                        throw new PrismaErrorHandler_middleware_1.default(error.message, 400);
                    throw new PrismaErrorHandler_middleware_1.default(error.message, 500);
                }
                throw ApiError_middlewares_1.ApiError.Internal('Error unknown in Prisma');
            }
        });
    }
}
exports.Appointments = Appointments;
