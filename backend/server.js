const express = require("express");
const app = express(); // To run the routes and handle requests
const dotenv = require("dotenv").config(); // To read .env file configs
const path = require("path"); // To handle file paths
const fs = require("fs"); // File system module


const port = process.env.port || 3000; // if port env not set run on 3000

app.use(express.json()); // To parse incoming JSON requests
app.use(express.static("public")); // To serve static files from the public directory

// Get request
app.get("/", (req, res) =>{
    return res.sendFile(path.join(__dirname, "../public/html_files/index.html"));

});

// Get request to list the books to the website you see...
// Say I return a JSON file
app.get("/listbooks", (req, res) =>{
    const folderpath = path.join(__dirname, "/epubs"); // Folder containing all the epubs, in the same backend directory

    fs.readdir(folderpath, (error, files) =>{
        if(error){
            return res.json({
                message: "Opps failed to read the EPUB folder path, scrappy!"
            });

        }

        // However, check the epubs only 
        const epubs_only = files.filter((file) =>{
            return file.endsWith(".epub"); // Return all files that end with the epub extension
        });

        const bk_count = epubs_only.length; // Get the length of the array

        return res.json({
            books: epubs_only,
            bookcount: bk_count
        });


    });




});

// Route to serve the books
// Telling the server that it can server this as a URL
app.use("/vault/assets", express.static(path.join(__dirname, "/epubs")));


// If the route is not found, return json
app.use((req, res) => {
    // Return 404 page when unexistant route is accessed
    return res.sendFile(path.join(__dirname, "../public/html_files/unknown_route.html"));

});

// Listen to the app on port 7000 of the machine
app.listen(port, () =>{
    console.log(`Hey there 5cr4ppyz, zpub reader server is running on port ${port}`);
});