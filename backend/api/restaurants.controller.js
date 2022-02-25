import RestaurantsDAO from "../dao/restaurantsDAO.js"

export default class RestaurantsCtrl {
    static async apiGetRestaurants(req, res, next) {
        // req is the URL 
        // query(check) the URL for restaurantPerPage text.
        const restaurantsPerPage = req.query.restaurantsPerPage ? parseInt(req.query.restaurantsPerPage, 10) : 20
        const page = req.query.page ? parseInt(req.query.page, 10) : 0

        // If the user has passed any filters in the query extract the information.
        let filters = {}
        if (req.query.cuisine) {
            filters.cuisine = req.query.cuisine
        }
        else if (req.query.zipcode) {
            filters.zipcode = req.query.zipcode
        }
        else if (req.query.name) {
            filters.name = req.query.name
        }

        // Call the function to get the data from DB based on the parameters passed.
        const { restaurantsList, totalNumRestaurants } = await RestaurantsDAO.getRestaurants({
            filters, 
            page,
            restaurantsPerPage,
        })

        // Construct an object with the information obtained by the function call above.
        let response = {
            restaurants: restaurantsList,
            page: page,
            filtersApplied: filters,
            entriesPerPage: restaurantsPerPage,
            total_results: totalNumRestaurants,
        }

        // return the data as a json object in the body of the response back to the client.
        res.json(response)
    }
}