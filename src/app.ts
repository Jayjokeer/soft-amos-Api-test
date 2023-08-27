import 'reflect-metadata'
import express from 'express'
import morgan from 'morgan'
import { AppDataSource } from './DB/data-source'
import { config } from 'dotenv'

const app = express()
config()
const PORT = process.env.PORT || 4000

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan('dev'))


AppDataSource.initialize().then(async () => {
    app.listen(PORT, () => {
        console.log(`App running on ${PORT}`);
    });
}).catch((error) => {
    console.log(error)
});