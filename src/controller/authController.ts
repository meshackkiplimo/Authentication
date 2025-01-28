import (Request, Response) from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { User } from '../models/user'
import joi from 'joi'
import { validationResult } from 'express-validator'


export const signup = async (req:Request,res:Response) =>{
    
   try {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        res.status(400).json({errors:errors.array()})
        return
    }
    const {name,email,password} = req.body
    const existingUser  = await User.findOne({email})
    if(existingUser){
        res.status(400).json({message:"user already registerd"})
        return
    }
    const user = await User.create ({
        name,
        email,
        password,
    })

    const token = jwt.sign(
       { id:user._id},
       JWT_SECRET,
       {expiresIn:"1d"}



    )
    res.status(200).json({

        message:"user created succesfully",
        user:{
            id:user._id,
            name=user.name,

            email:user.email
            
        },
        token
    })


    
   } catch (error) {
    console.log(error)
    res.status(500).json({message:"something went wrong"})
    return
    
   }


}

 export  const login = async(req:Request,res:Response)=>{
    try {
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            res.status(400).json({errors:errors.array()})
            return
        }
        const {email,password} = req.body
        const user = await User.findOne({email})
        if(!user){
            res.status(400).json({message:"user not registerd"})
            return
        }
        const isValid = await user.comparepassword(password)
        if(!isValid){
            res.status(400).json({message:"invalid credentials"})
            return
        }
        const token = jwt.sign(
            {id:user:_id},
            JWT_SECRET,
            {expiresIn:"1d"}
        )
       res.status(200).json({
        message:"user loged in" ,
        user:{
            id:user._id,
            name:user.name,
            email:user.email
        } ,
        token
    
    
    })

        
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"something is  wong"})
        
    }
}

