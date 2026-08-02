import { User } from "../models/user.model.js";
import jwt from 'jsonwebtoken'


async function getUser(req,res){

    const decoded = jwt.verify(req.cookies.token, process.env.JWT_SECRETKEY);

    

    const user = await User.findById(decoded.id);
   
    res.status(200).json({
        message: "User fetched",
        user: user
    })
}

async function postUser(req,res){
    await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role
    })

    res.status(201).json({
        message: "User created"
    })
}

async function patchUser(req,res){
    await User.findOneAndUpdate({
        _id: req.params.id
    },{
        password: req.body.password
    })

    res.status(200).json({
        message: "User updated"
    })
}

export {getUser, postUser, patchUser};