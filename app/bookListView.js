/**
 * Created by Craig on 06/02/2016.
 */

class bookListView {
    constructor({ containerElement }) {
        this.containerElement = containerElement;
        this.listElement = document.createElement('ul');
        this.listElement.className = 'book-list';

        this.containerElement.appendChild(this.listElement);
    }

    render(books){
        this.listElement.innerHTML = books.map(book => `
      <li class="book">
          <div class="book-inner">
              <div class="book-img"><img src="${book.coverImage}"></div>
                  <div class="book-text">
                      <h3 class="book-title">${book.title}</h3>
                      <p class="book-description">${book.description}</p>
                  </div>
              </div>
          </li>
          `).join('');
    }

    renderError(error){
        console.error(error);
    }
}

export default bookListView
