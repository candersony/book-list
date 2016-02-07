/**
 * Created by Craig on 06/02/2016.
 */

import bookLoader from '../app/bookLoader.js';
import bookResponse from './test-responses/books-response.js';
import bookResponseData from './test-responses/books.json';

describe('the book loader', () => {

  beforeEach(() => {
    jasmine.Ajax.install();
  });

  afterEach(() => {
    jasmine.Ajax.uninstall();
  });

  function callLoadBooks(args) {
    bookLoader.loadBooks.call(bookLoader, args);

    let request = jasmine.Ajax.requests.mostRecent();
    request.respondWith(bookResponse);

    return request;
  }

  it('should request books with the specified query text', () => {

    let request = callLoadBooks({query: 'javascript'});

    expect(request.url).toContain('q=javascript');

  });

  it('should not request books with an empty query text', (done) => {

    bookLoader.loadBooks({query: ''})
      .then(() => done('The book loader should not request books with an empty query text'))
      .catch(error => {
        expect(error).toBeDefined();
        done()
      });

  });

  it('should request books with the specified results limit', () => {

    let request = callLoadBooks({query: 'javascript', maxResults: 20});

    expect(request.url).toContain('maxResults=20');

  });

  it('should order the results as specified', () => {

    let request = callLoadBooks({query: 'javascript', orderBy: 'newest'});

    expect(request.url).toContain('orderBy=newest');

  });

  it('should return an array of books', (done) => {

    bookLoader.loadBooks({query: 'javascript', maxResults: 20})
      .then(books => {
        expect(Object.prototype.toString.call(books)).toBe('[object Array]');
        expect(books.length).toBe(20);

        done();
      })
      .catch(done);

    jasmine.Ajax.requests.mostRecent().respondWith(bookResponse);

  });

  it('should return books with a title', (done) => {

    bookLoader.loadBooks({query: 'javascript', maxResults: 20})
      .then(books => {
        books.forEach(book => {
          expect(book.title).toBeDefined();
          expect(typeof book.title).toBe('string');
        });

        done();
      })
      .catch(done);

    jasmine.Ajax.requests.mostRecent().respondWith(bookResponse);

  });

  it('should return books with a description no longer than 200 characters', (done) => {

    bookLoader.loadBooks({query: 'javascript', maxResults: 20})
      .then(books => {
        books.forEach(book => {

          expect(book.description).toBeDefined();
          expect(typeof book.description).toBe('string');
          expect(book.description.length).toBeLessThan(200);

        });

        done();
      })
      .catch(done);

    jasmine.Ajax.requests.mostRecent().respondWith(bookResponse);


  });

  it('should return books with a cover image', (done) => {

    bookLoader.loadBooks({query: 'javascript', maxResults: 20})
      .then(books => {

        books.forEach(book => {

          expect(book.coverImage).toBeDefined();
          expect(typeof book.coverImage).toBe('string');

        });

        done();
      })
      .catch(done);

    jasmine.Ajax.requests.mostRecent().respondWith(bookResponse);

  });
});
