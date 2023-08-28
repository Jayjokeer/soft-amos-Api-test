import Joi from '@hapi/joi';
import { CustomerAttributes } from '../Interfaces/customerInterface';
import { NextFunction } from 'express';

export const customerSchema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required()
});

export const orderSchema = Joi.object({
    totalAmount: Joi.required(),
    orderNumber: Joi.string().required()
});


