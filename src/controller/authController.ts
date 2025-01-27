import (Request, Response) from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { User } from '../models/user'
import joi from 'joi'
import { validationResult } from 'express-validator'


const signup = async (req:Request,res:Response) =>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        res.status(400).json({errors:errors.array()})
        return
    }
    


}

