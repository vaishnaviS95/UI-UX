# Getting Started

Make Directory and call it webpack-tutorial and initialize the new project

```
mkdir learn-webpack
cd learn-webpack
npm init -y
```

## Install webpack CLI

`npm install webpack webpack-cli --save-dev`

package.json shall be generated which shall look like as follows

```json
{
  "name": "webpack_tutorial",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "webpack": "^4.30.0",
    "webpack-cli": "^3.3.0"
  }
}
```

# Modify package.json

```
"scripts": {
  "test": "echo \"Error: no test specified\" && exit 1",
  "dev": "webpack --mode development",
  "build": "webpack --mode production"
}
```

Create index.js under src directory and add following to the js

```
console.log("Hello World");
```

## Kick it off!

```
npm run dev
```

## Display the output on the html!

Create `index.html` under `dist` directory

```
<!doctype html>
<html>
  <head>
    <title>Getting Started</title>
  </head>
  <body>
    <script src="index.js"></script>
  </body>
</html>
```

open the file in the browser, observe Hello World message in the console.

As now you have added the html file manually, which leads to the issue that if you you change the entry point in config to something else it will lead you change the reference in html as well.

## Solution: html-webpack-plugin

`npm install html-webpack-plugin -D`

As the name already specifies that it is a plugin therefore, you need to add a plugin under webpeck.config.js. So far you haven't created this file so now create the file
`webpack.config.js`

```
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require('path');

module.exports = {
  plugins: [
    new HtmlWebpackPlugin({
      title: "Output",
    }),
  ],
};
```

following requires babel (TO DO:Excercise)

```
import { resolve as _resolve } from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const config = {
  mode: 'development',
  devServer: {
    contentBase: './dist'
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/index.html',
      title: 'learn-webpack'
    })
  ],
  resolve: {
    modules: [_resolve(__dirname, './src'), 'node_modules']
  }
};

export default config;
```

In your `index.html` change the script source to something like `abc.js`

do `npm run build`

it shall change `abc.js` in your html to `main.js`

##Entry Point and Output
Now we will define our own entry point and output file name

1.  Go to webpack.config.js
2.  add following

```
entry: './src/myscript.js',
output: {
filename: '[name].bundle.js',
path: path.resolve(__dirname, 'dist')
},
```

3. `npm run build`
4. ERROR????

## EXCERCISE 1: FIX IT!!!

## My First Component

Create a new under `src` directory and call it `mycomponent.js` and paste the following code

```export default (text = "Hello Webpack") => {
  const element = document.createElement("p");

  element.innerHTML = text;

  return element;
};
```

As you hopefuly fixed ERROR in the Exercise 1, so go to your `app.js` file and the following

```EXCERCISE 2: use mycomponent here";

   document.body.appendChild(component());
```

Check generated `bundle.js` what you understande? recall dependency graph.

# ECMA6 to ECMA5 using babel

## Setup

`npm run dev -- --devtools false`

Analyze `main.bundle.js` you will find that ECMA6 code has not
been transpiled to ECMA5 which might show up with compabablity issues. So,
now we will write the script that will transpile it using Babel plugin

`npm install babel-loader @babel/core @babel/preset-env -D`

in `webpack.config.js` add `module` after `output`
(Excercise 3 in which file this code shall be added?)

```
module: {
  rules: [
    {
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        }
      }
    }
  ]
},
```

Now run the following command

```npm run dev -- --devtools false``` and examine the ```main.bundle.js```
Now, ```main.bundle.js```shall be contain the ECMA5 instead of ECMA6

test: it describes what kind of files should be transpiled.
exclude: it defines the files/folder that shall be excluded.
use: it tells which loader(s) should be used against the matched modules.

# Add Spice with Styles

Here we need to main loaders
1. css-loader
2. style loader

Excercise 4: install these loaders 

Solution: ```npm install css-loader style-loader --save-dev```

Excercise 5: modify ```webpack.config.js``` in order to use this loaders
Solution: 

```
{
  test: /\.css$/,
  use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
},
```

Create a ```styles``` folder under ```src``` directory and under ```styles``` directory
create a ```css``` (e.g. styles.css) file and the following
```
p {
  color: green;
}
```

Now import this ```styles.css``` in your ```app.js``` and open your ```html``` 
in browser as result ```Hello World from WEBPACK``` shall appear in green


# Fedup with ```npm run build``` after every changes you make?

Exercise: install ```webpack-dev-server``` 
Solution : ```npm install webpack-dev-server -D```

Update ```dev``` script in the package.json file

```dev: "webpack-dev-server --mode development"```

Modify ```webpack.config.js``` by adding devServer as follows

```
devServer: {
  contentBase: './dist',
  open: true
},
```

Note: content base will tell ```web-pack-server``` to watch the 
files in the ```dist``` folder

now do ```npm run dev``` and start changing your ```mycomponent.js``` 
you will notice the change without doing ```npm run build``` everytime :)


## Unpollute ```dist``` folder

Exercise: install ```clean-webpack-plugin```
Solution: ```npm install clean-webpack-plugin```

Exercise: Add reference to ```webpack.config.js```
Solution: 
```
plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/index.html',
      title: 'learn-webpack'
    }),
    new CleanWebpackPlugin()
  ],
```



Now run ```npm run build```and inspect your ```dist```folder.

