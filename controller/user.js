import { signJWT } from "../utils/jwt";
import user from "../model/user.js";
import { hashPassword,comparePassword } from "../utils/bcrypt.js";

export const loginUser =async(req,res)=>{
    try{
        const{username,password}=req.body;
        if(!username||!password){
            return res.status(400).json({error:"Username and password required"})
        }
        const user=await User.findOne({username});
       const isPasswordValid=await comparePassword(password.user.password);
       if(!user||!isPasswordValid){
        return res.status(401).json({error:"Invalid Credentials"})
       }
       const token=signJWT({username:user.username,id:user._id});
       res.status(200).json({token});
    } catch(error){
        console.error(err);
        res.status(500).json({error:"Internal Server error"});
    }
};


export const createUser =async(req,res)=>{
    try{
        const{username,password}=req.body;
        if(!username||!password){
            return res.status(400).json({error:"Username and password required"})
        }
        const encryptedPassword=await hashPassword(password);
        const newUser=new User({username:username,password:encryptedPassword});
        await newUser.save();
        res.status(201).json({message:"User created successfully"});
    } catch(error){
        console.error(err);
        res.status(500).json({error:"Internal Server error"});
    }
};