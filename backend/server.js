import express from "express";
import cors from 'cors';

import restaurants from "./api/restaurants.route.js" // route to restaurants page.

const app = express() // create an express application

// Middleware
app.use(cors())
app.use(express.json()) // server can accept JSON in the body of a request. 
// older versions used a body parser but that is not required anymore.

/**
 * When client starts the application, the first web address they would be routed to is 
 * the restaurant page. The server will first fetch the data about the restaurants from
 * restaurants.route.js page.
 */
// Main URL of the application. | here is the standard format for apis
app.use("/api/v1/restaurants", restaurants)
app.use("*", (req, res) => res.status(404).json({ error : "not found"})) // for any other address | * is a wild card - it is the route that we do not have.

// exporting app as a module. | it is imported in the files that connects the database.
export default app
