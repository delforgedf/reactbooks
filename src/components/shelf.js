import React from 'react';
import { PropTypes }  from 'prop-types';
import Book from './book';

const Shelf = ({ title, books , onChangeShelf }) =>{

  return(
      <div>
        <div className="bookshelf">
          <h2 className="bookshelf-title">{title}</h2>
          <div className="bookshelf-books">
            <ol className="books-grid">
              {
                books.map(bookItem => 
                  <li key={bookItem.id}> 
                    <Book 
                      book={bookItem} 
                      onChangeShelf={onChangeShelf}
                    /> 
                  </li>
                )
              }
            </ol>
          </div>
        </div>
      </div>
  )
}

Shelf.propTypes = {
  books: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  title: PropTypes.string.isRequired,
  onChangeShelf: PropTypes.func.isRequired,
}

export default Shelf;