//VALIDATION 
import Joi from '@hapi/joi';
import  {  Request, Response, NextFunction } from 'express'
import db from '../db';
//Register validaion
const registerValidation = async (data:any) => {
    const schema = Joi.object({
        firstName: Joi.string().min(2).required(),
        lastName: Joi.string().min(2).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(4).required(),
        contact: Joi.string().max(10).min(10).required()
    });
    return schema.validate(data);
}

//login validation
const loginValidation = async (data:any) => {
    const schema = Joi.object({
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(4).required()
    });
    return schema.validate(data);
}
// module.exports.registerValidation = registerValidation
// module.exports.loginValidation = loginValidation

const verifyRequest = async (req:Request, res:Response, next:NextFunction) => {
    // console.log("req.header",req);
    const userId = req.header('user_id');
    // console.log("token", token)
    if (!userId) return res.status(401).json({errorMsg: "Access Denied", data: []});
    // try {
    //     const verified = verify(token, process.env.TOKEN_SECRET);
    //     req.userCxt = verified.userCxt;
    //     console.log("req.Cxt: ", req.userCxt)
    //     return next();
    // } catch (error) {
    //     res.status(400).send('Invalid Token!!');
    // }
    try {
        const user = await db.query(`SELECT user_id from user where user_id = '${userId}';`)
        if (user && user.length) {
            if (userId === user[0].user_id) {
                next();
            } else {
                return res.status(400).json({
                    errorMsg: "user_id is missing/wrong",
                    successMsg: "",
                    data: []
                })
            }
        } else {
            return res.status(400).json({
                errorMsg: "bad request",
                successMsg: "",
                data: []
            })
        }
    } catch (error) {
        console.log('err ', error.sqlMessage)
        return res.status(400).json({
            errorMsg: error.sqlMessage,
            data: []
        });
    }
}
export default {registerValidation,loginValidation,verifyRequest}