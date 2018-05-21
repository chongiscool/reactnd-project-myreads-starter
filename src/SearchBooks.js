import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {PropTypes} from 'prop-types';
//import escapeRegExp from 'escape-string-regexp';
//import sortBy from 'sort-by';
import * as BooksAPI from './BooksAPI';

class SearchBooks extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired
  }

  state = {
    booksBySearched: [],
    query: ''
  }

  updateQuery(query) {
    console.log(query);
    this.searchBooks(query)
  }

  clearQuery() {
    console.log('clear query');
    this.setState({
      query: '',
      booksBySearched: []
    });
  }

  searchBooks(query) {
    this.setState({query: query});

    if (query.trim() !== '') {
      BooksAPI.search(query).then((rawBooks) => {
        if (rawBooks !== []) {
          const booksBySearched = rawBooks.map((rawBook) => ({
            //imageURL: rawBook.imageLinks.smallThumbnail,
            imageURL: rawBook.imageLinks && rawBook.imageLinks.smallThumbnail ? rawBook.imageLinks.smallThumbnail : 'http://via.placeholder.com/128x193?text=No%20Cover',
            authors: rawBook.authors,
            bookName: rawBook.title,
            id: rawBook.id,
            bookShelf: "none"}));
          this.setState({booksBySearched: booksBySearched});
        } else {
          this.setState({booksBySearched: []});
        }
      });
    } else {
      this.setState({booksBySearched: []});
    }
  }

  handleChange(event, book) {
    book.bookShelf = event.target.value;
    this.props.onUpdateBookShelf(book);
  }

  render() {
    const {query, booksBySearched} = this.state;
    const {books} = this.props;

    if (query && books !== []) {
      // const match = new RegExp(escapeRegExp(query), 'i');
      // matchedBooks = books.filter((book) => match.test(book.bookName));
      for (let i = 0; i < books.length; i++) {
        const constBook = books[i];
        booksBySearched.map((book) => {
          if (book.id === books[i].id) {
            book.bookShelf = constBook.bookShelf;
          }
          return book;
        });
      }
    }

    return (<div className="search-books">
      <div className="search-books-bar">
        <Link className="close-search" to='/'>Close</Link>
        <div className="search-books-input-wrapper">
          {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */
          }
          <input
          type="text"
          placeholder="Search by title or author"
          value={query}
          onChange={(event) => this.updateQuery(event.target.value)}/>
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          {
            booksBySearched.map((book) => (<li key={book.id} className='book-list-item'>
              <div className="book">
                <div className="book-top">
                  <div className="book-cover" style={{
                      width: 128,
                      height: 193,
                      backgroundImage: `url(${book.imageURL})`
                    }}></div>
                  <div className="book-shelf-changer">
                    <select value={book.bookShelf} onChange={(event) => (this.handleChange(event, book))}>
                      <option value="moveTo" disabled="disabled">Move to...</option>
                      <option value="currentlyReading">Currently Reading</option>
                      <option value="wantToRead">Want to Read</option>
                      <option value="read">Read</option>
                      <option value="none">None</option>
                    </select>
                  </div>
                </div>
                <div className="book-title">{book.bookName}</div>
                <div className="book-authors">{book.authors}</div>
              </div>
            </li>))
          }
        </ol>
      </div>
    </div>);
  }
}

export default SearchBooks;
