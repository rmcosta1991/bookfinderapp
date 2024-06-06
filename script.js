const form = document.querySelector('form');
const input = document.querySelector('input[type="text"]');
const results = document.querySelector('.results');

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const query = input.value;
  const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
  const data = await response.json();

  if (data.totalItems > 0) {
    results.innerHTML = data.items.map((book) => {
      return `
        <div class="book">
          <img src="${book.volumeInfo.imageLinks?.thumbnail}" alt="${book.volumeInfo.title}">
          <h2>${book.volumeInfo.title}</h2>
          <p>${book.volumeInfo.authors?.join(', ')}</p>
          <p>${book.volumeInfo.publishedDate}</p>
        </div>
      `;
    }).join('');
  } else {
    results.innerHTML = '<p>No result found</p>';
  }
});
