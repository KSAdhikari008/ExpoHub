import { User } from "../models/user.model.js";
import jwt from 'jsonwebtoken'


async function getUser(req,res){
    try{

        const user = await User.findById(req.user.id);
        res.status(200).json({
            message: "User fetched",
            user: user
        })
    }catch(err){
        res.status(400).json({
            message: "Internal Server Error: " + err.message
        })
    }
}

async function getUsers(req,res) {
    
    try{
        const users = await User.find();
        res.status(200).json({
            message: "Users fetched.",
            users: users
        })
    }catch(err){
        res.status(400).json({
            message: "Internal Server Error: " + err.message
        })
    }
    
}

async function getUserById(req,res){
    try{

        const user = await User.findById(req.params.userId);
        res.status(200).json({
            message: "User fetched.",
            user: user       
        });
    }catch(err){
        res.status(400).json({
            message: "Internal Server Error: " + err.message
        })
    }
}

async function patchUser(req,res){
    try{
        await User.findOneAndUpdate({
            _id: req.params.id
        },{
            password: req.body.password
        })

        res.status(200).json({
            message: "User updated"
        })
    }catch(err){
        res.status(400).json({
            message: "Internal Server Error: " + err.message
        })
    }
}

export {getUser, getUserById, getUsers, patchUser};