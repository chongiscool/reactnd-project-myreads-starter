import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import Book from './Book';

class ListBooks extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    onUpdateBookShelf: PropTypes.func.isRequired
  }

  render() {
    const {books, onUpdateBookShelf} = this.props;

    return (<div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          <div className="bookshelf">
            <h2 className="bookshelf-title">Currently Reading</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
                {
                  books.filter((book) => book.bookShelf === "currentlyReading")
                       .map((book) => (<li key={book.id} className='book-list-item'>
                    <Book book={book} onUpdateBookShelf={onUpdateBookShelf} />
                  </li>))
                }
              </ol>
            </div>
          </div>
          <div className="bookshelf">
            <h2 className="bookshelf-title">Want to Read</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
                {
                  books.filter((book) => book.bookShelf === "wantToRead")
                       .map((book) => (<li key={book.id} className='book-list-item'>
                    <Book book={book} onUpdateBookShelf={onUpdateBookShelf} />
                  </li>))
                }
              </ol>
            </div>
          </div>
          <div className="bookshelf">
            <h2 className="bookshelf-title">Read</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
                {
                  books.filter((book) => book.bookShelf === "read")
                       .map((book) => (<li key={book.id} className='book-list-item'>
                    <Book book={book} onUpdateBookShelf={onUpdateBookShelf} />
                  </li>))
                }
              </ol>
            </div>
          </div>
        </div>
      </div>
      <div className="open-search">
        <Link className="add-book" to="/search">Add a book</Link>
      </div>
    </div>);
  }
}

export default ListBooks;
