let currentBook = null;
let rendition = null;

/**
 * Fetch the book list
 */
async function init() {
    try {
        const res = await fetch("/testroute/library");
        const data = await res.json();

        console.log(data);
        
        const books = data.books; // From the object


        const list = document.getElementById("book-list");
        list.innerHTML = "";

        books.forEach(file => {
            const item = document.createElement("div");
            item.className = "book-item";
            item.innerText = file.replace(".epub", "").replace(/_/g, " ");
            
            item.onclick = () => {
                // Remove active class from others
                document.querySelectorAll('.book-item').forEach(el => el.classList.remove('active'));
                item.classList.add('active');
                loadBook(file);
            };
            
            list.appendChild(item);
        });
    } catch (e) {
        console.error("Failed to load library", e);
    }
}

/**
 * Load Book
 */
async function loadBook(file) {
    if (currentBook) {
        await currentBook.destroy();
    }

    const url = `/testroute/get_mybooks/${file}`;
    currentBook = ePub(url);
    rendition = currentBook.renderTo("viewer", {
        width: "100%",
        height: "100%",
        flow: "paginated",
        manager: "default"
    });

    try {
        await currentBook.opened;
        rendition.display();
    } catch (err) {
        console.error("Error loading epub", err);
    }
}

/**
 * Nav Listeners
 */
document.getElementById("next-btn").onclick = () => rendition?.next();
document.getElementById("prev-btn").onclick = () => rendition?.prev();

init();