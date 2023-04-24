import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const dbConnect = async (): Promise<void> => {
    try {
        await prisma.$connect();
        console.log('Database connection established successfully');
    } catch (error) {
        console.error('Unable to establish database connection', error);
        process.exit(1);
    }
}

export default dbConnect