"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
// config
const config_1 = require("./config/config");
const dbConnect_1 = require("./config/dbConnect");
// routes
const image_route_1 = require("./routes/image.route");
// import { staticFileNames } from './config/staticFiles'
exports.app = (0, express_1.default)();
const port = 8080;
// checking environment variables
(0, config_1.validateEnv)();
// establish db connection
(0, dbConnect_1.dbConnect)();
exports.app.disable('x-powered-by');
exports.app.use(express_1.default.json());
// app.use(express.static('public'))
exports.app.use((0, cors_1.default)());
if (process.env.NODE_ENV == 'production') {
    exports.app.use((req, res, next) => {
        if (req.header('x-forwarded-proto') !== 'https') {
            res.redirect(`https://${req.header('host')}${req.url}`);
        }
        else {
            next();
        }
    });
}
exports.app.use('/api/image', image_route_1.imageRouter);
exports.app.use('/health', (req, res) => res.json({ message: ' Server is running...' }));
// static serve
exports.app.use(express_1.default.static(path_1.default.join(__dirname, '../../client', 'dist')));
exports.app.get('/*', (req, res) => {
    res.sendFile(path_1.default.resolve(__dirname, '../../client', 'dist', 'index.html'));
});
exports.app.listen(port, () => {
    console.log(`🚀 Server running at http://localhost:${port}`);
});
//# sourceMappingURL=app.js.map