import React from 'react';
import Book from './Book';
class Books extends React.Component {
    render() { 
        console.log('Props Books:', this.props)
      return (
        <div>
          { 
            this.props.books.map(book => (
            <Book
              key={book.id}
              book={book}
              handleChangeProps={this.props.handleChangeProps}
              deleteBookProps={this.props.deleteBookProps}
            />
          ))}
        </div>
      );
    }
  }
  
  export default Books;
  