import { User } from "../models/user.model.js";
import jwt from 'jsonwebtoken';

async function registerUser(req,res){
    
    try{
        const {username, email, password, role} = req.body;
        const alreadyRegistered = await User.findOne({
            email: email
        })
        
        if(alreadyRegistered){
            return res.status(409).json({
                message: "already registered"
            })
        }
    
        // In a race condition ,the above validation may get bypassed if two user register with the same email at the exact saem time.
        // Hence the try block is wrapped, User.create throw an error since email is unique.
        const user = await User.create({
            username: username,
            email: email,
            password: password,
            role: role
        })

        const token = jwt.sign({
            id: user._id,
            role: user.role
        },process.env.JWT_SECRETKEY);
        
        res.cookie('token',token);
        
        res.status(201).json({
            message: "User registered successfully",
            user: user
        })

    }catch(err){
        if(err.code === 11000){ // status code thrown by User.create if email is duplicate
            res.status(409).json({
                message: "Email already Exists."
            })
        }

        console.error(err);

        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
}

async function loginUser(req,res){
    try{
        const user = await User.findOne({
            email: req.body.email
        })

        if(!user){
            return res.status(401).json({
                message: "User is not signedIn."
            })
        }

        const token = jwt.sign({
            id: user._id,
            role: user.role
        }, process.env.JWT_SECRETKEY)

        res.cookie('token',token);

        res.status(200).json({
            message: "logged in successfully",
            id: user._id,
            role: user.role
        })

    }catch(err){
        res.status(400).json({
            message: err.message
        })
    }
}

export {registerUser, loginUser};