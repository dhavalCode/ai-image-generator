"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAllImages = exports.createImage = void 0;
const image_schema_1 = __importDefault(require("../models/image.schema"));
const createImage = async (input) => {
    const { imageUrl, prompt } = input;
    const newImage = new image_schema_1.default({
        imageUrl,
        prompt,
    });
    return newImage.save();
};
exports.createImage = createImage;
const findAllImages = async (limit, skip) => {
    return image_schema_1.default.find().skip(skip).limit(limit).sort({ createdAt: -1 }).exec();
};
exports.findAllImages = findAllImages;
//# sourceMappingURL=image.service.js.map