import { User } from "../models/user.model.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'
import { matchedData } from "express-validator";

async function registerUser(req,res){
    
    try{
        const { email, username, password, role} = matchedData(req);
                
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
            sameSite: "none",
            maxAge: 1000*60*60*24*7 // 1 week
        });
        
        res.status(201).json({
            message: "User registered successfully",
        })

    }catch(err){
        if(err.code === 11000){ // status code thrown by User.create if email or username is duplicate
            res.status(409).json({
                message: "Email already Exists."
            })
        }

        return res.status(500).json({
            message: "Internal Server Error: " + err.message,
        });
    }
}

async function loginUser(req,res){
    try{

        const {identifier, password} = matchedData(req);

        const user = await User.findOne({
            $or: [
                {email: identifier.toLowerCase()}, // registered emails have been standardized to lowercase through validators.
                {username: identifier}
            ]
        })
        if(!user){
            return res.status(401).json({
                // message: "User not found. Please registeirr first."
                message: "invalid email or password" // production
            })
        }

        const isPswdValid = await bcrypt.compare(password, user.password);
        if(!isPswdValid){
            return res.status(404).json({
                // message: "wrong password."
                message: "invalid email or password" // production
            })
        }

        const token = jwt.sign({
            id: user._id,
            role: user.role
        }, process.env.JWT_SECRETKEY)

        res.cookie('token_ExpoHub',token,{
            httpOnly: true, 
            secure: process.env.NODE_ENV === "production",
            sameSite: "none",
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

async function logoutUser(req, res) {
    try {
        res.clearCookie("token_ExpoHub",{ // providing the cofiges as well
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "none"
        });

        return res.status(200).json({
            message: "Logged out successfully"
        });
    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
}

async function getUser(req,res){
    try{
       const {id, role} = req.user;
        res.status(200).json({
            message: "user details",
            role: role,
            id: id
        })

    }catch(err){
        res.status(400).json({
            message: "Internal Server Error: " + err.message
        })
    }
}

export {registerUser, loginUser, getUser, logoutUser};