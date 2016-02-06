/**
 * Created by Craig on 06/02/2016.
 */

import books from './books.json'

export default {
  status: 200,
  statusText: 'HTTP/1.1 200 OK',
  contentType: 'application/json; charset=UTF-8',
  responseText: JSON.stringify(books)
}
