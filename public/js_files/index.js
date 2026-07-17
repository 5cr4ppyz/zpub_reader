// Main function to talk ti library
const talkto_library = async () => {
    try {
        // 1. INTAKE: Fetch the manifest from the backend
        const res = await fetch("/listbooks");
        const data = await res.json(); 

        const books = data.books;
        const book_count = data.bookcount;

        // Log for admin -- me
        console.log(`[AUDIT] ${book_count} assets detected in vault.`);

        // 2. TARGETING: Locate the injection point in the DOM
        const bookList = document.getElementById("book-list");
        
        // Clear loading state
        bookList.innerHTML = "";

        if (books.length === 0) {
            bookList.innerHTML = "<tr><td colspan='5' style='text-align:center;'>VAULT EMPTY: No insured assets found.</td></tr>";
            return;
        }

        // 3. UNDERWRITING: Generate rows for each asset
        books.forEach((filename, index) => {
            const row = document.createElement("tr");

            // Logic: We use the filename to simulate metadata until the DB is live
            // We strip the extension for the title display
            const displayTitle = filename.replace(".epub", "").replace(/_/g, " ").toUpperCase();

            row.innerHTML = `
                <td>${index + 1}</td>
                <td class="book-title">${displayTitle}</td>
                <td>
                    <button class="read-btn" onclick="openVaultAsset('${filename}')">
                        VIEW BOOK INFO
                    </button>
                </td>
            `;
            bookList.appendChild(row);
        });

    } catch (error) {
        console.error("[LOSS_EVENT] Failed to fetch library manifest:", error);
    }
};

// 4. EXECUTION: The Reader Trigger
const openVaultAsset = (filename) => {
    // The tunnel we defined in server.js: /vault/listbooks/filename.epub
    // Note: We'll eventually point epub.js here
    const assetUrl = `/vault/listbooks/${filename}`;
    console.log(`[ACCESS] Requesting secure tunnel to: ${assetUrl}`);
    
    // For now, let's alert the path. Next step is the EPUB.js mount.
    alert(`ACCESS GRANTED\nAsset: ${filename}\nStatus: Redirecting to Reader Sandbox...`);
};

// Start the audit on page load
window.onload = talkto_library;