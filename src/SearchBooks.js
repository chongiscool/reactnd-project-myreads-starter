import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {PropTypes} from 'prop-types';
//import escapeRegExp from 'escape-string-regexp';
//import sortBy from 'sort-by';
import * as BooksAPI from './BooksAPI';
import Book from './Book';
import {DebounceInput} from 'react-debounce-input';

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
        if (Array.isArray(rawBooks)) {
          const booksBySearched = rawBooks.map((rawBook) => ({
            //imageURL: rawBook.imageLinks.smallThumbnail,
            imageURL: rawBook.imageLinks && rawBook.imageLinks.smallThumbnail ? rawBook.imageLinks.smallThumbnail : 'http://via.placeholder.com/128x193?text=No%20Cover',
            authors: rawBook.authors,
            bookName: rawBook.title,
            id: rawBook.id,
            bookShelf: "none"}));
          this.setState({booksBySearched: booksBySearched});
        } else {
          console.log(rawBooks);
          this.setState({booksBySearched: rawBooks});
        }
      });
    } else {
      this.setState({booksBySearched: []});
    }
  }

  render() {
    const {query, booksBySearched} = this.state;
    const {books, onUpdateBookShelf} = this.props;

    if (query && books !== [] && Array.isArray(booksBySearched)) {
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

          <DebounceInput
            minLength={2}
            debounceTimeout={1500}
            type='text'
            placeholder='Search by title or author'
            value={query}
            onChange={(event) => this.updateQuery(event.target.value)} />
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          {
            Array.isArray(booksBySearched) ? booksBySearched.map((book) => (<li key={book.id} className='book-list-item'>
              <Book book={book} onUpdateBookShelf={onUpdateBookShelf} />
            </li>)) : (<li key={100} className='no-result-found'>No Result Found</li>)
          }
        </ol>
      </div>
    </div>);
  }
}

export default SearchBooks;
