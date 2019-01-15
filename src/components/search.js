import React , {Component} from 'react';
import { Link } from 'react-router-dom';
import Book from './book';
import { search } from '../api/BooksAPI';
import { PropTypes }  from 'prop-types';

class Search extends Component{

  constructor(props) {
    super(props);

    this.state = {
      searchedBooks: [],
      search: '',
      isLoading: false,
      noResults: false
    };

    this.findBook = () => {
      let bookName = this.state.search;
      if (bookName.length === 0) {
        this.setState({ searchedBooks: [] });
        return;
      }
  
      this.setState({ isLoading: true });
  
      search(bookName).then(findedBooks => {
        this.setState({ isLoading: false, noResults: false });
        if (findedBooks.error === 'empty query') {
          this.setState({ noResults: true });
          return;
        }
        this.setState({ searchedBooks: findedBooks, noResults: false });
      });
    }
  }


  render() {
    return(
      <div className="search-books">
      <div className="search-books-bar">
        <Link to='/' className="close-search">
          <button className="close-search">Close</button>
        </Link>
        <div className="search-books-input-wrapper">
          <input 
            type="text" 
            placeholder="Search by title or author"
            value={this.state.search}
            onChange={event => {
              this.setState({ search: event.target.value, searchedBooks: [] });
              this.findBook();
            }}
          />
        </div>
      </div>
      <div className="search-books-results">  
        {this.state.isLoading && (
          <div className="loader">Loading...</div>
        )}

        {(!this.state.isLoading && this.state.noResults && this.state.search.length !== 0) && (
          <h3 className="error">No results were found for <i>{this.state.search}</i>.</h3>
        )}
        <ol className="books-grid">
          {(!this.state.isLoading && this.state.searchedBooks.length > 0) && this.state.searchedBooks.map(bookItem => (
            <li key={bookItem.id}>
              <Book 
                book={bookItem} 
                onChangeShelf={this.props.onChangeShelf}
              />
            </li>
          ))}
        </ol>
      </div>
    </div>
    );
  };
}

Search.propTypes = {
  onChangeShelf: PropTypes.func.isRequired,
};

export default Search;