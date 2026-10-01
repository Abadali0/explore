import jwt from "jsonwebtoken";
import dotenv from "dotenv"
dotenv.config()

export const signJWT=(payload)=>{
    try{
        const token = jwt.sign(payload,process.env.JWT_SECRET,{
            expiresIn:"5m",
        });
        return token;
    }  catch(error){
        console.log(error);
        console.log("Error signing JWT");
    }
};
export const verifyJWT=(token)=>{
    try{
        const decoded= jwt.verify(token,process.env.JWT_SECRET);
        return decoded;
    }  catch(error){
       throw new Error("Error verifying JWT");
    }
};
