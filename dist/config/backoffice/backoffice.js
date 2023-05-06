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
exports.Backoffice = void 0;
const server_config_1 = require("../server/server.config");
const dotenv_config_1 = __importDefault(require("../dotenv/dotenv.config"));
class Backoffice {
    start() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            this.server = new server_config_1.Server(+dotenv_config_1.default.PORT);
            return (_a = this.server) === null || _a === void 0 ? void 0 : _a.listen();
        });
    }
    get httpServer() {
        var _a;
        return (_a = this.server) === null || _a === void 0 ? void 0 : _a.getHTTPServer();
    }
    stop() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            return (_a = this.server) === null || _a === void 0 ? void 0 : _a.stop();
        });
    }
}
exports.Backoffice = Backoffice;
