"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const busboy_1 = __importDefault(require("busboy"));
const cloudinary_config_1 = __importDefault(require("../../config/cloudinary/cloudinary.config"));
const ApiError_middlewares_1 = require("../../config/middlewares/errorHandler/ApiError.middlewares");
const constants_utils_1 = require("../utils/constants.utils");
const formData = (preset, folderName) => {
    return (req, res, next) => {
        const bb = (0, busboy_1.default)({ headers: req.headers });
        let uploadingCount = 0;
        let uploadingFile = false;
        const done = () => {
            if (uploadingFile)
                return;
            if (uploadingCount)
                return;
            next();
        };
        bb.on('field', (key, value) => {
            if (constants_utils_1.OBJ_FORM_DATA.includes(key)) {
                req.body[key] = JSON.parse(value);
            }
            else {
                req.body[key] = value;
            }
        });
        bb.on('file', (key, stream) => {
            uploadingFile = true;
            uploadingCount++;
            const cloud = cloudinary_config_1.default.uploader.upload_stream({ upload_preset: preset, folder: folderName }, (error, response) => {
                if (error)
                    next(ApiError_middlewares_1.ApiError.Internal('Cloudinary Error'));
                req.body[key] = response === null || response === void 0 ? void 0 : response.secure_url;
                uploadingFile = false;
                uploadingCount--;
                done();
            });
            stream.on('data', (data) => cloud.write(data));
            stream.on('end', () => cloud.end());
        });
        bb.on('finish', () => done());
        req.pipe(bb);
    };
};
exports.default = formData;
