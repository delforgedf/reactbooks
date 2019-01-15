import React from 'react';
import Shelf from './shelf';
import { PropTypes }  from 'prop-types';
import { Link } from 'react-router-dom';

const List  = ({books , onChangeShelf}) => {

  const bookStatus = [
    {
      'title': 'Currently Reading',
      'status': 'currentlyReading'
    }, {
      'title': 'Want to Read',
      'status': 'wantToRead'
    }, {
      'title': 'Read',
      'status': 'read'
    }
  ];
  

  return(
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
      {
        bookStatus.map(category => {
          const bookShelf = books.filter(book => book.shelf === category.status);
          return (
            <div key={category.status}>
            <Shelf 
              title={category.title} 
              books={bookShelf}
              onChangeShelf={onChangeShelf}
            /></div>
          );
        })
      }
      </div>
      <div className="open-search">
      <Link to='/search' title="Add a book">
        <button>Add a book</button>
      </Link>
      </div>
    </div>
  )
}

List.propTypes = {
  books: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  onChangeShelf: PropTypes.func.isRequired,
}

export default List;