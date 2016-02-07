/**
 * Created by Craig on 06/02/2016.
 */

import xhr from './xhr.js';

const googleBooksSearch = "https://www.googleapis.com/books/v1/volumes";

function limitString({ str, maxLength = 200}) {
    let limitedString = str.substring(0, maxLength);
    let indexOfLastSpace = limitedString.lastIndexOf(' ');

    return limitedString.substring(0, indexOfLastSpace);
}

/**
 * @typedef Book
 * @property {string} title - The title of the book
 * @property {string} description - The description of the book, limited to 200 characters
 * @property {string} coverImage - The cover image url of the book
 */
class Book {
    constructor({title, description, coverImage}){
        this.title = title;
        this.description = limitString({ str: description, maxLength: 200 });
        this.coverImage = coverImage;
    }
}

/**
 * Loads books from the google api
 *
 * @param {string} query - The full-text search query string. This is required and must not be an empty string.
 * @param {number} [maxResults = 20] - The number of results to fetch from google
 * @param {string} [orderBy = 'newset'] - The order of the results. Possible values are 'newest' or 'relevance'
 * @returns {Promise<Book[]|Error>}
 */
function loadBooks({ query, maxResults = 20, orderBy = 'newest'}){

    if(!query || !query.trim()){
        return Promise.reject('query is required and must contain at least one character')
    }
    let url = `${googleBooksSearch}?q=${query}&maxResults=${maxResults}&orderBy=${orderBy}`;

    return xhr.getJson(url)
        .then(booksResult => booksResult.items.map(book => new Book({
            title: book.volumeInfo.title,
            description: book.volumeInfo.description,
            coverImage: book.volumeInfo.imageLinks.smallThumbnail
        })));
}

export default {
    loadBooks
}
