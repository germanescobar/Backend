"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dateformatter = (date) => {
    const newDate = new Date(date);
    return `${newDate.getUTCDate()}/${newDate.getUTCMonth() + 1}/${newDate.getUTCFullYear()}`;
};
exports.default = dateformatter;
