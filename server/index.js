require("dotenv").config();

const express = require ('express');
const { connection } = require('./postgres/postgres.js'); // Correct import of connection
// const { default: router } = require('./view/routes.js');
const router = require('./view/routes.js');

const app = express ();

// app.use ('/', router);  // Mount the router at the root path

const PORT = 8000;

// Start Express server and listen for incoming requests on the specified port (PORT).
// When the server starts successfully, the callback function is executed.

// ensuring connection() is called before any route handler tries to access it

app.use(express.json()); // middleware route to handle incoming input data. need to be placed before connection.

connection().then(() => {
    console.log("UserModel is initialized and database connected.");
    app.use('/', router);
    app.listen(PORT, () => {
        console.log(`Server is running at PORT ${PORT}`);
    });
}).catch((error) => {
    console.log('Failed to connect to the database:', error);
});

