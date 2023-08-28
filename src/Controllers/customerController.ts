import bcrypt from 'bcryptjs'
import { CustomerInstance } from '../models/customerModel'
import { Request, Response, NextFunction } from 'express'
import { customerSchema } from '../utils/validation'
import { CustomerAttributes } from '../Interfaces/customerInterface'
import jwt from 'jsonwebtoken'
import { generate } from 'short-uuid'
import { config } from 'dotenv'
const JWT_SECRET = process.env.JWT_SECRET as string;


//=========================REGISTER CUSTOMER=========================================================
export const createCustomer = async (
    req: Request,
    res: Response,
    next: NextFunction) => {
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
        const existingCustomer = (await CustomerInstance.findOne({
            where: { email: email },
        })) as unknown as CustomerAttributes;

        if (existingCustomer) {
            return res.status(400).json({
                error: "User with the given email already exists",
            });
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const uuid = generate()
        const registerCustomer = (await CustomerInstance.create({
            id: uuid,
            firstName: firstName,
            lastName: lastName,
            password: hashedPassword,
            email: email,
            phone: phone
        })) as unknown as CustomerAttributes;

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
//=========================LOGIN CUSTOMER=================================================================
export const loginCustomer = async (
    req: Request,
    res: Response,
    next: NextFunction) => {
    try {
        const {
            email,
            password
        } = req.body
        // check if email exists
        const existingCustomer = (await CustomerInstance.findOne({
            where: { email: email },
        })) as unknown as CustomerAttributes;

        if (!existingCustomer) {
            return res.status(404).json({
                error: "Wrong email or password"
            })
        }
        // check if password is correct
        const checkPassword = await bcrypt.compare(password, existingCustomer.password)
        if (!checkPassword) {
            return res.status(403).json({
                error: "Email or password is incorrect"
            })
        }
        const payload = {
            id: existingCustomer.id,
            firstName: existingCustomer.firstName,
            lastName: existingCustomer.lastName,
            email: existingCustomer.email,
            phone: existingCustomer.phone
        }
        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' })
        return res.status(200).json({
            message: " Customer logged in successfully",
            Token: token
        })
    } catch (error) {
        return res.status(500).json({
            Error: "Internal server error",
            error
        });
    }

}
