import { Router } from 'express'
import {
    createCustomer,
    loginCustomer
} from '../Controllers/customerController'
const customerRouter = Router()

customerRouter.post('/create-customer', createCustomer)
customerRouter.post('/login', loginCustomer)

export default customerRouter