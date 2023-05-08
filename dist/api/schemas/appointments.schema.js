"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const appointment = joi_1.default.array().items(joi_1.default.object({
    id: joi_1.default.string().uuid().required(),
    patientData: joi_1.default.object({
        patientName: joi_1.default.string().required(),
        patientLastname: joi_1.default.string().required(),
        patientId: joi_1.default.string().required(),
        patientEmail: joi_1.default.string().email().required(),
        patientPhone: joi_1.default.string().required(),
        isAdult: joi_1.default.boolean().required(),
        patientGender: joi_1.default.string().required(),
        patientBirth: joi_1.default.string().required(),
    }),
    appointmentData: joi_1.default.object({
        specialitySelected: joi_1.default.object({
            id: joi_1.default.string().required(),
            specialityName: joi_1.default.string().required(),
        }).required(),
        preferredDoctorSelected: joi_1.default.object({
            id: joi_1.default.string().required(),
            doctorName: joi_1.default.string().required(),
        }).required(),
        countrySelected: joi_1.default.string().required(),
        citySelected: joi_1.default.string().required(),
        appointmentDate: joi_1.default.string().required(),
        appointmentTime: joi_1.default.string().required(),
        consultationReasons: joi_1.default.string().required(),
        appointmentPrice: joi_1.default.number().required(),
    }),
}));
exports.default = appointment;
