# Nodejs

## Getting started

Download and install Node.js 14.x from [link](https://nodejs.org/en/download/).

To run basic plain node.js server, go to `samples` and run the command

`node server.js` 

Download and install Postman Client from [link](https://www.postman.com/downloads/).

## NPM Package

To initialize npm project, run the following command 

`npm init` 

Use default values wherever required. Once confirmed, the command will generate a file called `package.json`. 

### package.json 

All npm packages contain a file, usually in the project root, called package.json - this file holds various metadata relevant to the project. 
This file is used to give information to npm that allows it to identify the project as well as handle the project's dependencies.

## Express Framework

To install run the command `npm install express --save` 

Add the following snippet to `index.js` to have a express server ready

```javascript

const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

```

## Nodemon

Nodemon is a utility that will monitor for any changes in your source and automatically restart your server. Perfect for development.

Install nodemon using the command 

`npm install nodemon --save-dev`  
