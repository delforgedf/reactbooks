import React  from 'react';
import { PropTypes }  from 'prop-types';

const Book = ({book , onChangeShelf , handleCurrentStatusBook})=> {
  
  const thumb = book.imageLinks ? book.imageLinks.thumbnail : 'https://via.placeholder.com/128x193.png';

  return (
    <div className="book">
      <div className="book-top">
        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${thumb}")` }}></div>
        <div className="book-shelf-changer">
          <select 
            defaultValue={ !book.shelf ? handleCurrentStatusBook(book) : book.shelf}
            onChange={ e => onChangeShelf(book,e.target.value)}
          >
            <option value="move" disabled>Move to...</option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
          </select>
        </div>
      </div>
      <div className="book-title">{book.title}</div>
      <div className="book-authors">
      {book.authors && book.authors.map(author => 
        <div key={book.id+author} className="book-authors">{author}</div>
      )}
      </div>
    </div>
  )
}

Book.propTypes = {
  onChangeShelf: PropTypes.func.isRequired,
  handleCurrentStatusBook: PropTypes.func

}
export default Book;