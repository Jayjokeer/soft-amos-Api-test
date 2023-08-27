import "reflect-metadata";
import { DataSource, DataSourceOptions } from "typeorm"
import { config } from "dotenv";
config()

const PORT = process.env.DB_PORT || 3306;

const HOST = process.env.DB_HOST;
const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;

export const AppDataSource = new DataSource({
    type: "mysql",
    port: 3306,
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_NAME,
    synchronize: true,
    logging: true,
})