import express, { Request, Response, NextFunction } from 'express'
import db from '../db'
import utility from '../utility'

export async function login(req: Request, res: Response) {
    try {
        const { email, password } = req.body
        const { error } = await utility.loginValidation(req.body)

        if (error) {
            return res.status(400).json({ errorMsg: error.details[0].message })
        }

        try {
            const user = await db.query(`SELECT * from user where user_email = '${email}';`)

            if (user && user.length) {

                if (email === user[0].user_email && password === user[0].password) {
                    user[0].password = undefined
                    return res.status(200).json({ successMsg: "successfully login", data: user })
                } else {
                    return res.status(400).json({ errorMsg: "email/password is not matching" })
                }

            } else {
                return res.status(400).json({ errorMsg: "user not found" })
            }

        } catch (error) {
            return res.status(400).json({ errorMsg: error.sqlMessage })
        }
    } catch (error) {
        return res.status(500).json({ errorMsg: "Internal Server Error" })
    }
}
export async function getComments(req: Request, res: Response) {

   try {

    const data = await db.query('SELECT * FROM user_blogs')
    return res.status(200).json({
        successMsg: "This is sample api testing data.",
        count: data.length,
        data: data
    })

   } catch (error) {

    res.status(500).json({errorMsg: "Internal server error" })

   }

}
export default { getComments, login }