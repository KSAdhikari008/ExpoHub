import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv/config';
import { User } from './models/user.model.js';
const app = express();

// Middleware configurations.
app.use(express.urlencoded({extended: true, limit: "20kb"}));
app.use(express.static("public")); // public folder available on request. 
app.use(express.json({limit: "20kb"}));
app.use(cors({origin: `${process.env.CORS_ORIGIN}`}));
app.use(cookieParser());

app.get('/user', async (req,res)=>{
    const user = await User.find();
    
    res.status(200).json({
        message: "User fetched",
        user: user
    })
})

app.post('/user', async (req,res)=>{
    await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role
    })

    res.status(201).json({
        message: "User created"
    })
})

app.patch('/user/:id', async (req,res)=>{
    await User.findOneAndUpdate({
        _id: req.params.id
    },{
        password: req.body.password
    })

    res.status(200).json({
        message: "User updated"
    })
})



export default app;