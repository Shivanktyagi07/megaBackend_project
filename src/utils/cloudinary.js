import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

        
cloudinary.config({ 
  cloud_name: process.env.CLUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret:process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (loccalFilePath) =>{
    try {
        if(!loccalFilePath) return null
        //file uploading:
        const response = await cloudinary.uploader.upload(loccalFilePath, {
            resource_type: "auto"
        })
        console.log("File is uploaded on cloudinary",
        response.url);
        return response;

    } catch (error) {
        fs.unlinkSync(loccalFilePath) // remove the temp. save file 
    }

}

// cloudinary.uploader.upload("https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg",
//   { public_id: "olympic_flag" }, 
//   function(error, result) {console.log(result); });

export {uploadOnCloudinary}
