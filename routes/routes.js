const express = require("express");
const bcrypt = require("bcryptjs");
const Controller = require("../controllers/controller");
const router = express.Router();
const {
  Transaction,
  Item,
  TransactionItems,
  User,
  Profile,
} = require("../models");
const formatCurrentcy = require("../helper/formatCurrentcy")
// Login page
router.get("/", (req, res) => {
  res.redirect("/login");
});
router.get("/login", (req, res) => {
  res.render("home");
});
// Login endpoint
router.post("/login", (req, res) => {
  // Temporary user data (replace with your user database)
  let users = [];
  User.findAll().then((data) => {
    data.map((el) => {
      let obj = {
        username: el.dataValues.username,
        passwordHash: bcrypt.hashSync(el.dataValues.password, 10),
      };
      users.push(obj);
    });
    const { username, password } = req.body;

    const user = users.find((u) => u.username === username); //findOne sequelize output objek
    //output user line 43 isinya object sama dengan line 15-18
    if (!user || !bcrypt.compareSync(password, user.passwordHash)) {
      res.send("Invalid username or password.");
    } else {
      // Set the user session
      req.session.user = user;
      res.redirect(`/landing?username=${username}`);
    }
  });
});
//landing page
router.get("/landing", (req, res) => {
    console.log(req.query);
    const {username} = req.query
    let result
    User.findOne({
        where: {
            username: username
        }
    }).then((data)=>{
        result =data
        return Transaction.relatedTransaction(data.id)
    }).then((related)=>{
        // res.send(related)
        res.render("landing", {result,related, formatCurrentcy})

    }).catch((err)=>{
        res.send(err)
    })
});

module.exports = router;
