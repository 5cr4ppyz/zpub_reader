let bookname = "linux_and_shellscripting" // Store the book name variable

// To store the url that can be modified
let url = `http://localhost:7000/testroute/get_mybooks/${bookname}.epub`;

// Use ePub library to read the book
const book_toread = ePub(url);


