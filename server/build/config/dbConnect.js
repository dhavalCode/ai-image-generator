"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbConnect = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("./config");
// mongodb connection
const dbConnect = () => {
    mongoose_1.default
        .connect(config_1.config.databaseUrl, {})
        .then(() => console.log(`Database Connected Successfully`))
        .catch((err) => {
        console.log('Database Connection error => ', err);
        process.exit(1);
    });
};
exports.dbConnect = dbConnect;
//# sourceMappingURL=dbConnect.js.map