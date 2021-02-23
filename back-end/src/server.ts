import e from 'express'
import express, {Application,Request,Response,NextFunction} from 'express'
const app: Application = express()
app.get('/',(req:Request, res:Response,next: NextFunction)=>{
    res.send({
        data:'A big Hi from AIF Matrix'
    })
})
app.listen(3000,()=>{
    console.log(`Server is running at port ${3000}`)
})