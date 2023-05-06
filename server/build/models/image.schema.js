"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const imageSchema = new mongoose_1.Schema({
    prompt: {
        type: String,
        require: true,
    },
    imageUrl: {
        type: String,
        require: true,
    },
}, {
    timestamps: true,
});
const Image = (0, mongoose_1.model)('images', imageSchema);
exports.default = Image;
//# sourceMappingURL=image.schema.js.map