import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Book extends Component {
  static propTypes = {
    book: PropTypes.object.isRequired
  }

  state = {
    value: ""
  }

  handleChange(event, book) {
    book.bookShelf = event.target.value;
    this.props.onUpdateBookShelf(book);
  }

  render() {
    const {book} = this.props;

    return (
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
        <div className="book-authors">{Array.isArray(book.authors)?book.authors.join(', '):''}</div>
      </div>
    );
  }
}

export default Book;
