# Backend of restaurant reviews

Start the server: 
    backend % node index.js 

View the page on browser:
    
    http://localhost:8000/api/v1/restaurants/

Package-json
    
    1. "type": "module" // to allow import statement (instead of require()) by vscode

    2. Download all the dependencies.

server.js

- Contains main server code. 

    1. Create an express application.
    2. Apply all the middleware
    3. Specify initial routes (URL) - load the first page.
    4. export the app as a module.

.env

- Contains all the environment variables (global variables)
- We are using application level provisioning of environment variable. - good for dev but should not be deployed - add .env file to gitignore. [1]

backend/index.js

- Connect the database and start the server. [2]

backend/api

- contains all the routes.

backend/api/restaurants.route.js

- create a route to connect to the restaurants page.

backend/api/dao
- Directory that contains all the Data Access Objects. These objects are used to access the data from the database on MongoDB.

backend/api/dao/restaurantsDAO.js


### References

1. env : https://codeburst.io/process-env-what-it-is-and-why-when-how-to-use-it-effectively-505d0b2831e7

2. MongoClient Connect() : https://arunrajeevan.medium.com/understanding-mongoose-connection-options-2b6e73d96de1

3. Async and Await: https://dev.to/sumaiyaasif/async-and-await-and-what-is-it-actually-doing-34l

4. Deprecated MongoClient.connect() - https://stackoverflow.com/questions/68416009/mongoparseerror-options-poolsize-usenewurlparse-are-not-supported



