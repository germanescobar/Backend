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
const locations_json_1 = __importDefault(require("./locations.json"));
const prisma = new client_1.PrismaClient();
const locationSeeder = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        for (const country of locations_json_1.default) {
            for (const city of country.locations) {
                const isLocation = yield getlocation(country.country);
                const { city: locationCity, address: locationAddress } = city;
                try {
                    if (!isLocation) {
                        const { id } = yield createLocation(country.country);
                        yield prisma.headquarter.create({
                            data: { city: locationCity, address: locationAddress, location: { connect: { id } } },
                        });
                    }
                    yield prisma.headquarter.create({
                        data: { city: locationCity, address: locationAddress, location: { connect: { id: isLocation === null || isLocation === void 0 ? void 0 : isLocation.id } } },
                    });
                }
                catch (error) {
                    winston_logger_1.default.info(error);
                    winston_logger_1.default.error(error);
                }
                winston_logger_1.default.info('The location seeder was completed succesfully.');
                yield prisma.$disconnect();
            }
        }
    }
    catch (error) {
        winston_logger_1.default.info(error);
        winston_logger_1.default.error(error);
        process.exit(1);
    }
});
function createLocation(country) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield prisma.location.create({
                data: { country },
            });
        }
        catch (error) {
            throw error;
        }
    });
}
function getlocation(country) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield prisma.location.findFirst({
                where: { country },
                select: { id: true },
            });
        }
        catch (error) {
            throw error;
        }
    });
}
locationSeeder();
