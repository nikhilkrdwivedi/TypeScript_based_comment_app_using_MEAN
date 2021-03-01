import express, { Application, Request, Response, NextFunction, Router } from 'express'
import fileUpload from 'express-fileupload'
import cors from 'cors';
import router from './router';
import {config} from './config'
const app: Application = express()

//middleware
app.use(express.json());
app.use(fileUpload({limits: { fileSize: 50 * 1024 * 1024 }}));
let corsOptions = {origin: 'http://localhost:4200',optionsSuccessStatus: 200}
app.use(cors(corsOptions));

//routes
app.use('/', router)

//test api
app.get('/', (req: Request, res: Response, next: NextFunction) => {
    return res.status(200).send({successMsg: 'A big Hi from AIF Matrix'})
})


//run server
app.listen(config.port || 3000, () => {
    console.log(`Server is running at port ${config.port}`)
})