import { Express } from "express";
import { Request, Response } from "express";


const app =     require('express')()
const PORT = 5000

app.get("/",(re:Request,res:Response)=>{
    res.send("hello world")
})

app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
})
