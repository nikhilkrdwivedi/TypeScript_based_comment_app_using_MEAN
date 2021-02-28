import express, { Application, Request, Response, NextFunction,Router } from 'express'
import fileUpload from 'express-fileupload'
// import cors from 'cors';
const cors = require('cors');
import excelToJson from 'convert-excel-to-json';
import router from './router';
import path from 'path'
// let __dirname = path.resolve(path.dirname(''));
import pool from './db';
const app: Application = express()
app.use(express.json());
app.use(fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
}));
var corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }
app.use(cors(corsOptions));

app.use('/', router)
app.get('/', 
async (req: Request, res: Response, next: NextFunction) => {
    const data = await pool.query('SELECT * FROM user_blogs');
    console.log(data[0]['id'])
    console.log(data[0]['name'])
    res.send({
        data: 'A big Hi from AIF Matrix',
        dataa: data
    })
})

app.post('/upload', async function (req, res) {
    let sampleFile;
    let uploadPath: string;

    if (!req.files || Object.keys(req.files).length === 0) {
        res.status(400).send('No files were uploaded.');
        return;
    }

    console.log('req.files >>>', req.files); // eslint-disable-line

    sampleFile = req.files.formFile as fileUpload.UploadedFile;

    uploadPath = __dirname + '/uploads/' + sampleFile.name;
    console.log('uploadPath ', uploadPath)
    sampleFile.mv(uploadPath, function (err) {
        if (err) {
            return res.status(500).send(err);
        }

        const result = excelToJson({
            sourceFile: uploadPath
        });
        console.log('res ', result)
        res.send('File uploaded to ' + uploadPath);
    });
});
app.listen(3000, () => {
    console.log(`Server is running at port ${3000}`)
})