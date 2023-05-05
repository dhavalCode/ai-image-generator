"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const dbConnect = async () => {
    try {
        await prisma.$connect();
        console.log('Database connection established successfully');
    }
    catch (error) {
        console.error('Unable to establish database connection', error);
        process.exit(1);
    }
};
exports.default = dbConnect;
//# sourceMappingURL=dbConnect.js.map