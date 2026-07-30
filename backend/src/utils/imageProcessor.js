import sharp from 'sharp'

export async function processImage(buffer){

    // imagkit doesn't allow images above 25mp resolution.
    // using sharp to process images before uploading to the cloud.

     const metaData = await sharp(buffer).metadata();
    
        // validating dimensions - images less then 100mp res. After compresion , reduced to around 2-3mp.
        if(metaData.width*metaData.height > 100_000_000)
        {
            throw new Error( "Image resolution is too large.");
        }

    // Resize, compress, convert (Jpeg)
    const processedBuffer = await sharp(buffer)
      .resize({ 
        width: 1600, // resize image to this res.
        withoutEnlargement: true // don't resize img with res smaller then 1600.
        }) 
      .jpeg({ quality: 80 }) // conver to jpeg and resize to 80%
      .toBuffer();


    return processedBuffer;
}