import express from "express";

// Access the router of the express 
const router = express.Router()

// Demo route
router.route("/").get((req, res) => res.send("hello world"))

export default router
