import { verify } from "jsonwebtoken";
import { userJwtSecret, PORT } from "../config/key";

export const usercheckAuth = async(req,res,next)=>{
    const token = req.headers['x-custom-header'];
    try{
        const isTokenValid = await verify(token,userJwtSecret);
        console.log("istoken",isTokenValid);
        if(isTokenValid){
            req.headers.tokenData = isTokenValid;
            next();
        }else{
            res.send({
                code:400,
                msg:"Authentication is required"
            })
        }
    }catch(err){
        console.log(`middleware Got an error ${err}`);
        res.send({
            code:400,
            msg:'Session has been expired Authentication required'
        })
    }


}