import { Request, Response } from 'express'
import db from '../db'
import { v4 as uuidv4 } from 'uuid'
import fileUpload from 'express-fileupload'
import excelToJson from 'convert-excel-to-json'
import path from 'path'
let reqPath = path.join(__dirname, '../')

export async function bulkUserUpload(req: Request, res: Response) {
    try {
        let sampleFile
        let uploadPath: string

        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).json({errorMsg: 'File is missing'}) 
        }

        sampleFile = req.files.UserList as fileUpload.UploadedFile 
        uploadPath = reqPath + '/uploads/' + sampleFile.name 
        sampleFile.mv(uploadPath, async function (err) {

            if (err) {
                return res.status(500).json({errorMsg: 'No files were uploaded.'}) 
            }

            let excelToJsonData = excelToJson({
                sourceFile: uploadPath,
                header: {
                    rows: 1
                },
                columnToKey: {A: 'First Name',B: 'Last Name',C: 'Email',D: 'Password',E: 'Mobile country code',F: 'Mobile'}
            }) 

            let correctRowArray: any[] = []
            for (let i = 0; i < excelToJsonData['Userlist'].length; i++) {
                let tempRow = Object.values(excelToJsonData['Userlist'][i])
                tempRow.push(uuidv4())
                correctRowArray.push(tempRow.map(String))
            }

            try {
                let stmt = "INSERT INTO user (first_name,last_name,user_email,password,mobile_country_code,mobile_number,user_id) VALUES ?"
                let data = await db.query(stmt, [correctRowArray])
                return res.status(200).json(excelToJsonData)
            } catch (error) {
                return res.status(400).json({errorMsg: 'Error occurred while uploading to db' + error.sqlMessage})
            }

        })
    } catch (error) {
        return res.status(500).json({errorMsg: 'Internal Server Error'})
    }
}
export default { bulkUserUpload }