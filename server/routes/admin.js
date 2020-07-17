import express from 'express';
import adminModel from '../models/admin';
import { checkEmpty } from '../functions/functions';
import { genSalt, hash, compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import userModel from '../models/user';

const routes = express.Router();

const adminRouter = ()=>{
    routes.post('/register',async(req,res)=>{
        const body = req.body;
        const {isValid,error} = checkEmpty(body);
        try {
            if(isValid){
                const isUserExist = await adminModel.find({
                    email:{
                        $regex:`^${body.email}$`,
                        $options:"i"
                    }
                }) 
                if(!isUserExist){
                    if(isUserExist.username===body.username){
                        res.send({
                            code:400,
                            msg:"This username is taken please enter another"
                        })
                    }else{
                        const salt = await genSalt(10);
                        const hashPassword = await hash(body.password,salt);
                        req.body.password = hashPassword;
                        const adminData = new adminModel(req.body);
                        const saveData = await adminData.save();
                        if(saveData){
                            res.send({
                                code:200,
                                msg:'Admin is successfully registered'
                            })
                        }
                    }
                } 
                else{
                    res.send({
                        code:400,
                        msg:'User is already Exist'
                    })
                }       

            }else{
                res.send({
                    code:400,
                    msg:'Some fields are Empty',
                    error:error
                })
            }
        } catch (err) {
            console.log(`admin routes get error ${err}`);
            res.send({
                code:400,
                msg:"Some error has occured"
            })
        }
    })
    routes.post('/login',async(req,res)=>{
        const body = req.body;
        const {isValid,error} = checkEmpty(body);
        try {
            if(isValid){
                const isUserExist = await adminModel.find({
                    $or:[{username:body.username},{email:body.email}]
                })
                if(isUserExist){
                    const isMatch = await compare(body.password,isUserExist.password);
                    if(isMatch){
                        const token = await sign(isUserExist._id);  
                        res.cookie('adminToken',token, {
                            path:'/',
                            signed:true,
                            maxAge:99999999999
                        });
                        res.send({
                            code:200,
                            msg:"success"
                        })
                    }else{
                        res.send({
                            code:400,
                            msg:"Password doesnot match"
                        })
                    }

                }else{
                    res.send({
                        code:400,
                        msg:'User is not found'
                    })
                }
            }else{
                res.send({
                    code:400,
                    msg:"Some fields are empty",
                    error:error
                })
            }
            
        } catch (err) {
            console.log(`admin login got an error ${err}`);
            res.send({
                code:400,
                msg:"Some error occured"
            })
        }
    })
    routes.get('/getusers',async(req,res)=>{
        const data = await userModel.find({});
        res.send({
            code:200,
            usersData:data,
            msg:"list of users"
        })
    })
    return routes;
}

module.exports = adminRouter;