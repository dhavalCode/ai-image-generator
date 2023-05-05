"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAllImages = exports.createImage = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createImage = async (input) => {
    const { imageUrl, prompt } = input;
    return prisma.image.create({
        data: {
            imageUrl,
            prompt,
        },
    });
};
exports.createImage = createImage;
const findAllImages = async (limit, offset) => {
    return prisma.image.findMany({
        skip: offset,
        take: limit,
        orderBy: { createdAt: 'desc' },
    });
};
exports.findAllImages = findAllImages;
//# sourceMappingURL=image.service.js.map