import { Router } from 'express'
import {
    createCustomer,
    loginCustomer
} from '../Controllers/customerController'
const customerRouter = Router()

//=============================CUSTOMER ROUTES============================
customerRouter.post('/create-customer', createCustomer)
customerRouter.post('/login', loginCustomer)

export default customerRouter