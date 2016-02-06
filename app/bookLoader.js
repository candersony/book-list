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

function loadBooks({ query = '', maxResults = 20, orderBy = 'newest'}){

    if(!query || query.length <= 0){
        return Promise.reject('query is required and must contain at least one character')
    }
    let url = `${googleBooksSearch}?q=${query}&maxResults=${maxResults}&orderBy=${orderBy}`;

    return xhr.getJson(url)
        .then(booksResult => booksResult.items.map(book => ({
            title: book.volumeInfo.title,
            description: limitString({ str: book.volumeInfo.description }),
            coverImage: book.volumeInfo.imageLinks.smallThumbnail
        })));
}

export default {
    loadBooks
}
