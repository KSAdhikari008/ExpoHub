import { uploadFile } from "../utils/imageKit.js";
import { Booth } from './../models/booth.model.js';


async function getBooths(req,res){
    const booths = await Booth.find();
    res.status(200).json({
        message: "booths fetched",
        booths: booths
    })
}

async function postBooth(req,res){

    

    const result = await uploadFile(req.file.buffer, req.body.filename);

    await Booth.create({
        boothName: req.body.boothName,
        boothNumber: req.body.boothNumber,
        description: req.body.description,
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
}

export {getBooths, postBooth};