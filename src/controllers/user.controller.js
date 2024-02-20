import { asyncHandler } from "../utils/asyncHandler.js";
 import {ApiError} from '../utils/ApiError.js'
 import {User} from '../models/user.model.js'
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler( async (req, res) => {
        // get user details:
        // validation & check if user already exist:
        // check for images & avatar and upload them on cloudinary
        // cretae user object 
        // check for user creation 
        // return res

        const {fullName, email, username, password} = req.body

        console.log("email:", email);
        //check every field separately:

       /* if (fullName == "")  {
            throw new ApiError(400, "fullName is require")
        }*/

        //or check like this:
        if(
            [fullName, email, username, password].some((field) => field?.trim() == "")
        ){
            throw new ApiError(400, "ALl fields are required")
        }

           const existedUser = User.findOne({
                $or : [{username}, {email}]
            })
          if(existedUser){
            throw new ApiError(400, "User already exists ")
          }

          const avatarLocalPath = req.files?.avatar[0]?.path;
          const coverImageLocalPath = req.files?.coverImage[0].path;

          if(!avatarLocalPath){
            throw new ApiError(400, "Avatar is required" )
          }

        const avatar =  await uploadOnCloudinary(avatarLocalPath)
        const coverImage = await uploadOnCloudinary(coverImageLocalPath)

        if(!avatar) {
            throw new ApiError(400, "Avatar required" )
        }
           
        const user = await User.create(
            {
                fullName,
                avatar: avatar.url,
                coverImage: coverImage?.url || "",
                email,
                password,
                username: username.tolowerCase()
            }
        )

        //here we removw passwords and refreshtokens:
         const createdUser =  await user.findById(user._id).select("-password -refreshToken")

         if(!createdUser) {
            throw new ApiError(500, "Something went wrong with user")
         }


         //here we reutn as we mnetioned above:
         return res.status(201).json(
            new ApiResponse(200, createdUser, "Uer registered successfully")
         )
})

export {registerUser}

