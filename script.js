const myLibrary = [];

class Book {
    constructor(title, author, pages, hasRead) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.hasRead = hasRead;
    }

    info() {
        // if hasRead === true, print "already read", otherwise print "not read yet"
        const readStatus = (this.hasRead === true) ? "already read" : "not read yet";
        return `${this.title} by ${this.author}, ${this.pages} pages, ${readStatus}`;
    }
}

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

    // create table headers
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
        // if hasRead = true, print "Yes", otherwise print "No"
        row.insertCell().textContent = book.hasRead ? "Yes" : "No";

        //logic for the remove button
        const actionsCell = row.insertCell();
        const removeButton = document.createElement('button');
        removeButton.classList.add("remove-button");
        removeButton.textContent = "Remove";

        removeButton.addEventListener('click', () => {
            myLibrary.splice(index, 1); // Remove the book
            renderLibraryTable(); // Re-render the table
        });
        
        actionsCell.appendChild(removeButton);

        // logic for toggle read status button
        const toggleReadButton = document.createElement('button');
        toggleReadButton.textContent = "Toggle Read Status";
        toggleReadButton.classList.add("toggle-button");

        toggleReadButton.addEventListener('click', () => {
            book.hasRead = !book.hasRead; 
            renderLibraryTable(); 
        });

        actionsCell.appendChild(toggleReadButton);

        container.appendChild(table);
    });
}

// class instantiation
const hobbit = new Book("The Hobbit", "James Wright", 300, false)
const dune = new Book("Dune", "Frank Herbert", 412, true)
const pride = new Book("Pride and Prejudice", "Jane Austen", 279, false)

addBookToLibrary(hobbit);
addBookToLibrary(dune);
addBookToLibrary(pride);

// log info for each book
myLibrary.forEach(book => {
    console.log(book.info());
});

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