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