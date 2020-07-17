import express from 'express';
import { checkEmpty, regexForEmail } from '../functions/functions';
import userModel from '../models/user';
import { hash, genSalt, compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { userJwtSecret } from '../config/key';
import { usercheckAuth } from '../middleware/middleware';


const routes = express.Router();

const userRouter =()=>{
    routes.post('/signup',async(req,res)=>{
        const body = req.body;
        const {isValid,error} = checkEmpty(body);
        try{
            if(isValid){
                if(regexForEmail.test(body.email)){
                    const isUserExist = await userModel.findOne({
                        // email:body.email
                        email:{
                            $regex:`^${body.email}$`,
                            $options:"i"
                        }
                    }) 
                   if(!isUserExist){
                        
                        const salt = await genSalt(10);
                        const hashedPassword = await hash(body.password,salt);
                        if(hashedPassword){
                            req.body.password = hashedPassword;
                            const userData = new userModel(req.body);
                            const saveData = await userData.save();
                            if(saveData){
                                res.send({
                                    code:200,
                                    msg:"user successfully registered"
                                })
                            }
                        }


                    }else{
                        res.send({
                            code:400,
                            msg:"User is already Exist"
                        })
                    }
                }else{
                    res.send({
                        code:400,
                        msg:"Email is not valid"
                    })
                }  
            }
            else{
                res.send({
                    code:400,
                    msg:"some field are empty",
                    error:error
                })
            }
        }catch(err){
            console.log(`sign in userRoutes found error ${err}`);
            res.send({
                code:400,
                msg:"some error occured"
            })
        }
        
    });
    routes.post('/login',async(req,res)=>{
        const body = req.body;
        const {isValid,error} = checkEmpty(body);
        try{
            if(isValid){
                const isUserExist = await userModel.findOne({
                    email:{
                        $regex:`^${body.email}$`,
                        $options:"i"
                    }
                })
                if(isUserExist){
                    const isMatch = await compare(body.password,isUserExist.password);
                    if(isMatch){
                        const payload = {
                            userid:isUserExist.id
                        }
                        const token = await sign(payload,userJwtSecret,{
                            expiresIn:'200h'
                        });
                        res.send({
                            code:200,
                            msg:"successfully login",
                            token:token,
                            userid:isUserExist.id
                        })
                    }else{
                        res.send({
                            code:400,
                            msg:"Please enter correct Password"
                        })
                    }
                }else{
                    res.send({
                        code:400,
                        msg:"User not found"
                    })
                }
            }
            else{
                res.send({
                    code:400,
                    msg:"some fields are empty",
                    error:error
                })
            }
        }catch(err){
            console.log(`login in userroute get err${err}`);
            res.send({
                code:400,
                msg:"some error is occured"
            })
        }
        
    })

    routes.get('/getprofile',usercheckAuth,async(req,res)=>{
        const id = req.headers.tokenData.userid || req.body.userid;
        try{
            const profile_data = await userModel.findById({
                _id:id
            }).select('-password');
            if(profile_data){
                res.send({
                    code:200,
                    profile_data:profile_data
                })
            }
        }catch(err){
            console.log(`get profile found error in userroutes ${err}`);
        }
       
    });
    routes.post('/updateProfile',usercheckAuth,async(req,res)=>{
        const id = req.headers.tokenData.userid || req.body.userid;
        try{
            const body = req.body;
            const updateData = await userModel.updateOne({
                _id:id
            },body);
            // console.log(updateData,body)
            if(updateData.nModified==1){
                res.send({
                    code:200,
                    msg:"Profile is updated"
                })
            }else{
                res.send({
                    code:400,
                    msg:"Some error found in updation"
                })
            }
        }catch(err){
            console.log(`update profile got and error ${err}`)
        }
    })
    return routes;
}

module.exports= userRouter;