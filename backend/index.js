import app from "./server.js"
import mongodb from "mongodb"
import dotenv from "dotenv" // to access the environment variables.
dotenv.config() // load in the environment variables.

// A module in NodeJS library that helps in interacting with MongoDB Database.
const MongoClient = mongodb.MongoClient

const port = process.env.PORT || 8000 

// Connect to the data base
MongoClient.connect(
    process.env.RESTREVIEWS_DB_URI,
    {
        maxPoolSize: 50, // Maximum number of users allowed to access the database at a time.
        // socketTimeoutMS: 5000, // If a user is inactive for 5000ms from connection, socket is killed.
        wtimeoutMS: 2500, // Write operation will timeout after 2500 milliseconds - the write operation performed before timeout is not undone. 
        useNewUrlParser: true, // The mongodb changed how it handles parsing the URL. But as a backup it allows us to use the older version of this implementation if new one fails for any reason. 
    })
    .catch(error => {
        console.error(error.stack) // log the error found
        process.exit(1)
    })
    .then(async client => {
        // after the database is connected and no errors was found, start the server an listen.
        console.log(`before the listen`)
        app.listen(port, () => {
            console.log(`listening on port ${port}`)
        })
        console.log(`after the listen`)
    }) // next create an api