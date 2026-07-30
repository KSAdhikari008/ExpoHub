import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv/config';
import multer from 'multer'
import { User } from './models/user.model.js';
import { Booth } from './models/booth.model.js';
import { uploadFile } from './utils/imageKit.js';
import { Event } from './models/event.model.js';
import { processImage } from './utils/imageProcessor.js';

const app = express();

// Middleware configurations.
app.use(express.urlencoded({extended: true, limit: "20kb"}));
app.use(express.static("public")); // public folder available on request. 
app.use(express.json({limit: "20kb"}));
app.use(cors({origin: process.env.CORS_ORIGIN}));
app.use(cookieParser());
const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 10*1024*1024 // size limited to 10mb.
    }}); // multer stores the uploaded file temporarily in RAM instead of saving it to your server's disk.


// USER (no post, user is created only with auth)
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


//BOOTH
app.get('/api/booths', async (req,res)=>{
    const booths = await Booth.find();
    res.status(200).json({
        message: "booths fetched",
        booths: booths
    })
})

app.post('/api/booths',upload.single('poster'), async (req,res)=>{
    const result = await uploadFile(req.file.buffer, req.body.filename);
    console.log(result);
    await Booth.create({
        boothName: req.body.boothName,
        boothNumber: req.body.boothNumber,
        discription: req.body.discription,
        size: req.body.size,
        poster: {
            url: result.url,
            fileId: result.fileId
        },
        status: req.body.status,
        event: req.body.event,
        exhibitor: req.body.exhibitor,
    })

    res.status(201).json({
        message: "Booth created",
    })
})


//EVENT
app.post('/api/events', upload.single('banner'), async (req,res)=>{

    try{

    
    const processedBuffer = await processImage(req.file.buffer);

    const result = await uploadFile(processedBuffer , req.body.filename);

    await Event.create({
        title: req.body.title,
        discription: req.body.discription,
        venue: req.body.venue,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        status: req.body.status,
        banner: {
            url: result.url,
            thumbnailUrl: result.thumbnailUrl,
            fileId: result.fileId
        }        
    })

    res.status(201).json({
        message: "Event created",
    })

    }catch(err){
        res.status(400).json({
            message: err.message
        })
    }
})

app.get('/api/events', async (req,res)=>{
    const events = await Event.find();
    res.status(200).json({
        message: "Events fetched",
        events: events
    })
})

app.get('/api/events/:eventId', async (req,res)=>{
    const event = await Event.findById(req.params.eventId);
    res.status(200).json({
        message: "Event Fetched",
        event: event
    })
})

export default app;