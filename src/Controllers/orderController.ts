import { Request, Response, NextFunction } from 'express'
import { orderSchema } from '../utils/validation'
import { generate } from 'short-uuid'
import { OrderInstance } from '../models/orderModel'
import { JwtPayload } from 'jsonwebtoken'
import { createOrderService, getOrderService,getOrderByPriceService } from '../services/order.services'
import { OrderAttributes } from '../Interfaces/orderInterface'

//================================ Create Order================================
export const createOrder = async (
    req: JwtPayload,
    res: Response,
) => {
    try {
        const { error } = orderSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        };
        const {
            totalAmount,
            orderNumber
        } = req.body;

        const {id}  = req.user;
        const uuid = generate();

        const payload:OrderAttributes = {
            id: uuid,
            customerId: id,
            orderNumber: orderNumber,
            totalAmount: totalAmount
        };
        const newOrder = await createOrderService(payload);

        return res.status(201).json({
            message: "Order created successfully",
            order: newOrder
        });
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
        const limit:any =  5;
        // const limit:any = req.query.limit > 5 ? 5 : req.query.limit;
        const offset:any = (page - 1) * limit;
        const id : string = req.user.id;

        const orders = await getOrderService(limit,offset,id)
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
        const id :string= req.user.id

        const q = req.query.q || "ASC";
        
        const orders = await getOrderByPriceService(id,q)
        
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
