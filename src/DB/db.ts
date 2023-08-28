import { Sequelize } from "sequelize";
import { config } from "dotenv";
config();


export const db = new Sequelize(
    process.env.DB_NAME as string,
    process.env.DB_USERNAME as string,
    process.env.DB_PASSWORD as string,
    {
        host: process.env.DB_HOST,
        port: 3306,
        dialect: "mysql",
        logging: false,
        // dialectOptions: { encrypt: true, ssl: { rejectUnauthorized: false } },
    }
);

export const connectDB = async () => {
    try {
        await db.authenticate();
        await db.sync();
        console.log("Connection established successfully");
    } catch (error) {
        console.log("Unable to connect to database:", error);
    }
};