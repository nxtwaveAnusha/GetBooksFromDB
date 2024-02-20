const express = require('express')
const {open} = require('sqlite')
const sqlite3 = require('sqlite3')
const path = require('path')
const app = express()

const dbpath = path.join(__dirname, 'goodreads.db')
let db = null
const intializeDBAndServer = async () => {
  try {
    db = await open({
      filename: dbpath,
      driver: sqlite3.Database,
    })

    app.listen(3000, () => {
      console.log('Server is running at http://localhost:3000')
    })
  } catch (e) {
    console.log(`DB Error ${e.message}`)
    process.exit(1)
  }
}
intializeDBAndServer()

app.get('/books/', async (request, response) => {
  const getBooksQuary = ` 
       SELECT * FROM book ORDER BY book_id;
       `
  const booksArray = await db.all(getBooksQuary)
  response.send(booksArray)
})
