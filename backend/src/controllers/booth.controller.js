import { matchedData } from "express-validator";
import { deleteFile, uploadFile } from "../utils/imageKit.js";
import { Booth } from './../models/booth.model.js';


async function getBooths(req,res){
    const booths = await Booth.find();
    res.status(200).json({
        message: "booths fetched",
        booths: booths
    })
}

async function createBooth(req,res){
    try {
        const {boothName, description, boothNumber, size, event} = matchedData(req);
        const result = await uploadFile(req.file.buffer, boothName, 'booth');

        await Booth.create({
            boothName,
            description,
            boothNumber,
            size,
            poster: {
                url: result.url,
                fileId: result.fileId
            },
            event
        });

        res.status(201).json({
            message: "Booth created",
        });
    } catch(err) {
        res.status(400).json({
            message: err.message
        });
    }
}

async function deleteBooth(req,res){
    try{
        const { boothId } = matchedData(req);
        const booth = await Booth.findById(boothId);

        if(!booth){
            return res.status(404).json({
                message: "Booth not found"
            });
        }

        if(booth.poster?.fileId){
            await deleteFile(booth.poster.fileId);
        }

        await booth.deleteOne();

        res.status(200).json({
            message: "Booth deleted successfully"
        });
    }catch(err){
        res.status(500).json({
            message: err.message
        });
    }
}

export {getBooths, createBooth, deleteBooth};