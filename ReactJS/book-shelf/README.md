# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)


## DO IT BY YOUR SELF

With this example we will now going to create a kind of book shelf to get our hand bit more dirty.

With rich mentality one should first think of independent, isolated and resuablec compnents.

Take an example from previous create app CLI or create a new app by executing `npx create-react-app book-shelf`.

Now rename the root component i.e.  `App.js` to `ShelfContainer.js`. This component will going to hold the other components of our UI.


Now create the following components
1. Header -> This component will going to render the header of our page.
2. Input -> This component will accept the user's input.
3. Books -> This component will render the list of Books
4. Bool-> This component will going the render the each book.

In total we will going to create 5 components.

# ShelfContainer
```
class ShelfContainer extends React.Component {
  state = {
    books: [
      {
        id: uuidv4(),
        title: "Story Book 1",
        isRead: true,
      },
      {
        id: uuidv4(),
        title: "Story Book 2",
        isRead: false,
      },
      {
        id: uuidv4(),
        title: "Story Book 3",
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

  delBook = (id) => {
    this.setState({
      books: [
        ...this.state.books.filter((book) => {
          return book.id !== id;
        }),
      ],
    });
  };

  addBook = (title) => {
    const newBook = {
      // id: uuid.v4(),
      id: uuidv4(),
      title: title,
      isRead: false,
    };
    this.setState({
      books: [...this.state.books, newBook],
    });
  };

  render() {
    return (
      <div className="container">
        <Header />
        <Input addBookProps={this.addBook} />
        <Books
          books={this.state.books}
          handleChangeProps={this.handleChange}
          deleteBookProps={this.delBook}
        />
      </div>
    );
  }
}
export default ShelfContainer;
```

# Header
```
const Header = () => {
  return (
    <header>
      <h1>
        My Book Shelf
      </h1>
      <p>
        Add the Books that you have, if you have read this Book
        then check the mark. If you want to remove the books from shelf press remove.
      </p>
    </header>
  );
};

export default Header;
```

# Books
```
class Books extends React.Component {
  render() { 
    return (
      <div>
        {this.props.books.map(book => (
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

```

# Book
```
class Book extends React.Component {
  render() {
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

```

# Input 
```
class Input extends Component {
  state = {
    title: ""
  };
  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }; 

  handleSubmit = e => {
    e.preventDefault();
    this.props.addBookProps(this.state.title);
    this.setState({
      title: ""
    });
  };
  render() {
    return (
      <form onSubmit={this.handleSubmit} className="form-container">
        <input
          type="text"
          className="input-text"
          placeholder="Add Book"
          value={this.state.title}
          name="title"
          onChange={this.onChange}
        />
        <input type="submit" className="input-add" value="Add" />
      </form>
    );
  }
}
export default Input;

```

### EXCERCISE:
1. Adapt the `index.js` to use `ShelfContainer`.
2. Adapt the `App.css` to give some stylish look.
3. Do `npm install` and `npm start` and start fixing the errors.
4. Add some images of the books.
5. Adapt your code to make it Accessible.
6. Convert the Input.js from Class Based Component to Function Component

### HTTP REQUEST
URL: https://my-json-server.typicode.com/raliasadil/library

As per your choise install AXIOS `npm i axios` or ISOMORPHIC-FETCH `npm i isomorphic-fetch`

### EXERCISE
1. Implement `componentDidMount()` to in order to fetch the data from RestAPI and display it on the `console.log`.

2. Convert the above code to funcional components.


### EXERCISE: OPTIONAL BUT RECOMMENDED
Adapt the above code to use Webpack and Babel