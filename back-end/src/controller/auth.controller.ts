/**
 @author Nikhil Kumar
 @date    09 Aug 2020
*/
import { Resolver } from 'dns';
import express, { Application, Request, Response, NextFunction } from 'express'
import db from '../db';
import utility from '../utility';

export async function login(req: Request, res: Response) {
    try {
        const { email, password } = req.body
        const { error } = await utility.loginValidation(req.body);
        if (error) {
            return res.status(400).json({
                errorMsg: error.details[0].message,
                successMsg: "",
                data: []
            })
        }
        try {
            const user = await db.query(`SELECT * from user where user_email = '${email}';`)
            if (user && user.length) {
                if (email === user[0].user_email && password === user[0].password) {
                    user[0].password = undefined
                    return res.status(200).json({
                        errorMsg: "",
                        successMsg: "successfully login",
                        data: user
                    })
                } else {
                    return res.status(400).json({
                        errorMsg: "email/password is not matching",
                        successMsg: "",
                        data: []
                    })
                }
            } else {
                return res.status(200).json({
                    errorMsg: "user not found",
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
    } catch (error) {
        return res.status(500).json({
            errorMsg: "Internal Server Error",
            successMsg: "",
            data: []
        });
    }
}
export async function getComments(req: Request, res: Response) {
    // const data = await TestModel.find({})
    console.log('okaa')
    const data = await db.query('SELECT * FROM user_blogs');
    return res.status(200).json({
        message: "This is sample api testing data.",
        count: data.length,
        data: data
    })

}
export default { getComments, login };