const express = require("express");
const bcrypt = require('bcryptjs');
const Controller = require("../controllers/controller");
const router = express.Router();

// Login page
router.get("/login", (req, res) => {
  res.render("home");
});

// Login endpoint
router.post("/login", (req, res) => {
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
  const { username, password } = req.body;

  // Find the user by username
  const user = users.find((u) => u.username === username); //findOne sequelize output objek
  //output user line 43 isinya object sama dengan line 15-18
  if (!user || !bcrypt.compareSync(password, user.passwordHash)) {
    res.send("Invalid username or password.");
  } else {
    // Set the user session
    req.session.user = user;
    res.redirect("/welcome");
  }
});

module.exports = router;
