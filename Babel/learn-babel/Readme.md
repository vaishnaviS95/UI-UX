
# Getting Started

Make Directory and call it learn-babel and initialize the new project

```mkdir learn-babel
cd learn-babel
npm init -y
```

## Install babel CLI

```npm install babel-cli -D```

package.json shall be generated which shall look like as follows

```json
{
  "name": "learn-babel",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "babel src -d dist"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "babel-cli": "^6.26.0"
  }
}
```

# Modify package.json by adding following to ```script``` field

```"build": "babel src -d dist"```

This normally will take everything from ```src``` directory to and flush it to ```dist``` directory

```npm run build```

The above command will lead failure as we need to install some plugins that will transform our code.
The most appropriate one is to install ```babel-preset-env```

install ```babel-preset-env```

create ```.babelrc``` file add the following preset. 

```json 
{
  "presets": ["env"]
}```


#What is ```.babelrc``` ?

It is the place where your put all your babel related configuration. For more info 
[Babel API](https://babeljs.io/docs/usage/api/#options)

Note: You can also put your babel configration to you ```package.json``` instead of ```.babelrc```



Create following directories

```src```
```dist```

create index.js and add following code

```var myArray = ['a', 'b', 'c'];
const [one, two, three] = myArray;
console.log(one,two, three);
```
## Kick it off!

```
npm run build
```

## Display the output on the html!

Analyse `main.js` under `dist` directory

```'use strict';

var myArray = ['a', 'b', 'c'];
var one = myArray[0],
    two = myArray[1],
    three = myArray[2];

console.log(one, two, three);

```
# Try with objects
```// example with an object 

const obj = {
    one1: {
        a:'a'
    },
    two2: {
        b:'b'
    },
    three3: {
        c:'c'
    }

}

const {one1, two2, three3} = obj

console.log(one1);
```

[Official Babel Presets](https://babeljs.io/docs/en/presets)


Ground is open now for 30 mins to try out different presets by yourself
