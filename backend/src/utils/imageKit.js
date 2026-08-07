import {ImageKit} from '@imagekit/nodejs'
import dotenv from "dotenv/config"

const imagekit = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY
})


function uploadFile(fileBuffer,filename,folderPath){
    // Returns ImageKit's upload Promise to be awaited by the caller.
    return imagekit.files.upload({
        file: fileBuffer.toString("base64"),
        fileName: filename ,
        folder: `/ExpoHub/${folderPath}`
    })
}

function deleteFile(id){
    // Returns ImageKit's delete Promise to be awaited by the caller.
    return imagekit.files.delete(id);
}


export  {uploadFile,deleteFile};