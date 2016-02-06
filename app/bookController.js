/**
 * Created by Craig on 06/02/2016.
 */

import bookLoader from './bookLoader.js';

class BookController {
    constructor({ bookListView = null }){
        if(bookListView == null) throw "bookListView is required";

        this.bookListView = bookListView;
    }

    searchBooks({ query = null }) {

        return (bookLoader
                .loadBooks({ query, maxResults: 20 })
                .then(books => this.bookListView.render(books))
                .catch(error => this.bookListView.renderError(error))
        );

    }
}

export default BookController
