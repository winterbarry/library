const myLibrary = [];

function Book(title, author, pages, hasRead) {
  this.title = title;
  this.author = author;
  this. pages = pages;
  this.hasRead = hasRead;

  this.info = function() {
    const readStatus = this.hasRead ? "already read" : "not read yet";
    return `${this.title} by ${this.author}, ${this.pages} pages, ${readStatus}`;
};
}

function addBookToLibrary(book) {
    library.push(book);
    console.log(`${book.title} has been added to the library.`);
}