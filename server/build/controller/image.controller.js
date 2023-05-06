"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateImage = exports.fetchAllImages = void 0;
const config_1 = require("../config/config");
const image_service_1 = require("../service/image.service");
const responseHandler_1 = __importDefault(require("../utils/responseHandler"));
const openai_1 = require("openai");
const fetchAllImages = async (_req, res) => {
    try {
        const page = _req.query['page'] || 1;
        const limit = _req.query['limit'] || 8;
        const skip = Number(limit) * (Number(page) - 1);
        const images = await (0, image_service_1.findAllImages)(+limit, skip);
        responseHandler_1.default.success(res, images);
    }
    catch (error) {
        // console.log('Error :', error)
        responseHandler_1.default.serverError(res, error);
    }
};
exports.fetchAllImages = fetchAllImages;
const generateImage = async (req, res) => {
    const { prompt, size } = req.body;
    if (!prompt || prompt === '') {
        responseHandler_1.default.badRequest(res, '', 'Prompt is required.');
    }
    let imageSize;
    switch (size) {
        case 'Small':
            imageSize = openai_1.CreateImageRequestSizeEnum._256x256;
            break;
        case 'Medium':
            imageSize = openai_1.CreateImageRequestSizeEnum._512x512;
            break;
        case 'Large':
            imageSize = openai_1.CreateImageRequestSizeEnum._1024x1024;
            break;
        default:
            imageSize = openai_1.CreateImageRequestSizeEnum._256x256;
            break;
    }
    try {
        const aiResponse = await config_1.openai.createImage({
            prompt,
            n: 1,
            size: imageSize,
        });
        const image = aiResponse.data.data[0].url;
        if (!image) {
            responseHandler_1.default.serverError(res, '', 'Something went wrong while generating image');
        }
        const uploadedImage = await config_1.cloudinary.uploader.upload(image || '');
        await (0, image_service_1.createImage)({
            imageUrl: uploadedImage.url,
            prompt,
        });
        responseHandler_1.default.created(res, { imageUrl: uploadedImage.url });
    }
    catch (error) {
        // console.log('Error :', error)
        responseHandler_1.default.serverError(res, error);
    }
};
exports.generateImage = generateImage;
//# sourceMappingURL=image.controller.js.map