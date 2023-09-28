const express = require('express');
const session = require('express-session');
const bcrypt = require('bcryptjs');
const app = express();
app.set("view engine", "ejs")
app.use(express.urlencoded({ extended: false }));
app.use(session({
  secret: 'secret-key', // Replace with a stronger secret key
  resave: true,
  saveUninitialized: true,
}));

// Temporary user data (replace with your user database)
const users = [
  {
    username: 'user1',
    passwordHash: bcrypt.hashSync('password1', 10),
  },
  // Add more users as needed
];

const sessionValidator = (req, res, next) => {
    // Check if there is a session and if the user is authenticated
    if (req.session && req.session.user) {
        // Session is valid, the user is authenticated
        next(); // Continue to the next middleware or route handler
    } else {
        // Session is not valid or the user is not authenticated
        res.redirect('/login'); // Redirect to the login page or handle it as needed
    }
};

// Login page
app.get('/login', (req, res) => {
  res.send('<h1>Login Page</h1><form method="POST" action="/login"><label for="username">Username:</label><input type="text" id="username" name="username" required><br><label for="password">Password:</label><input type="password" id="password" name="password" required><br><button type="submit">Login</button></form>');
});

// Login endpoint
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Find the user by username
  const user = users.find(u => u.username === username); //findOne sequelize output objek
  //output user line 43 isinya object sama dengan line 15-18
  if (!user || !bcrypt.compareSync(password, user.passwordHash)) {
    res.send('Invalid username or password.');
  } else {
    // Set the user session
    req.session.user = user;
    res.redirect('/welcome');
  }
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

