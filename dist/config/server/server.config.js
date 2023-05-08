"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.Server = void 0;
const express_1 = __importDefault(require("express"));
const http = __importStar(require("http"));
const middlewares_config_1 = __importDefault(require("../middlewares/middlewares.config"));
const routes_config_1 = __importDefault(require("../routes/routes.config"));
const errorHandler_middlewares_1 = __importDefault(require("../middlewares/errorHandler/errorHandler.middlewares"));
const winston_logger_1 = __importDefault(require("../logger/winston.logger"));
class Server {
    constructor(port) {
        this.port = port;
        this.express = (0, express_1.default)();
        (0, middlewares_config_1.default)(this.express);
        (0, routes_config_1.default)(this.express);
        this.express.use(errorHandler_middlewares_1.default);
        this.httpServer = http.createServer(this.express);
    }
    listen() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => {
                this.httpServer.listen(this.port, () => {
                    winston_logger_1.default.info(`🚀 Server running on port ${this.port}`);
                    winston_logger_1.default.info('Press ctrl + c to stop');
                    resolve(this.httpServer);
                });
            });
        });
    }
    getHTTPServer() {
        return this.httpServer;
    }
    stop() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                if (this.httpServer) {
                    this.httpServer.close((error) => {
                        if (error) {
                            return reject(error);
                        }
                        return resolve();
                    });
                }
                resolve();
            });
        });
    }
}
exports.Server = Server;
