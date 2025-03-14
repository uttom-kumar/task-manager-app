import jwt from 'jsonwebtoken'
import { JWT_EXPIRE_TIME, JWT_KEY } from './../config/config.js';

export const EncodedToken = (email,user_id) => {
    let KEY = JWT_KEY
    let EXPIRE  = {expiresIn: JWT_EXPIRE_TIME}
    let PAYLOAD = {
        email : email,
        user_id : user_id
    }
    return  jwt.sign(PAYLOAD, KEY, EXPIRE)
}


export const DecodedToken = (token) => {
    try{
        return jwt.verify(token, JWT_KEY)
    }
    catch(err){
        return null
    }
}