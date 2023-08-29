import { CustomerInstance } from '../models/customerModel'
import { CustomerAttributes } from '../Interfaces/customerInterface'


export const checkEmail =async(
    email:string
)=>{
    const existingCustomer = await (CustomerInstance.findOne({
        where: { email: email },
    })) as unknown as CustomerAttributes;

    return existingCustomer;
};


export const createCustomerService=async(
    customers:CustomerAttributes)=>{
    const registerCustomer = await ( CustomerInstance.create(
        customers
    )) as unknown as CustomerAttributes;
    return registerCustomer;
};

