const myLibrary = [];

function Book(title, author, pages, hasRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.hasRead = hasRead;

    this.info = function() {
        const readStatus = this.hasRead ? "already read" : "not read yet";
        return `${this.title} by ${this.author}, ${this.pages} pages, ${readStatus}`;
    };
}

function addBookToLibrary(book) {
    myLibrary.push(book);
    console.log(`${book.title} has been added to the library.`);
}

const hobbit = new Book("The Hobbit", "James Wright", 300, false);
const dune = new Book("Dune", "Frank Herbert", 412, true);
const pride = new Book("Pride and Prejudice", "Jane Austen", 279, false);


addBookToLibrary(hobbit);
addBookToLibrary(dune);
addBookToLibrary(pride);

console.log(myLibrary)

for (let i = 0; i < myLibrary.length; i++) {
    console.log(myLibrary[i].info());
}

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