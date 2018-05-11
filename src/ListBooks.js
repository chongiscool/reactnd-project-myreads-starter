import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types'

class ListBooks extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired
  }

  render() {
    const {books} = this.props;
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
                       .map((book) => (<li key={book.bookId} className='book-list-item'>
                    <div className="book">
                      <div className="book-top">
                        <div className="book-cover" style={{
                            width: 128,
                            height: 193,
                            backgroundImage: `url(${book.imageURL})`
                          }}></div>
                        <div className="book-shelf-changer">
                          <select defaultValue="currentlyReading">
                            <option value="none" disabled="disabled">Move to...</option>
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
          </div>
          <div className="bookshelf">
            <h2 className="bookshelf-title">Want to Read</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
                {
                  books.filter((book) => book.bookShelf === "wantToRead").map((book) => (<li key={book.bookId} className='book-list-item'>
                    <div className="book">
                      <div className="book-top">
                        <div className="book-cover" style={{
                            width: 128,
                            height: 193,
                            backgroundImage: `url(${book.imageURL})`
                          }}></div>
                        <div className="book-shelf-changer">
                          <select defaultValue="wantToRead">
                            <option value="none" disabled="disabled">Move to...</option>
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
          </div>
          <div className="bookshelf">
            <h2 className="bookshelf-title">Read</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
                {
                  books.filter((book) => book.bookShelf === "read").map((book) => (<li key={book.bookId} className='book-list-item'>
                    <div className="book">
                      <div className="book-top">
                        <div className="book-cover" style={{
                            width: 128,
                            height: 193,
                            backgroundImage: `url(${book.imageURL})`
                          }}></div>
                        <div className="book-shelf-changer">
                          <select defaultValue="read">
                            <option value="none" disabled="disabled">Move to...</option>
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
