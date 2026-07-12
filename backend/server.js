const express = require("express");
const app = express(); // To run the routes and handle requests
const dotenv = require("dotenv").config(); // to read .env file configs
const path = require("path"); // to handle file paths


const port = process.env.PORT || 3000; // if port env not set run on 3000

app.use(express.json()); // to parse incoming JSON requests
app.use(express.static("public")); // to serve static files from the public directory

// get request
app.get("/", (req, res) =>{
    res.sendFile(path.join(__dirname, "../public/html_files/index.html"));

});

// If the route is not found
/*
app.use("*", (req, res) => {
    res.json({
        error: "Route not found!",
        message: "Please check the URL and try again.",
        debug: "This is a catch-all route for undefined endpoints.",
        escalate: "Be sure to tell 5cr4ppyz about this issue if you think it's a bug.",

    });
});
*/

app.listen(port, () =>{
    console.log(`Hey there 5cr4ppyz, zpub reader server is running on port ${port}`);
});