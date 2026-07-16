const express = require("express");
const app = express(); // To run the routes and handle requests
const dotenv = require("dotenv").config(); // to read .env file configs
const path = require("path"); // to handle file paths


const port = process.env.port || 3000; // if port env not set run on 3000

app.use(express.json()); // to parse incoming JSON requests
app.use(express.static("public")); // to serve static files from the public directory

// get request
app.get("/", (req, res) =>{
    return res.sendFile(path.join(__dirname, "../public/html_files/index.html"));

});

// Route for admin("5cr4ppyz") to test how epub works --- lol that's me bru!
app.get("/testroute", (req, res)=>{
    return res.sendFile(path.join(__dirname, "../public/html_files/testroute.html"));

});

// Route to serve the books
// Telling the server that it can server this as a URL
app.use("/testroute/get_mybooks", express.static(path.join(__dirname, "/epubs_available")));


// If the route is not found, return json
app.use((req, res) => {
    // Return 404 page when unexistant route is accessed
    return res.sendFile(path.join(__dirname, "../public/html_files/unknown_route.html"));

});

// Listen to the app on port 7000 of the machine
app.listen(port, () =>{
    console.log(`Hey there 5cr4ppyz, zpub reader server is running on port ${port}`);
});