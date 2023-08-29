import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { customerPayload } from '../Interfaces/customerPayload';
const JWT_SECRET = process.env.JWT_SECRET as string


//Compare the password
export const checkPassword =async (password1:string,password2:string) => {
    const verifiedPassword= await bcrypt.compare(password1, password2);
     return verifiedPassword;
 };
//Sign the JWT
 export const createSignature =(payload:customerPayload)=>{
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
    return token;
 };
 // Hash the password
 export const encrpytPassword= async (password:string)=>{
    const hashedPwd = await bcrypt.hash(password, 10);
    return hashedPwd;
 };
