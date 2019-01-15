import React , { Component }  from 'react'
import * as api from './api/BooksAPI'
import { Route } from 'react-router-dom';
import './App.css'
import List from './components/list';
import Search from './components/search'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class BooksApp extends Component {
    
  state = {
    books: []
  };

  componentDidMount() {
    this.fetchBooks()
  }

  fetchBooks = () => {
    api
    .getAll()
    .then(books => {
      this.setState({
        books
       })
    });
  } 


  onChangeShelf = ( book ,  shelf ) => {
    api
      .update(book, shelf)
      .then(data => {
        try {
          if (!data) {
            throw new Error('Error on update book status.');
            toast("Erro on updated", { autoClose: 1500 });
          }
          this.fetchBooks();
          console.log(this.state)
          toast("Update complete", { autoClose: 1500 });
        } catch (error) {
          toast("Erro on updated", { autoClose: 1500 });
        }
      });
  }

  render() {
    console.log(this.state.books)
    return (
      <div className="app">
       <Route
          exact
          path="/"
          render={() => (
            <List
              books={this.state.books}
              onChangeShelf={this.onChangeShelf}
            />
          )}
        />
        <Route
          exact
          path="/search"
          render={() => (
            <Search
              onChangeShelf={this.onChangeShelf}
            />
          )}
        />
        <ToastContainer autoClose={30000} />
      </div>
    )
  }
}

export default BooksApp
