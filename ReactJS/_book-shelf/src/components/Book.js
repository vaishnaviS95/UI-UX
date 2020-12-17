import React from 'react';
class Book extends React.Component {
    render() {
        console.log('Props Book:', this.props)

      const { isRead, id, title } = this.props.book; 
      return (
        <li className="book-item">
          <input
            type="checkbox"
            checked={isRead}
            onChange={() => this.props.handleChangeProps(id)}
          />
          <button onClick={() => this.props.deleteBookProps(id)}>Remove</button>
          <span>{title}</span>
        </li>
      );
    }
  }
  
  export default Book;
  