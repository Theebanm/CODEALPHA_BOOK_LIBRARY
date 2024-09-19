document.getElementById("add-book-btn").addEventListener("click", addBook);
document.getElementById("search").addEventListener("keyup", searchBooks);

let bookList = [];
let borrowingHistory = [];

function addBook() {
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const category = document.getElementById("category").value;

  if (title && author && category) {
    const book = {
      title,
      author,
      category,
      borrowed: false,
    };

    bookList.push(book);
    displayBooks();
    clearForm();
  }
}

function displayBooks() {
  const bookContainer = document.getElementById("books");
  bookContainer.innerHTML = "";

  bookList.forEach((book, index) => {
    const bookItem = document.createElement("li");
    bookItem.innerHTML = `
            <strong>${book.title}</strong> by ${book.author} <em>(${
      book.category
    })</em>
            <button onclick="borrowBook(${index})">${
      book.borrowed ? "Return" : "Borrow"
    }</button>
        `;
    bookContainer.appendChild(bookItem);
  });
}

function clearForm() {
  document.getElementById("title").value = "";
  document.getElementById("author").value = "";
  document.getElementById("category").value = "";
}

function searchBooks() {
  const searchValue = document.getElementById("search").value.toLowerCase();
  const filteredBooks = bookList.filter((book) => {
    return (
      book.title.toLowerCase().includes(searchValue) ||
      book.author.toLowerCase().includes(searchValue) ||
      book.category.toLowerCase().includes(searchValue)
    );
  });

  displayFilteredBooks(filteredBooks);
}

function displayFilteredBooks(books) {
  const bookContainer = document.getElementById("books");
  bookContainer.innerHTML = "";

  books.forEach((book, index) => {
    const bookItem = document.createElement("li");
    bookItem.innerHTML = `
            <strong>${book.title}</strong> by ${book.author} <em>(${
      book.category
    })</em>
            <button onclick="borrowBook(${index})">${
      book.borrowed ? "Return" : "Borrow"
    }</button>
        `;
    bookContainer.appendChild(bookItem);
  });
}

function borrowBook(index) {
  const book = bookList[index];
  book.borrowed = !book.borrowed;

  // Add to borrowing history
  borrowingHistory.push({
    title: book.title,
    date: new Date().toLocaleString(),
    action: book.borrowed ? "Borrowed" : "Returned",
  });

  displayBooks();
  displayHistory();
}

function displayHistory() {
  const historyContainer = document.getElementById("history");
  historyContainer.innerHTML = "";

  borrowingHistory.forEach((entry) => {
    const historyItem = document.createElement("li");
    historyItem.textContent = `${entry.title} - ${entry.action} on ${entry.date}`;
    historyContainer.appendChild(historyItem);
    alert("Today a reader, tomorrow a leader.");
  });
}
