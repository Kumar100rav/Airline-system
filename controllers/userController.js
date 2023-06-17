import UserModel from '../models/User.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

class UserController{
    static userRegistration = async(req,res)=>{
        const {name,email,pwd,pwd_cnf,tc}=req.body
        const user = await UserModel.findOne({email:email})
        if(user){
            res.send({"status":"failed","message":"email already exists"})
        }
        else{
            if(name && email && pwd && pwd_cnf &&tc){
                if(pwd===pwd_cnf){
                    try {
                        const salt =await bcrypt.genSalt(10)
                        const hashpwd = await bcrypt.hash(pwd,salt)
                        const doc=new UserModel({
                        name:name,
                        email:email,
                        password:hashpwd,
                        tc:tc

                    })
                    await doc.save()
                    res.status(201).send({"status":"Success","message":"Registered Successfully"})

                        
                    } catch (error) {
                        console.log(error)
                        res.send({"status":"failed","message":"Unable to register"})
                        
                    }

                }else{
                    res.send({"status":"failed","message":"Passwords doesn't match"})
                }


            }else{
                res.send({"status":"failed","message":"All fields are required"})

            }
        }
    }
    static userLogin = async(req,res)=>{
        try {
            const {email,password}=req.body
            if(email && password){
                const user = await UserModel.findOne({email:email})
                if(user!=null){
                    const isMatch = await bcrypt.compare(password,user.password)
                    if((user.email === email) && isMatch){
                        res.send({"status":"Success","message":"Login Successfully"})



                    }else{
                        res.send({"status":"failed","message":"Email or password not correct"})
                    }

                }else {
                    res.send({"status":"failed","message":"You are not registerd"})
                }
            }else{
                res.send({"status":"failed","message":"All fields are required"})
            }
        } catch (error) {
            console.log(error)
            res.send({"status":"Success","message":"Unable to login"})
        }
    }
}export default UserController