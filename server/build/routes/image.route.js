"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imageRouter = void 0;
const express_1 = require("express");
const image_controller_1 = require("../controller/image.controller");
exports.imageRouter = (0, express_1.Router)();
exports.imageRouter.get('/all', image_controller_1.fetchAllImages);
exports.imageRouter.post('/generate', image_controller_1.generateImage);
//# sourceMappingURL=image.route.js.map