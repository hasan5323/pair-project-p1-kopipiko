const session = require('express-session');
const express = require("express");
const app = express();
const router = require("./routes/index");
const port = 5000;

app.set("view engine", "ejs")
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: 'secret-key', // Replace with a stronger secret key
  resave: true,
  saveUninitialized: true,
}));
app.use(router)
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

