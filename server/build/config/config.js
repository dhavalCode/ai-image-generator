"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cloudinary = exports.openai = exports.validateEnv = exports.config = void 0;
const joi_1 = __importDefault(require("joi"));
const dotenv_1 = require("dotenv");
const path_1 = __importDefault(require("path"));
const openai_1 = require("openai");
const cloudinary_1 = require("cloudinary");
(0, dotenv_1.config)({ path: path_1.default.join(__dirname, '../../.env') });
const envVarsSchema = joi_1.default.object()
    .keys({
    MONGODB_URL: joi_1.default.string().required().messages({ 'any.required': 'Provide Mongodb Url.' }),
    OPEN_AI_KEY: joi_1.default.string().required().messages({ 'any.required': 'Provide OpenAI key.' }),
    CLOUDINARY_CLOUD_NAME: joi_1.default.string().required().messages({ 'any.required': 'Provide cloudinary cloud name.' }),
    CLOUDINARY_API_KEY: joi_1.default.string().required().messages({ 'any.required': 'Provide cloudinary api key.' }),
    CLOUDINARY_API_SECRET: joi_1.default.string().required().messages({ 'any.required': 'Provide cloudinary api secret.' }),
})
    .unknown();
const { value: envVars, error } = envVarsSchema
    .prefs({ errors: { label: 'key' } })
    .validate(process.env);
if (error) {
    throw new Error(`### ENV Setup Error ####\n ${error.message}`);
}
exports.config = {
    databaseUrl: envVars.MONGODB_URL,
    openAiKey: envVars.OPEN_AI_KEY,
    cloudinary: {
        name: envVars.CLOUDINARY_CLOUD_NAME,
        apiKey: envVars.CLOUDINARY_API_KEY,
        apiSecret: envVars.CLOUDINARY_API_SECRET
    }
};
const validateEnv = () => {
    const { error } = envVarsSchema
        .prefs({ errors: { label: 'key' } })
        .validate(process.env);
    if (error) {
        throw new Error(`### ENV Setup Error ####\n ${error.message}`);
    }
};
exports.validateEnv = validateEnv;
// Open AI Setup
const configuration = new openai_1.Configuration({
    apiKey: exports.config.openAiKey,
});
exports.openai = new openai_1.OpenAIApi(configuration);
// Cloudinary Setup
cloudinary_1.v2.config({
    cloud_name: exports.config.cloudinary.name,
    api_key: exports.config.cloudinary.apiKey,
    api_secret: exports.config.cloudinary.apiSecret,
});
exports.cloudinary = cloudinary_1.v2;
//# sourceMappingURL=config.js.map