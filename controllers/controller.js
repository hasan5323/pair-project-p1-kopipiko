const { Category, Item, Profile, Transaction, TransactionItems, User } = require("../models")
// const helper = require("../helper/index")
const bcrypt = require('bcryptjs');
const session = require('express-session');
const helper = require("../helper/formatCurrentcy")

class Controller {
    static home(req, res) {
        res.redirect("/login")
    }
    static register(req, res) {
        res.render("register")
    }
    static postRegister(req, res) {
        // res.send(req.body
        // console.log(req.body)
        const { username, password, email, firstName, lastName, phone, address } = req.body
        let inputProfileId, inputRole;
        User.findAll()
            .then((result) => {
                // console.log(result[result.length-1].id)
                // res.send(String(result[result.length-1].id))
                inputProfileId = result[result.length - 1].id + 1
                inputRole = "customer"
                // res.send(input)
                // console.log(ProfileId, role);
                // res.send(input)
                return Profile.create({
                    firstName: firstName,
                    lastName: lastName,
                    phone: phone,
                    address: address
                })
            })
            .then(() => {
                console.log(username, password, email, inputRole, inputProfileId)
                // res.send("SUCCes")
                return User.create({
                    username: username,
                    password: bcrypt.hashSync(password, 10),
                    email: email,
                    role: inputRole,
                    ProfileId: inputProfileId
                })
            })
            .then(() => {
                console.log("SUCCES");
                res.redirect("/")
            })
            .catch((err) => {
                res.send(err)
            })
        // User.create(req.body)
    }
    static login(req, res) {
        res.render("login.ejs")
    }
    static postLogin(req, res) {
        const { username, password } = req.body;
        let user;
        User.findOne({ where: { username: username } })
            .then((result) => {
                user = result
                // res.send(result)
                if (!user || !bcrypt.compareSync(password, user.password)) {
                    res.send('Invalid username or password.');
                  } else {
                    // Set the user session
                    req.session.user = user;
                    res.redirect('/landing');
                  }
            })
            .catch((err) => {
                res.send(err)
            })
    }
    static landing(req, res) {
        const data = req.session.user
        // console.log(data);
        User.findAll({
            include: Transaction,
            order : [[Transaction, "bill",'asc']]
        },{where: {id: data.id}}
        )
        .then((result)=>{
            // res.send(result)
            // console.log(result[0].Transactions[1].id, "asdadasd");
            res.render("landing2.ejs", {data, result, helper})
        })
        .catch((err)=>{
            res.send(err)
        })
    }
    static addTransaction(req, res) {
        const {idUser} = req.params
        let dataOption = [];
        Category.findAll()
        .then((result)=>{
            // res.send(result)
            dataOption.push(result)
            return Item.findAll()
        })
        .then((result)=>{
            dataOption.push(result)
            console.log(dataOption, "???????");
            // res.send(dataOption)
            res.render("addTransaction.ejs", {dataOption, idUser})
        })
        .catch((err)=>{
            res.send(err)
        })
        // Category.findAll({
        //     include:{
        //         model: Item
        //     }
        // })
        // .then((result)=>{
        //     // res.send(result)
        //     res.render("addTransaction.ejs", {result})
        // })
        // .catch((err)=>{
        //     res.send(err)
        // })
    }
    static postAddTransaction(req, res) {
        const {idUser} = req.params
        // console.log(req.body, ">>>>>>");
        // res.send(req.body);
        const {name, isHuge, isLiquid, pickUpLocation, dropLocation, bill} = req.body
        // console.log(name, isHuge, isLiquid, pickUpLocation, dropLocation, bill);
        Transaction.create({
            pickUpLocation: pickUpLocation,
            dropLocation: dropLocation,
            bill: bill,
            UserId: idUser
        })
        .then(()=>{
            res.redirect("/landing")
        })
        .catch((err)=>{
            // if (err.name === "SequelizeDatabaseError") {
            //     err = err.errors.map((el)=>{
            //         res.send(el.message)
            //         return el.message
            //     })
            //     res.redirect(`/add/${idUser}?errors=${err.join("; ")}`)
            // }else{
                res.send(err)
            // }
        })
        // res.send(name, isHuge, isLiquid, pickUpLocation, dropLocation, bill);
    }
    static editTransaction(req, res) {
        const dataUser = req.session.user
        const {idUser} = req.params
        let dataOption = [];
        Category.findAll()
        .then((result)=>{
            // res.send(result)
            dataOption.push(result)
            return Item.findAll()
        })
        .then((result)=>{
            dataOption.push(result)
            // console.log(dataOption, "???????");
            // res.send(dataOption)
            return Transaction.findAll({
                where:{
                    id:idUser
                }
            })
        })
        .then((result)=>{
            // res.send(result)
            dataOption.push(result)
            // console.log(dataOption[2][0].pickUpLocation, "INI MAU DI PRINT TAPI KENAPA DI EJS GA MAU");
            // res.send(dataOption[2])
            res.render("editTransaction2.ejs", {dataOption, idUser})
        })
        .catch((err)=>{
            res.send(err)
        })
    }
    static postEditTransaction(req, res) {
        const { pickUpLocation, dropLocation, bill } = req.body
        const { idUser } = req.params
        Transaction.findByPk(idUser)
        .then((result)=>{
            return Transaction.update(
                {
                    pickUpLocation: pickUpLocation,
                    dropLocation: dropLocation,
                    bill: bill,
                    isPaid: result.isPaid,
                    isDone: result.isDone
                },{
                    where:{
                        id: idUser
                    }
                }
            )
        })
        .then(()=>{
            // res.send("Succes")
            res.redirect("/landing")
        })
        .catch((err)=>{
            res.send(err)
        })
    }
    static transactionDetail(req, res) {
        const {idUser} = req.params
        const user = req.session.user
        // res.render("detailTransaction.ejs")
        TransactionItems.findAll({
            where:{
                TransactionId: idUser
            },
            include:{
                model: Item,
                include:{
                    model: Category
                }
            }
        })
        .then((result)=>{
            // console.log(result[0].Item.isHuge);
            // res.send(result)
            res.render("detailTransaction.ejs", {result, user})
        })
        .catch((err)=>{
            res.send(err)
        })
    }
    static transactionDone(req, res) {
    }
    static logout(req, res){
        req.session.destroy(err => {
            if (err) {
              console.error('Error destroying session:', err);
            }
            res.redirect('/login');
          });
    }
    static deleteTransaction(req, res){
        const {idUser} = req.params
        Transaction.destroy({
            where:{
                id:idUser
            }
        })
        .then(()=>{
            res.redirect("/landing")
        })
        .catch((err)=>{
            res.send(err)
        })
    }
    static profile(req, res){
        const {idUser} = req.params
        Profile.findByPk(idUser)
        .then((result)=>{
            res.render("profile.ejs", {result})
        })
        .catch((err)=>{
            res.send(err)
        })
    }
}

module.exports = Controller