import { User } from "../models/user.model.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'

async function registerUser(req,res){
    
    try{
        const { email, username, password, role} = req.body;
        
        const alreadyRegistered = await User.findOne({
            $or: [ // username email both are unique
                {email},
                {username}
            ]
        })
        if(alreadyRegistered){
            return res.status(409).json({
                message: "already registered. Try logging in."
            })
        }

        const hash = await bcrypt.hash(password, 10);
    
        // In a race condition ,the above validation may get bypassed if two user register with the same email at the exact saem time.
        // Hence the try block is wrapped, User.create throw an error since email is unique.
        const user = await User.create({
            username,
            email,
            password: hash,
            role
        })

        const token = jwt.sign({
            id: user._id,
            role: user.role
        },process.env.JWT_SECRETKEY);
        
        res.cookie('token_ExpoHub',token,{
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 1000*60*60*24*7 // 1 week
        });
        
        res.status(201).json({
            message: "User registered successfully",
        })

    }catch(err){
        if(err.code === 11000){ // status code thrown by User.create if email is duplicate
            res.status(409).json({
                message: "Email already Exists."
            })
        }

        console.error(err);

        return res.status(500).json({
            message: "Internal Server Error: " + err.message,
        });
    }
}

async function loginUser(req,res){
    try{

        const {identifier, password} = req.body;

        const user = await User.findOne({
            $or: [
                {email: identifier},
                {username: identifier}
            ]
        })
        if(!user){
            return res.status(401).json({
                message: "User not found. Please registeirr first."
                // message: "invalid email or password" // production
            })
        }

        const isPswdValid = await bcrypt.compare(password, user.password);
        if(!isPswdValid){
            return res.status(404).json({
                message: "wrong password."
                // message: "invalid email or password" // production
            })
        }

        const token = jwt.sign({
            id: user._id,
            role: user.role
        }, process.env.JWT_SECRETKEY)

        res.cookie('token_ExpoHub',token,{
            httpOnly: true, 
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 1000*60*60*24*7 // 1 week
        });

        res.status(200).json({
            message: "logged in successfully",
            role: user.role
        })

    }catch(err){
        res.status(400).json({
            message: "Internal Server Error: " + err.message,
        })
    }
}

async function getUser(req,res){
    try{
        const token = req.cookies?.token_ExpoHub; // returns undefined if token is absent
        if(!token){
            return res.status(200).json({
                message: "Authentication token missing.",
                role: null
        })
        }

        const {id, role} =  jwt.verify(req.cookies.token_ExpoHub, process.env.JWT_SECRETKEY);
        res.status(200).json({
            message: "user details",
            role: role
        })

    }catch(err){
        res.status(400).json({
            message: "Internal Server Error: " + err.message
        })
    }
}

export {registerUser, loginUser, getUser};