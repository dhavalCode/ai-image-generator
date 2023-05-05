"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
// config
const config_1 = require("./config/config");
const dbConnect_1 = __importDefault(require("./config/dbConnect"));
// routes
const image_route_1 = require("./routes/image.route");
exports.app = (0, express_1.default)();
const port = 8080;
// checking environment variables
(0, config_1.validateEnv)();
// establish db connection
(0, dbConnect_1.default)();
exports.app.disable('x-powered-by');
exports.app.use(express_1.default.json());
// app.use(express.static('public'))
exports.app.use((0, cors_1.default)());
exports.app.use('/api/image', image_route_1.imageRouter);
exports.app.use('/health', (req, res) => res.json({ message: ' Server is running...' }));
// app.use(errorHandler)
exports.app.listen(port, () => {
    console.log(`🚀 Server running at http://localhost:${port}`);
});
//# sourceMappingURL=app.js.map