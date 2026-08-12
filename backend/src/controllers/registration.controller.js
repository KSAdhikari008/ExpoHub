import { matchedData } from 'express-validator';
import { Registration } from '../models/registration.model.js';


async function getRegistrations(req,res){
    
    try{

        const userRegistrations = await Registration.find({
            visitor: req.user.id
        })

        if(userRegistrations.length === 0){
            return res.status(200).json({
                message: "No registrations found for this user"
            })
        }

        res.status(200).json({
            message: "Registrations fetched successfully.",
            userRegistrations: userRegistrations
        })

    }catch(err){
        res.status(500).json({
            message: err.message
        })
    }

}

async function getRegistration(req,res) {

    try{

        const {registrationId} = matchedData(req);
        
        const reg = await Registration.findById(registrationId);

        if(!reg){
            return res.status(404).json({
                message: "Registration not found"
            })
        }
    
        res.status(200).json({
            message: "Registration fetched successfully",
            registration: reg
        })
    }catch(err){
        res.status(500).json({
            message: err.message
        })
    }
    
}

async function registerToEvent(req,res){

    try{

        const {id} = req.user;
        const {eventId} = matchedData(req);
        
        const existing = await Registration.findOne({
            visitor: id,
            event: eventId
        })
        
        if(existing){
            return res.status(409).json({
                message: "Already registered to this event"
        })
        }

        // above is a friendly check may be passed in a race condition.
        // Hence, a unique index is given in the Registration schema.
        const regsitration = await Registration.create({
            visitor: id,
            event: eventId
        })

        res.status(201).json({
            message: "Registered to event",
            registration: regsitration
        })

    }catch(err){
        res.status(500).json({
            message: err.message
        })
    }

}


export { getRegistrations, getRegistration, registerToEvent};