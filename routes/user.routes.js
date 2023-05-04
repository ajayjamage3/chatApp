const mongoose = require("mongoose")
const express = require("express")
const {UserModel} = require("../models/user.model")
const userRouter = express.Router()
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require("dotenv").config()
const {sendVerificationMail} = require("../middlewares/mail.mid")

userRouter.post("/register",async(req,res)=>{
    console.log(req.body)
    const {Username,Email,Password,} = req.body
    try {
        bcrypt.hash(Password,5,async(err,newPass)=>{
            if(err){
                console.log(err)
            }else{
                const user = new UserModel({Username,Email,Password:newPass})
                await user.save()
                sendVerificationMail(Email,Username)
                res.status(201).send({"msg":"User Created"})
            }
        })
    } catch (error) {
        console.log(error)
    }
})

userRouter.post("/login",async(req,res)=>{
    const {Email,Password} = req.body
    try {
        const user = await UserModel.find({Email})
        if(user.length>0){
            const pass = user[0].Password
            bcrypt.compare(Password,pass,(err,result)=>{
                if(err){
                    res.send({"msg":"Wrong password"})
                }else{
                    const token = jwt.sign({userId:user[0]},process.env.key)
                    res.send({"msg":"User logged in",token,user:user[0]})
                }
            })
        }else{
            res.send({"msg":"User not found"})
        }
    } catch (error) {
        console.log(error)
    }
})

module.exports  ={
    userRouter
}