import { OrderInstance } from '../models/orderModel'
import { OrderAttributes } from '../Interfaces/orderInterface'

export const createOrderService=async (payload:OrderAttributes)=>{
   const order =  await OrderInstance.create(payload)
   return order;
};

export const getOrderService = async(limit:any,offset:any,id:string)=>{
    const orders = await OrderInstance.findAll({
    where: { customerId: id },
    limit,
    offset,
        });
    return orders;
};

export const getOrderByPriceService = async(id:string,q:any)=>{
    const orders = await OrderInstance.findAll({
        where: { customerId: id },
        order: [['totalAmount', q]]
    });
    return orders;
}