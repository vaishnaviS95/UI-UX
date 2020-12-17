import React from 'react';
import Header from './Header';
import uuidv4 from 'uuid';
import Input from './Input';
import Books from './Books';
class ShelfContainer extends React.Component {
  state = {
    books: [
      {
        id: uuidv4(),
        title: 'Story Book 1',
        isRead: true,
      },
      {
        id: uuidv4(),
        title: 'Story Book 2',
        isRead: false,
      },
      {
        id: uuidv4(),
        title: 'Story Book 3',
        isRead: false,
      },
    ],
  };

  handleChange = (id) => {
    this.setState({
      books: this.state.books.map((book) => {
        if (book.id === id) {
          book.isRead = !book.isRead;
        }
        return book;
      }),
    });
  };

  // TO DO : Create teh Delete function and pass it over to the childe comp
// console.log(I am getting dleted)

  render() {
    console.log("Props COntainer", this.props)
    return (
      <div>
        <h2> Hello from the Container</h2>
        <Input></Input>
        <Header></Header>
        <Books books={this.state.books}
         handleChangeProps={this.handleChange}></Books>
      </div>
    );
  }
}

export default ShelfContainer;
