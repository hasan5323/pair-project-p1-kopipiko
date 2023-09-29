const express = require("express");
const router = express.Router();
const Controller = require("../controllers/controller")

const isAdmin = function (req, res, next){
    if(req.session.UserId && req.session.role !== "admin"){
        const error = 'Access Denied'
        res.redirect(`/login?error=${error}`)
    } else{
        next()
    }
}
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
router.get("/", Controller.home)
router.get("/login", Controller.login)
router.post("/login", Controller.postLogin)
router.get("/register", Controller.register)
router.post("/register", Controller.postRegister)
router.get("/landing", sessionValidator, Controller.landing)
router.get("/logout", Controller.logout)
router.get("/add/:idUser", sessionValidator, Controller.addTransaction)
router.post("/add/:idUser", sessionValidator, Controller.postAddTransaction)
router.get("/edit/:idUser", sessionValidator, Controller.editTransaction)
router.post("/edit/:idUser", sessionValidator, Controller.postEditTransaction)
router.get("/detail/:idUser", sessionValidator, Controller.transactionDetail)
router.get("/delete/:idUser", sessionValidator, Controller.deleteTransaction)
router.get("/profile/:idUser", sessionValidator, Controller.profile)

module.exports = router