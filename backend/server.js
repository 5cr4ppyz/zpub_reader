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

// Route for admin("5cr4ppyz") to test how epub works --- lol that's me bru!
app.get("/testroute", (req, res)=>{
    return res.sendFile(path.join(__dirname, "../public/html_files/testroute.html"));

});

// Route to list all books in the folder
app.get("/testroute/library", async (req, res)=>{
    const vault = path.join(__dirname, "/epubs_available");

    fs.readdir(vault, (error, files) =>{
        if(error){
            return res.json({
                error: "Cannot load folder, please contact admin..."
            });

        }

        // Filter and only return files that end with the epub extension
        const epubs_found = files.filter(f => f.endsWith(".epub"));
        const bookcount = Object.keys(epubs_found).length; // Get the book count, getting count from objects

        // Return json back to the client
        return res.json({
            books: epubs_found,
            book_count: bookcount

        });


    });

});

// Route to serve the books
// Telling the server that it can server this as a URL
app.use("/testroute/read_book", express.static(path.join(__dirname, "/epubs_available")));


// If the route is not found, return json
app.use((req, res) => {
    // Return 404 page when unexistant route is accessed
    return res.sendFile(path.join(__dirname, "../public/html_files/unknown_route.html"));

});

// Listen to the app on port 7000 of the machine
app.listen(port, () =>{
    console.log(`Hey there 5cr4ppyz, zpub reader server is running on port ${port}`);
});