// require ('dotenv'). config({ path : './env'})
import dotenv from "dotenv";

import connectDB from "./db/index.js";
import { app } from "./app.js";
// import { configDotenv } from "dotenv";
dotenv.config({
    path: './.env'
})


connectDB()
.then(() => {
    app.listen(process.env.PORT || 4000, () => {
        console.log(`Server is running at ${process.env.PORT}`);
    } )
})
.catch((err) => {
    console.log("MONGODB connection failed !", err);
})



/*( async () => {
    try {
        mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        app.on("error", (error) => {
            console.log("ERROR:", error);
            throw error
        })
        
        app.listen(process.env.PORT, () => {
            console.log(`server is listening on ${process.env.PORT} port`);
        })

    } catch (error) {
        console.log("ERROR:",error);
    }
})()
*/
