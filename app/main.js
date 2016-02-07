/**
 * Created by Craig on 05/02/2016.
 */

import './style.less';
import BookController from './bookController.js';
import BookListView from './bookListView.js';
import SearchView from './searchView.js';

function startApplication() {
  let bookListView = new BookListView({containerElement: document.getElementById('book-list-container')});
  let bookController = new BookController({bookListView: bookListView});
  let searchView = new SearchView({
    inputElement: document.getElementById('book-search-input'),
    bookController: bookController,
    defaultValue: 'javascript'
  });
}

window.onload = startApplication;
