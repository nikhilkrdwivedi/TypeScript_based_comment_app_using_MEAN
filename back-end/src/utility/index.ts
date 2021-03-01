
import Joi from '@hapi/joi'  
import  {  Request, Response, NextFunction } from 'express'
import db from '../db'  

//login validation
const loginValidation = async (data:any) => {
    const schema = Joi.object({
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(4).required()
    })  
    return schema.validate(data)  
}

//id user exists 
const verifyRequest = async (req:Request, res:Response, next:NextFunction) => {

    const userId = req.header('user_id')  
    if (!userId) return res.status(401).json({errorMsg: "Access Denied", data: []})  

    try {
        const user = await db.query(`SELECT user_id from user where user_id = '${userId}';`)
        if (user && user.length) {
            if (userId === user[0].user_id) {
                next()  
            } else {
                return res.status(400).json({ errorMsg: "user_id is missing/wrong" })
            }
        } else {
            return res.status(400).json({ errorMsg: "you can't perform this action" })
        }
    } catch (error) {
        return res.status(400).json({errorMsg: error.sqlMessage})  
    }
}
export default {loginValidation,verifyRequest}