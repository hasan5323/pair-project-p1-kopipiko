const express = require('express');
const session = require('express-session');

const app = express();
const port = 3000
const router = require('./routes/routes')

app.set("view engine", "ejs")
app.use(express.urlencoded({ extended: false }));
app.use(session({
  secret: 'secret-key', // Replace with a stronger secret key
  resave: true,
  saveUninitialized: true,
}));
app.use(router)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

