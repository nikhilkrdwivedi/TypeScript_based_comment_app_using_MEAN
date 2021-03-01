
import { Request, Response } from 'express'
import db from '../db'
import { v4 as uuidv4 } from 'uuid'

export async function postComment(req: Request, res: Response) {
    try {
        const { comment } = req.body
        const userId = req.header('user_id')

        if (!comment && !comment.length) {
            return res.status(400).json({ errorMsg: "comment is missing" })
        }

        try {
            const resComment = await db.query(`INSERT INTO comments (user_id, comment,comment_id) VALUES ('${userId}','${comment}','${uuidv4()}');`)
            return res.status(200).json({ successMsg: "comment addedd" })
        } catch (error) {
            return res.status(400).json({ errorMsg: "comment has not posted" })
        }
    } catch (error) {
        return res.status(500).json({ errorMsg: "Internal Server Error !!!" })

    }
}
export async function getComments(req: Request, res: Response) {

    try {
        const data = await db.query(
            `SELECT comments.user_id, comments.comment, comments.comment_id ,comments.created_at,user.user_email,
         CONCAT(user.first_name , ' ' , user.last_name) AS full_name
         FROM comments INNER JOIN user ON comments.user_id=user.user_id ORDER BY comments.created_at;`
        )
        return res.status(200).json({
            successMsg: "returning list containing count and comments",
            data: [{
                comments: data,
                count: data.length
            }]
        })
    } catch (error) {
        return res.status(500).json({ errorMsg: "Internal Server Error" })
    }

}

export async function deleteComment(req: Request, res: Response) {

    try {
        const { commentId } = req.params
        const userId = req.header('user_id')

        if (!commentId && !commentId.length) {
            return res.status(400).json({ errorMsg: "comment_id is missing" })
        }

        try {
            const resComment = await db.query(`DELETE FROM comments where comment_id  = '${commentId}' and user_id  = '${userId}';`)
            return res.status(200).json({ successMsg: "comment deleted", data: [resComment] })
        } catch (error) {
            return res.status(400).json({ errorMsg: "comment has not deleted" })
        }

    } catch (error) {
        return res.status(500).json({errorMsg: "Internal Server Error !!!"})
    }
}

export default { getComments, postComment, deleteComment }