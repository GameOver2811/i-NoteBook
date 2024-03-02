const connectToMongo = require('./db');
const express = require('express')
const cors = require('cors');

// Connecting to mongoDB
connectToMongo();

const app = express()
const port = 5000

app.use(cors());

app.use(express.json());

// Available routes

app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.use('/api/auth', require('./routes/auth'))

app.use('/api/notes', require('./routes/notes'))

// routes ends here

app.listen(port, () => {
  console.log(`iNoteBook app listening on port ${port}`)
})