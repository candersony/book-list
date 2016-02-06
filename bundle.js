/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _bookController = __webpack_require__(1);

	var _bookController2 = _interopRequireDefault(_bookController);

	var _bookListView = __webpack_require__(4);

	var _bookListView2 = _interopRequireDefault(_bookListView);

	var _searchView = __webpack_require__(5);

	var _searchView2 = _interopRequireDefault(_searchView);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function startApplication() {
	  var bookListView = new _bookListView2.default({ containerElement: document.getElementById('book-list-container') });
	  var bookController = new _bookController2.default({ bookListView: bookListView });
	  var searchView = new _searchView2.default({
	    inputElement: document.getElementById('book-search-input'),
	    bookController: bookController,
	    defaultValue: 'javascript'
	  });
	} /**
	   * Created by Craig on 05/02/2016.
	   */

	window.onload = startApplication;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Created by Craig on 06/02/2016.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _bookLoader = __webpack_require__(2);

	var _bookLoader2 = _interopRequireDefault(_bookLoader);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var BookController = function () {
	    function BookController(_ref) {
	        var _ref$bookListView = _ref.bookListView;
	        var bookListView = _ref$bookListView === undefined ? null : _ref$bookListView;

	        _classCallCheck(this, BookController);

	        if (bookListView == null) throw "bookListView is required";

	        this.bookListView = bookListView;
	    }

	    _createClass(BookController, [{
	        key: "searchBooks",
	        value: function searchBooks(_ref2) {
	            var _this = this;

	            var _ref2$query = _ref2.query;
	            var query = _ref2$query === undefined ? null : _ref2$query;

	            return _bookLoader2.default.loadBooks({ query: query, maxResults: 20 }).then(function (books) {
	                return _this.bookListView.render(books);
	            }).catch(function (error) {
	                return _this.bookListView.renderError(error);
	            });
	        }
	    }]);

	    return BookController;
	}();

	exports.default = BookController;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _xhr = __webpack_require__(3);

	var _xhr2 = _interopRequireDefault(_xhr);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var googleBooksSearch = "https://www.googleapis.com/books/v1/volumes"; /**
	                                                                        * Created by Craig on 06/02/2016.
	                                                                        */

	function limitString(_ref) {
	    var str = _ref.str;
	    var _ref$maxLength = _ref.maxLength;
	    var maxLength = _ref$maxLength === undefined ? 200 : _ref$maxLength;

	    var limitedString = str.substring(0, maxLength);
	    var indexOfLastSpace = limitedString.lastIndexOf(' ');

	    return limitedString.substring(0, indexOfLastSpace);
	}

	function loadBooks(_ref2) {
	    var _ref2$query = _ref2.query;
	    var query = _ref2$query === undefined ? '' : _ref2$query;
	    var _ref2$maxResults = _ref2.maxResults;
	    var maxResults = _ref2$maxResults === undefined ? 20 : _ref2$maxResults;
	    var _ref2$orderBy = _ref2.orderBy;
	    var orderBy = _ref2$orderBy === undefined ? 'newest' : _ref2$orderBy;

	    if (!query || query.length <= 0) {
	        return Promise.reject('query is required and must contain at least one character');
	    }
	    var url = googleBooksSearch + '?q=' + query + '&maxResults=' + maxResults + '&orderBy=' + orderBy;

	    return _xhr2.default.getJson(url).then(function (booksResult) {
	        return booksResult.items.map(function (book) {
	            return {
	                title: book.volumeInfo.title,
	                description: limitString({ str: book.volumeInfo.description }),
	                coverImage: book.volumeInfo.imageLinks.smallThumbnail
	            };
	        });
	    });
	}

	exports.default = {
	    loadBooks: loadBooks
	};

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/**
	 * Created by Craig on 06/02/2016.
	 */

	function get(url) {
	  return new Promise(function (resolve, reject) {
	    var request = new XMLHttpRequest();
	    request.open('GET', url);

	    request.onload = function () {
	      if (request.status == 200) {
	        resolve(request.response);
	      } else {
	        reject(Error(request.statusText));
	      }
	    };

	    request.onerror = function () {
	      reject(Error("Network Error"));
	    };

	    request.send();
	  });
	}

	function getJson(url) {
	  return get(url).then(function (responseText) {
	    return JSON.parse(responseText);
	  });
	}

	exports.default = {
	  get: get,
	  getJson: getJson
	};

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * Created by Craig on 06/02/2016.
	 */

	var bookListView = function () {
	    function bookListView(_ref) {
	        var containerElement = _ref.containerElement;

	        _classCallCheck(this, bookListView);

	        this.containerElement = containerElement;
	        this.listElement = document.createElement('ul');
	        this.listElement.className = 'book-list';

	        this.containerElement.appendChild(this.listElement);
	    }

	    _createClass(bookListView, [{
	        key: 'render',
	        value: function render(books) {
	            this.listElement.innerHTML = books.map(function (book) {
	                return '\n      <li class="book">\n          <div class="book-inner">\n              <div class="book-img"><img src="' + book.coverImage + '"></div>\n                  <div class="book-text">\n                      <h3 class="book-title">' + book.title + '</h3>\n                      <p class="book-description">' + book.description + '</p>\n                  </div>\n              </div>\n          </li>\n          ';
	            }).join('');
	        }
	    }, {
	        key: 'renderError',
	        value: function renderError(error) {
	            console.error(error);
	        }
	    }]);

	    return bookListView;
	}();

	exports.default = bookListView;

/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * Created by Craig on 06/02/2016.
	 */

	var SearchView = function () {
	  function SearchView(_ref) {
	    var inputElement = _ref.inputElement;
	    var bookController = _ref.bookController;
	    var defaultValue = _ref.defaultValue;

	    _classCallCheck(this, SearchView);

	    this.inputElelemnt = inputElement;
	    this.bookController = bookController;

	    this.inputElelemnt.oninput = this.onInput.bind(this);

	    if (!!defaultValue) {
	      this.inputElelemnt.value = defaultValue;
	      this.onInput();
	    }
	  }

	  _createClass(SearchView, [{
	    key: "onInput",
	    value: function onInput() {
	      var searchTerm = this.inputElelemnt.value;
	      this.bookController.searchBooks({ query: searchTerm });
	    }
	  }]);

	  return SearchView;
	}();

	exports.default = SearchView;

/***/ }
/******/ ]);