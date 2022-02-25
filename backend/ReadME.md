# Backend of restaurant reviews


Package-json
    1. "type": "module" // to allow import statement (instead of require()) by vscode

    2. Download all the dependencies.

server.js

- Contains main server code. 

    1. Create an express application.
    2. Apply all the middleware
    3. Specify initial routes (URL)
    4. export the app as a module.

.env

- Contains all the environment variables (global variables)
- We are using application level provisioning of environment variable. - good for dev but should not be deployed - add .env file to gitignore.

backend/index.js

- Connect the database and start the server.




