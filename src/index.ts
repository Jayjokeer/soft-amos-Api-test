import express from 'express';
import morgan from 'morgan';
import { config } from 'dotenv';
import { connectDB } from './DB/db';
import customerRouter from './Routes/customerRoute';
import orderRouter from './Routes/orderRoute';

const app = express();
config();
connectDB();
const PORT = process.env.PORT || 9004;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan('dev'));

//Routes
app.use('/api/v1/auth', customerRouter);
app.use('/api/v1/orders', orderRouter);

app.listen(PORT, () => {
    console.log(`App running on ${PORT}`);
});