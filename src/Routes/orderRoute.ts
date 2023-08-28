import { Router } from 'express'
import {
    getOrders,
    createOrder,
    getOrderByPrice
} from '../Controllers/orderController'
import { authorizeCustomer } from '../Middleware/authorization'
const orderRouter = Router()

orderRouter.post('/create-order', authorizeCustomer, createOrder)
orderRouter.get('/get-order', authorizeCustomer, getOrders)
orderRouter.get('/get-by-price', authorizeCustomer, getOrderByPrice)
export default orderRouter