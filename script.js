const myLibrary = [];

// book constructor / book template
function Book(title, author, pages, hasRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.hasRead = hasRead;

    this.info = function() {
        // if hasRead === true, print "already read", otherwise print "not read yet"
        const readStatus = (this.hasRead === true) ? "already read" : "not read yet";
        return `${this.title} by ${this.author}, ${this.pages} pages, ${readStatus}`;
    };
}

// add book to the library, then render rable
function addBookToLibrary(book) {
    myLibrary.push(book);
    console.log(`${book.title} has been added to the library.`);
    renderLibraryTable();
}

function renderLibraryTable() {
    const container = document.getElementById('libraryTableContainer');
    container.innerHTML = ""; // clear previous table

    if (myLibrary.length === 0) {
        container.innerHTML = "<p>No books in the library yet.</p>";
        return;
    }

    // create table
    const table = document.createElement('table');
    table.border = "1";
    table.style.width = "100%";
    table.style.textAlign = "left";

    // Create table header
    const headerRow = table.insertRow();
    const headers = ["Title", "Author", "Pages", "Read Status"];
    headers.forEach(header => {
        const cell = headerRow.insertCell();
        cell.textContent = header;
        cell.style.fontWeight = "bold";
    });
    
    myLibrary.forEach((book, index) => {
        const row = table.insertRow();
        row.insertCell().textContent = book.title;
        row.insertCell().textContent = book.author;
        row.insertCell().textContent = book.pages;
        row.insertCell().textContent = book.hasRead ? "Yes" : "No";

        const actionsCell = row.insertCell();

        const removeButton = document.createElement('button');
        removeButton.textContent = "Remove";
        removeButton.style.backgroundColor = "#f44336";
        removeButton.style.color = "white";
        removeButton.style.border = "none";
        removeButton.style.padding = "0.5em";
        removeButton.style.cursor = "pointer";
        removeButton.addEventListener('click', () => {
            myLibrary.splice(index, 1); // Remove the book
            renderLibraryTable(); // Re-render the table
        });
        actionsCell.appendChild(removeButton);

        const toggleReadButton = document.createElement('button');
        toggleReadButton.textContent = "Toggle Read";
        toggleReadButton.style.backgroundColor = "#008CBA";
        toggleReadButton.style.color = "white";
        toggleReadButton.style.border = "none";
        toggleReadButton.style.marginLeft = "0.5em";
        toggleReadButton.style.padding = "0.5em";
        toggleReadButton.style.cursor = "pointer";
        toggleReadButton.addEventListener('click', () => {
            book.hasRead = !book.hasRead; 
            renderLibraryTable(); 
        });
        actionsCell.appendChild(toggleReadButton);
    });

    container.appendChild(table);
}

// constructor used
const hobbit = new Book("The Hobbit", "James Wright", 300, false);
const dune = new Book("Dune", "Frank Herbert", 412, true);
const pride = new Book("Pride and Prejudice", "Jane Austen", 279, false);

// add to library used
addBookToLibrary(hobbit);
addBookToLibrary(dune);
addBookToLibrary(pride);

// library array in console

console.log(myLibrary)

// book info in console
for (let i = 0; i < myLibrary.length; i++) {
    console.log(myLibrary[i].info());
}

// form functions
const newBookBtn = document.getElementById('newBookButton');
const bookForm = document.getElementById('bookForm');

newBookBtn.addEventListener('click', () => {
    bookForm.classList.toggle('hidden');
});

bookForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const author = document.getElementById('author').value;
    const title = document.getElementById('title').value;
    const pages = parseInt(document.getElementById('pages').value, 10);
    const readStatus = document.getElementById('readStatus').value.toLowerCase() === "yes";

    if (!author || !title || isNaN(pages)) {
        alert("Please fill in all fields correctly.");
        return;
    }

    const newBook = new Book(title, author, pages, readStatus);

    addBookToLibrary(newBook);

    console.log(myLibrary);

    bookForm.reset();
});

renderLibraryTable();