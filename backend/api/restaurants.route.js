import express from "express";
import RestaurantsCtrl from "./restaurants.controller.js"

// Access the router of the express 
const router = express.Router()

// Demo route
// router.route("/").get((req, res) => res.send("hello world"))

router.route("/").get(RestaurantsCtrl.apiGetRestaurants)

export default router
