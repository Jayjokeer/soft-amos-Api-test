import { Request, Response, NextFunction } from 'express'
import { orderSchema } from '../utils/validation'
import { generate } from 'short-uuid'
import { OrderInstance } from '../models/orderModel'
import { JwtPayload } from 'jsonwebtoken'

//================================ Create Order================================
export const createOrder = async (
    req: JwtPayload,
    res: Response,
) => {
    try {
        const { error } = orderSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        const {
            totalAmount,
            orderNumber
        } = req.body

        const { id } = req.user
        const uuid = generate()
        const newOrder = await OrderInstance.create({
            id: uuid,
            customerId: id,
            orderNumber: orderNumber,
            totalAmount: totalAmount
        })

        return res.status(201).json({
            message: "Order created successfully",
            order: newOrder
        })
    } catch (error) {
        return res.status(500).json({
            Error: "Internal server error",
            error
        });
    }
}

//============================= GET ORDERS ==========================================
export const getOrders = async (
    req: JwtPayload,
    res: Response,
) => {
    try {
        const page = req.query.page || 1;
        const limit = 5;
        const offset = (page - 1) * limit;
        const { id } = req.user;


        const orders = await OrderInstance.findAndCountAll({
            where: { customerId: id },
            limit,
            offset,
        });
        return res.status(200).json({
            message: "Orders retrieved successfully",
            Orders: orders
        })
    } catch (error) {
        return res.status(500).json({
            Error: "Internal server error",
            error
        });
    };
};

//============================= GET ORDER SORTED BY PRICE=======================================
export const getOrderByPrice = async (
    req: JwtPayload,
    res: Response,
) => {
    try {
        const { id } = req.user
        const { q } = req.params
        const orders = await OrderInstance.findAll({
            where: { customerId: id },
            order: [['totalAmount', `${q}`]]
        })

        return res.status(200).json({
            message: "Orders fetched successfully",
            Orders: orders
        })
    } catch (error) {
        return res.status(500).json({
            Error: "Internal server error",
            error
        });
    };
};