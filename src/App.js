import React from 'react'
import { Route } from 'react-router-dom'
// import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import ListBooks from './ListBooks'
import SearchBooks from './SearchBooks'
import './App.css'

class BooksApp extends React.Component {
  state = {
    books: []
  }

  updateBookShelf = (book) => {
    this.setState((state) => ({
        books: state.books.filter((element) => (element.id !== book.id)).concat([ book ])
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
        id: rawBook.id,
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
          <SearchBooks books={this.state.books} onSearchBooks={this.searchBooks} onUpdateBookShelf={this.updateBookShelf}/>
        )} />
        <Route exact path='/' render={() => (
          <ListBooks books={this.state.books} onUpdateBookShelf={this.updateBookShelf}/>
        )} />
      </div>
    )
  }
}

export default BooksApp
