import jwt, { JwtPayload } from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
const JWT_SECRET = process.env.JWT_SECRET as string

//==================================== Authorize Customer========================================================
export const authorizeCustomer = (
    req: JwtPayload,
    res: Response,
    next: NextFunction
) => {
    try {
        const bearerHeader = req.headers.authorization
        if (!bearerHeader) {
            return res.status(401).json({
                error: "Kindly login"
            })
        }

        const bearerToken = bearerHeader?.split(' ')[1]
        if (!bearerToken) {
            return res.status(401).json({
                error: 'You are unauthorized'
            })
        }
        const verifiedUser = jwt.verify(bearerToken, JWT_SECRET)
        req.user = verifiedUser
        next()

    } catch (error) {
        return res.status(500).json({
            Error: "Internal server error",
            error
        });

    }
}