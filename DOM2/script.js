let books = [];
let sortAsc = true;

const imgUrl = "https://m.media-amazon.com/images/I/71ZB18P3inL._SY522_.jpg";

const form = document.getElementById("bookForm");
const booksContainer = document.getElementById("booksContainer");
const sortBtn = document.getElementById("sortBtn");
const filterSelect = document.getElementById("filterSelect");

// ADD BOOK
form.addEventListener("submit", function(e) {
  e.preventDefault();

  const book = {
    title: document.getElementById("title").value,
    author: document.getElementById("author").value,
    category: document.getElementById("category").value,
    imageUrl: imgUrl
  };

  books.push(book);
  form.reset();
  renderBooks();
});

// SORT BOOKS
sortBtn.addEventListener("click", function() {
  sortAsc = !sortAsc;
  sortBtn.textContent = sortAsc ? "Sort A → Z" : "Sort Z → A";

  books.sort((a, b) =>
    sortAsc
      ? a.title.localeCompare(b.title)
      : b.title.localeCompare(a.title)
  );

  renderBooks();
});

// FILTER BOOKS
filterSelect.addEventListener("change", function() {
  renderBooks();
});

function renderBooks() {
  const filter = filterSelect.value;
  booksContainer.innerHTML = "";

  let filteredBooks =
    filter === "All" ? books : books.filter(b => b.category === filter);

  filteredBooks.forEach((book, index) => {
    const card = document.createElement("div");
    card.className = "book-card";

    card.innerHTML = `
      <img src="${book.imageUrl}" alt="book">
      <h3>${book.title}</h3>
      <p><b>Author:</b> ${book.author}</p>
      <p><b>Category:</b> ${book.category}</p>
      <button class="delete-btn" onclick="deleteBook(${index})">Delete</button>
    `;

    booksContainer.appendChild(card);
  });
}

// DELETE BOOK
function deleteBook(i) {
  books.splice(i, 1);
  renderBooks();
}
