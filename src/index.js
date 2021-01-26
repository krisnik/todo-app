const express = require('express')
const todoRoutes = require('./routes/todo');

const app = express()

//  Connect all our routes to our application
app.use('/todo', todoRoutes);

const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})