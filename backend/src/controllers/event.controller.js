import { Event } from '../models/event.model.js';
import { uploadFile } from "../utils/imageKit.js";
import { processImage } from "../utils/imageProcessor.js";


async function getEvents(req,res){
    const events = await Event.find();
    res.status(200).json({
        message: "Events fetched",
        events: events
    })
}

async function postEvent(req,res){

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
}

async function getEvent(req,res){
    const event = await Event.findById(req.params.eventId);
    res.status(200).json({
        message: "Event Fetched",
        event: event
    })
}

export {getEvents, postEvent, getEvent};