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

// document.addEventListener(RENDER_EVENT, function () {
//   console.log(books);
// });

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
  textContainer.classList.add('inner');
  textContainer.append(textTitle, textAuthor, textYear);

  const container = document.createElement('div');
  container.classList.add('book_item', 'shadow');
  container.append(textContainer);
  container.setAttribute('id', `book-${bookList.id}`);

  if (bookList.isComplete) {
    const undoButton = document.createElement('button');
    undoButton.classList.add('undo-button');

    undoButton.addEventListener('click', function () {
      undoTaskFromComplete(bookList.id);
    });

    const trashButton = document.createElement('button');
    trashButton.classList.add('trash-button');

    trashButton.addEventListener('click', function () {
      removeTaskFromCompleted(bookList.id);
    });

    container.append(undoButton, trashButton);

  } else {
    const checkButton = document.createElement('button');
    checkButton.classList.add('check-button');

    checkButton.addEventListener('click', function () {
      addTaskCompleted(bookList.id);
    });

    container.append(checkButton);
  }

  return container;
}

document.addEventListener(RENDER_EVENT, function () {

  const incompleteBOOKList = document.getElementById('incompleteBookshelfList');
  incompleteBOOKList.innerHTML = '';

  const completeBOOKList = document.getElementById('completeBookshelfList');
  completeBOOKList.innerHTML = '';

  for (const bookItem of books) {
    const bookElement = makeBookList(bookItem);
    if (!bookItem.isComplete) {
      incompleteBOOKList.append(bookElement);
    }
    else {
      completeBOOKList.append(bookElement);
    }
  }
});

function addTaskCompleted(bookId) {
  const bookTarget = findBook(bookId);

  if (bookTarget == null) return;

  bookTarget.isCompleted = true;
  document.dispatchEvent(new Event(RENDER_EVENT));
}

function findBook(bookId) {
  for (const bookItem of books) {
    if (bookItem.id === bookId) {
      return bookItem;
    }
  }

  return null;
}

