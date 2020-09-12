# NodeJS Tutorial

NodeJS is a runtime environment that interprets JavaScript - similar to JVM for Java.

## JavaScript Syntax

JavaScript is a loosely-typed language. Instead of using `int`, `boolean`, or other datatypes, variables are initialized using `var`, `let`, and `const`.

### Variable Initialization

Note: We will use only `let` and `const`.

```JavaScript
// Cannot assign another value to this variable
const isEclipseFunky = true

let age = 12
let name = 'Tony'

// This is a plain object.
let allStar = {
  some: 'body',
  once: 'told me'
}

// List of numbers
let numberList = [1, 24, 25.01, 6, 0]

// Can hold mixed different types of data
// Note: Just use an object to hold these values
let mixedList = [
  "I'm a string using double-quotes",
  'I\'m a string using single-quotes',
  `I'm a string using backticks`,
  12,
  false
]
```

### Functions

Functions in JavaScript are a bit more flexible here. They can be assigned to variables and arguments to other functions.

```JavaScript
// Classic function
function addNums (a, b) {
  return a + b
}

let addResult = addNums(1, 2)  // addResult is 3

// Using a function as an input
// It will use the callbackFunction input within the function.
// Many APIs and libraries do this
function multiplyNums (a, b, callbackFunction) {
  let result = a * b
  callbackFunction(result)
}

// Note: The function is unnamed. It's fine if we only use it once.
multiplyNums(2, 12, function (answer) {
  console.log(answer) // console reads: 24
})


// Alternatively, we can write it like this:
multiplyNums(15, 3, (answer) => {
  console.log(answer) // console reads: 45
})
```

### Classes

```JavaScript
class Person {
  constructor (name, age) {
    this.name = name
    this.age = age
  }

  // This is a method
  introduce () {
    console.log(`My name is ${this.name}. I am ${this.age} years old.`)
  }
}

// New instance of Person class
let p1 = new Person('Marty', 15)
p1.introduce()  // console reads: 'My name is Marty. I am 15 years old.'

// You can extend classes as well
class Student extends Person {
  constructor (name, age, id) {
    super(name, age)
    this.id = id
  }

  showId () {
    console.log(this.id)
  }

  // introduce () still exists
}
```

There are other neat features to ES6 that you can learn in the resources linked below.

## NodeJS

NodeJS lets a JavaScript program to be organized into separate files/modules.

### Import/Export Modules

You can have functions, classes, and constants stored in one file and `require` them in another.

Let's have a simple example. Assume that both files are in the same directory.

```JavaScript
// `math.js`

function addNums (a, b) {
  return a + b
}

function multiplyNums (a, b) {
  return a * b
}

// Here's where we export the functions
module.exports = {
  addNums: addNums,
  multiplyNums: multiplyNums
}

// Note: if the property name and variable names are the same
// like in the lines above, then it can be written as such:
module.exports = {
  addNums,
  multiplyNums
}
```

```JavaScript
// `index.js`

// This will import from `math.js` in the same directory
// You can specify which functions, classes, or constants you want using this syntax. More on this in the links below
const { addNums, multiplyNums } = require('./math')

// The other way is like this:
/*
  const math = require('./math')
  const addNums = math.addNums
  const multiplyNums = math.multiplyNums
*/

let addResult = addNums(2, 4) // 6
let multResult = multiplyNums(3, 7) // 21
```

### NPM

NPM is unofficially called the Node Package Manager. (Technically it's not an acronym according to the NPM team, but whatever.) This is what we use to manage JavaScript packages and projects.

### package.json and package-lock.json

NodeJS projects, like any other projects, will have to manage dependencies. They also need to be tested, built, etc. Luckily, the package.json file holds all the information listed above!

The important sections in that file are as follows:

- `name` - Project name
- `version` - Project version
- `description` - Project description
- `scripts` - Command-line scripts that are run. It's way better save the commands here than trying to memorize them. (Or have them forgotten, and no one can run anything.)
- `main` - Specifies the primary file where everything runs.
- `dependencies` - Holds list of required dependencies for the project
- `devDependencies` - Holds list of dependencies used only for development

All packages added to the project update the package-lock.json file. This file saves the specific versions and the dependencies' dependencies. This was added in version 5 of npm (which is a lot better than previous versions).

### CLI Commands

NPM uses the package.json file to run the commands below

- `npm install <package-name>` - adds package to `dependencies`
- `npm install -D <package-name>` - adds package to `devDependencies`
- `npm run <command>` - runs the appropriate script in the `scripts` section
- `npm start` - equivalent to `npm run start`
- `npm test` - equivalent to `npm run test`

## Conclusion

Hopefully this gives you a clear idea about JavaScript and NodeJS. This document will be updated with more examples and explanations as the project moves forward.

## More Info/Resources

- [Node for Java Developers](https://node.university/blog/502765/node-for-java-devs)
- [What is Node.JS for Java Developers](https://dzone.com/articles/what-is-nodejs-for-java-developers)
- [Learn ES2015](https://babeljs.io/learn-es2015/) (Note: ES6 and ES2015 are different names for the same thing.)
- [Using a `package.json`](https://docs.npmjs.com/getting-started/using-a-package.json)
