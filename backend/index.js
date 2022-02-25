import app from "./server.js"
import mongodb from "mongodb"
import dotenv from "dotenv" // to access the environment variables.
dotenv.config() // load in the environment variables.

// get access to Mongo client in mongodb
const MongoClient = mongodb.MongoClient

const port = process.env.PORT || 8000

// Connect to the data base
MongoClient.connect(
    process.env.RESTREVIEWS_DB_URI,
    {
        poolSize: 50, // Maximum number of users is 50.
        wtimeout: 2500, // Request will timeout after 2500 seconds
        useNewUrlParse: true
    })
    .catch(error => {
        console.error(error.stack)
        process.exit(1)
    })
    .then(async client => {
        // after the database is connected and no errors was found, start the server an listen.
        app.listen(port, () => {
            console.log(`listening on port ${port}`)
        })
    }) // next create an api