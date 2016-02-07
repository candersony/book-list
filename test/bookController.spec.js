/**
 * Created by Craig on 06/02/2016.
 */

import BookController from '../app/bookController.js';
import bookResponse from './test-responses/books-response.js';

describe('the book controller', () => {

  let bookController;
  let mockBookListView;


  beforeEach(() => {
    jasmine.Ajax.install();

    mockBookListView = {
      render: function () {
        return Promise.resolve(true);
      },
      renderError: function () {
        return Promise.resolve(true);
      }
    };

    spyOn(mockBookListView, 'render');
    spyOn(mockBookListView, 'renderError');

    bookController = new BookController({bookListView: mockBookListView})
  });

  afterEach(() => {
    jasmine.Ajax.uninstall();
  });

  it('should fetch 20 books at a time', (done) => {

    bookController.searchBooks({query: 'javascript'})
      .then(books => {
        expect(books.length).toBeLessThan(21);
        done()
      })
      .catch(done);

    jasmine.Ajax.requests.mostRecent().respondWith(bookResponse);

  });

  it('should render books to the book list view', (done) => {

    bookController.searchBooks({query: 'javascript'})
      .then(() => {
        expect(mockBookListView.render).toHaveBeenCalled();
        done()
      })
      .catch(done);

    jasmine.Ajax.requests.mostRecent().respondWith(bookResponse);
  });
});
