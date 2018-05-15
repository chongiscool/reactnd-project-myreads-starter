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
        books: state.books.filter((element) => (element.id !== book.id)).concat([ book ])
    }));
    // update onw book's shelf of server
    BooksAPI.update(book, book.bookShelf);
  }

  /*refactorBooksArray(booksArray, defaultShelf) {
    // one time if statement check, forever.
    if (defaultShelf === 'none') {
       return booksArray.map((rawBook) => ({
          imageURL: rawBook.imageLinks.smallThumbnail,
          authors: rawBook.authors,
          bookName: rawBook.title,
          id: rawBook.id,
          bookShelf: defaultShelf
        }));
    } else {
      return booksArray.map((rawBook) => ({
        imageURL: rawBook.imageLinks.smallThumbnail,
        authors: rawBook.authors,
        bookName: rawBook.title,
        id: rawBook.id,
        bookShelf: rawBook.shelf
      }));
    }
  }*/
  // searchBooks(query) {
  //   console.log("got search: "+query);
    // BooksAPI.search(query).then((rawBooks) => {
    //   // console.log(rawBooks);
    //   const booksBySearched = rawBooks.map((rawBook) => ({
    //     imageURL: rawBook.imageLinks.smallThumbnail,
    //     authors: rawBook.authors,
    //     bookName: rawBook.title,
    //     id: rawBook.id,
    //     bookShelf: "none"
    //     })
    //   );
    //   console.log(booksBySearched);
    //   this.setState({booksBySearched: booksBySearched});
    // });
    // react
    // BooksAPI.search(query).then((rawBooks) => {
    //   console.log("rawBooks\n"+rawBooks);
    //   // const booksBySearched = rawBooks.map((rawBook) => ({
    //   //   imageURL: rawBook.imageLinks.smallThumbnail,
    //   //   authors: rawBook.authors,
    //   //   bookName: rawBook.title,
    //   //   id: rawBook.id,
    //   //   bookShelf: "none"
    //   //   })
    //   // );
    //   // this.setState({booksBySearched: booksBySearched});
    // });

  // }

  // componentWillReceiveProps() {
  //
  // }

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
    // console.log("booksBySearched:"+this.state.booksBySearched);
    // console.log("books:"+this.state.books);
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
