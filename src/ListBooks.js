import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class ListBooks extends Component {
  state = {
    books: [
      {
        // json: smallThumbnail of {object}
        imageURL: "http://books.google.com/books/content?id=PGR2AwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73-GnPVEyb7MOCxDzOYF1PTQRuf6nCss9LMNOSWBpxBrz8Pm2_mFtWMMg_Y1dx92HT7cUoQBeSWjs3oEztBVhUeDFQX6-tWlWz1-feexS0mlJPjotcwFqAg6hBYDXuK_bkyHD-y&source=gbs_api",
        authors: ["Harper Lee"], // json: authors[]
        bookName: "To Kill a Mockingbird", // json: title
        bookId: "a1", // fake data now, json: id
        bookShelf: "currentlyReading" // json: shelf
      }, {
        imageURL: "http://books.google.com/books/content?id=yDtCuFHXbAYC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72RRiTR6U5OUg3IY_LpHTL2NztVWAuZYNFE8dUuC0VlYabeyegLzpAnDPeWxE6RHi0C2ehrR9Gv20LH2dtjpbcUcs8YnH5VCCAH0Y2ICaKOTvrZTCObQbsfp4UbDqQyGISCZfGN&source=gbs_api",
        authors: ["Orson Scott Card"],
        bookName: "Ender's Game",
        bookId: "a2",
        bookShelf: "currentlyReading"
      }, {
        imageURL: "http://books.google.com/books/content?id=uu1mC6zWNTwC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73pGHfBNSsJG9Y8kRBpmLUft9O4BfItHioHolWNKOdLavw-SLcXADy3CPAfJ0_qMb18RmCa7Ds1cTdpM3dxAGJs8zfCfm8c6ggBIjzKT7XR5FIB53HHOhnsT7a0Cc-PpneWq9zX&source=gbs_api",
        authors: ["David McCullough"],
        bookName: "1776",
        bookId: "a3",
        bookShelf: "wantToRead"
      }, {
        imageURL: "http://books.google.com/books/content?id=wrOQLV6xB-wC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72G3gA5A-Ka8XjOZGDFLAoUeMQBqZ9y-LCspZ2dzJTugcOcJ4C7FP0tDA8s1h9f480ISXuvYhA_ZpdvRArUL-mZyD4WW7CHyEqHYq9D3kGnrZCNiqxSRhry8TiFDCMWP61ujflB&source=gbs_api",
        authors: ["J.K. Rowling"],
        bookName: "Harry Potter and the Sorcerer's Stone",
        bookId: "a4",
        bookShelf: "wantToRead"
      }, {
        imageURL: "http://books.google.com/books/content?id=pD6arNyKyi8C&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE70Rw0CCwNZh0SsYpQTkMbvz23npqWeUoJvVbi_gXla2m2ie_ReMWPl0xoU8Quy9fk0Zhb3szmwe8cTe4k7DAbfQ45FEzr9T7Lk0XhVpEPBvwUAztOBJ6Y0QPZylo4VbB7K5iRSk&source=gbs_api",
        authors: ["J.R.R. Tolkien"],
        bookName: "The Hobbit",
        bookId: "a5",
        bookShelf: "read"
      }, {
        imageURL: "http://books.google.com/books/content?id=1q_xAwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE712CA0cBYP8VKbEcIVEuFJRdX1k30rjLM29Y-dw_qU1urEZ2cQ42La3Jkw6KmzMmXIoLTr50SWTpw6VOGq1leINsnTdLc_S5a5sn9Hao2t5YT7Ax1RqtQDiPNHIyXP46Rrw3aL8&source=gbs_api",
        authors: ["Seuss"],
        bookName: "Oh, the Places You'll Go!",
        bookId: "a6",
        bookShelf: "read"
      }, {
        imageURL: "http://books.google.com/books/content?id=32haAAAAMAAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72yckZ5f5bDFVIf7BGPbjA0KYYtlQ__nWB-hI_YZmZ-fScYwFy4O_fWOcPwf-pgv3pPQNJP_sT5J_xOUciD8WaKmevh1rUR-1jk7g1aCD_KeJaOpjVu0cm_11BBIUXdxbFkVMdi&source=gbs_api",
        authors: ["Mark Twain"],
        bookName: "The Adventures of Tom Sawyer",
        bookId: "a7",
        bookShelf: "read"
      }
    ]
  }

  render() {
    const {books} = this.state;
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
