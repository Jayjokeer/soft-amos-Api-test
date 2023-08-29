import bcrypt from 'bcryptjs'
import { CustomerInstance } from '../models/customerModel'
import { Request, Response, NextFunction } from 'express'
import { customerSchema } from '../utils/validation'
import { CustomerAttributes } from '../Interfaces/customerInterface'
import jwt from 'jsonwebtoken'
import { generate } from 'short-uuid'
import { config } from 'dotenv'
import { checkEmail, createCustomerService } from '../services/customer.service'
import {checkPassword, createSignature, encrpytPassword} from '../utils/helpers'
import { customerPayload } from '../Interfaces/customerPayload'
const JWT_SECRET = process.env.JWT_SECRET as string;


//=========================REGISTER CUSTOMER=========================================================
export const createCustomer = async (
    req: Request,
    res: Response,
    ) => {
    try {
        // validate req.body using JOI
        const { error } = customerSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const {
            firstName,
            lastName,
            password,
            email,
            phone
        } = req.body

        // Check if user exists
        // const existingCustomer = (await CustomerInstance.findOne({
        //     where: { email: email },
        // })) as unknown as CustomerAttributes;
        const existingCustomer = await checkEmail(email)
        if (existingCustomer) {
            return res.status(400).json({
                error: "User with the given email already exists",
            });
        }

        const hashedPassword = await encrpytPassword(password)
        const uuid = generate()

        const customers = {
        id: uuid,
        firstName: firstName,
        lastName: lastName,
        password: hashedPassword,
        email: email,
        phone: phone
        }

        const registerCustomer = await createCustomerService(customers)

        return res.status(201).json({
            message: "Customer created successfully",
            registerCustomer
        })
    } catch (error) {
        return res.status(500).json({
            Error: "Internal server error",
            error
        });

    }


}
//==============================LOGIN CUSTOMER=================================================================
export const loginCustomer = async (
    req: Request,
    res: Response,
    ) => {
    try {
        const {
            email,
            password
        } = req.body

        if(!email || !password){
            return res.status(403).json({
                Error:" Fields cannot be empty"
            })
        }
        // check if email exists
        const existingCustomer = await checkEmail(email)
        if (!existingCustomer) {
            return res.status(404).json({
                error: "Wrong email or password"
            })
        }

        // check if password is correct
        const verifyPassword = await checkPassword(password, existingCustomer.password)

        if (!verifyPassword) {
            return res.status(403).json({
                error: "Email or password is incorrect"
            })
        }

        const payload:customerPayload = {
            id: existingCustomer.id,
            firstName: existingCustomer.firstName,
            lastName: existingCustomer.lastName,
            email: existingCustomer.email,
            phone: existingCustomer.phone
        }
        const token = createSignature(payload)

        return res.status(200).json({
            message: " Customer logged in successfully",
            Token: token,
            Customer:existingCustomer
        })
    } catch (error) {
        return res.status(500).json({
            Error: "Internal server error",
            error
        });
    }

}
