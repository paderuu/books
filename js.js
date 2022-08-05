const books = [];
const RENDER_EVENT = 'render-book'

document.addEventListener('DOMContentLoaded', function () {
  const submitForm = document.getElementById('inputBook');
  submitForm.addEventListener('submit', function (event) {
    event.preventDefault();
    addBook();
  });
});

function addBook() {
  const bookTitle = document.getElementById('inputBookTitle').value;
  const bookAut = document.getElementById('inputBookAuthor').value;
  const bookYear = document.getElementById('inputBookYear').value;

  const generateID = generateId();
  const bookList = generateBooksList(generateID, bookTitle, bookAut, bookYear, false);
  books.push(bookList);

  document.dispatchEvent(new Event(RENDER_EVENT));
}

document.addEventListener(RENDER_EVENT, function () {
  console.log(books);
});

function generateId() {
  return +new Date();
}

function generateBooksList(id, title, author, year, isComplete) {
  return {
    id,
    title,
    author,
    year,
    isComplete
  }
}

function makeBookList(bookList) {
  const textTitle = document.createElement('h2');
  textTitle.innerText = bookList.title;

  const textAuthor = document.createElement('p');
  textAuthor.innerText = bookList.author;

  const textYear = document.createElement('p');
  textYear.innerText = bookList.year;

  const textContainer = document.createElement('div');
  container.classList.add('item', 'shadow');
  container.append(textContainer);
  container.setAttribute('id', 'book-${bookList,id}');

  return container;
}

document.addEventListener(RENDER_EVENT, function () {

  const incompleteBOOKList = document.getElementById('incompleteBookshelfList');
  incompleteBOOKList.innerHTML = '';

  for (const bookItem of books) {
    const bookElement = makeBookList(bookItem);
    incompleteBOOKList.append(bookElement);
  }
});