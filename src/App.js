import React from 'react'
import { Route } from 'react-router-dom'
// import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import ListBooks from './ListBooks'
import SearchBooks from './SearchBooks'
import './App.css'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
    books: []
  }

  updateBookShelf = (book) => {
    this.setState((state) => ({
        books: state.books.filter((element) => (element.bookId !== book.bookId)).concat([ book ])
    }));
    // update onw book's shelf of server
    BooksAPI.update(book, book.bookShelf);
  }

  componentDidMount() {
    BooksAPI.getAll().then((rawBooks) => {
      const books = rawBooks.map((rawBook) => ({
        imageURL: rawBook.imageLinks.smallThumbnail,
        authors: rawBook.authors,
        bookName: rawBook.title,
        bookId: rawBook.id,
        bookShelf: rawBook.shelf
        })
      );
      this.setState({books: books});
    });
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/search' render={() => (
          <SearchBooks />
        )} />
        <Route exact path='/' render={() => (
          <ListBooks books={this.state.books} onUpdateBookShelf={this.updateBookShelf}/>
        )} />
      </div>
    )
  }
}

export default BooksApp
