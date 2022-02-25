let restaurants // variable that contains a reference to the database

export default class RestaurantsDAO {

    // Connects to the database as soon as the server starts. 
    // It is called from index.js inside MongoClient.connect().
    // conn - the variable that points to the DBMS (MongoDB) server.
    static async injectDB(conn) {
    
        if (restaurants) {
            return // if an instance to the database is created then return.
        }
        // If the reference is not found.
        try {
            // connect to db(database name).collection("<collection_name>")
            // Initialize the variable to point to the collection in the database.
            restaurants = await conn.db(process.env.RESTREVIEWS_NS).collection("restaurants")
        } catch(e) {
            console.error(`Unable to establish a collection handle in restaurantsDAO: ${e}`)
        }
    }

    // The `= {}` below lets you call the function without any parameters
    static async getRestaurants( { filters = null, page = 0, restaurantsPerPage = 20 } = {} ) {
        // filter = {"key":"value", "key1":"value"}

        let query
        if (filters) { // If the user passes filters
            
            if ("name" in filters) { // query by name
                // Here $text is not a database field(column) but it is defined in the mongodb atlas.
                query = { $text: { $search: filters["name"] } }
            }
            else if ("cuisine" in filters) { // Query by cuisine
                // this is a database field
                query = { "cuisine": { $eq: filters["cuisine"] } } // if the cuisine from the DB == cuisine passed by user.
            }
            else if ("zipcode" in filters) { // Query by zipcode
                query = { "address.zipcode": { $eq: filters["zipcode"] } }
            }
        }

        let cursor // variable that reference the list of restaurants from the db.
        try {
            // Get all the restaurants based on the query after filter.
            // If there query == null then get ALL Restaurants.
            cursor = await restaurants.find(query) 

        } catch (e) {
            console.error(`Unable to issue find command, ${e}`)
            return { restaurants: [], totalNumRestaurants: 0 }
        }

        // limit the list to the pages to extract the data from and also the restaurants per page.
        // skip() - to skip from teh beginning to get to the page we want.
        let displayCursor = cursor.limit(restaurantsPerPage).skip(restaurantsPerPage * page)
    
        try {
            // convert the data into an array
            const restaurantsList = await displayCursor.toArray()
            // count the number of rows (documents)
            const totalNumRestaurants = await restaurants.countDocuments(query)

            return { restaurantsList, totalNumRestaurants }
        } catch (e) {
            console.error(
                `Unable to convert cursor to array or problem counting documents, ${e}`
            )
            return { restaurantsList: [], totalNumRestaurants: 0}
        }
    }
}

