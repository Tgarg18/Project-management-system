import dotenv from 'dotenv'
import { dbConnect } from './db/index.js'
import { app } from './app.js'

dotenv.config({
    path: './.env'
})

dbConnect()
    .then(() => {

        app.on('error', (error) => {
            console.log("ERROR: ", error);
            throw error
        })

        app.listen(process.env.PORT || 8000, () => {
            console.log(`Server running on port ${process.env.PORT || 8000}`);
        })
    })
    .catch((error) => {
        console.log("MongoDB connection Error: ", error);
    })