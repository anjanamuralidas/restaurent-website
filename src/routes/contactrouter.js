const express = require('express')
const alert = require('alert')
const bcrypt = require('bcrypt')
const contactRouter = express.Router() //CREATING ROUTER
const Regdata = require('../models/register')
const categorydata = require('../models/category')
const adddata = require('../models/about')
const { json } = require('body-parser')
    // contactRouter.get('/add', function(req, res) {
    //     console.log(req.query.password)
    //     bcrypt.hash(req.query.password, 10, function(err, hash) {
    //         if (err) {
    //             alert("password is not matching")
    //         }
    //         var reg = {
    //             name: req.query.name,
    //             phone: req.query.phone,
    //             email: req.query.email,
    //             username: req.query.username,
    //             password: hash

//         }
//         console.log("details" + JSON.stringify(reg))
//         Regdata.findOne({ username: req.query.username }).then((user) => {
//             console.log("details" + user)
//             if (user) {
//                 console.log("details" + user)
//                 alert("username already exist")
//                     // res.send("user")  
//                 var em = user.email
//                 var eml = req.query.email
//                 var ph = user.phone
//                 var phn = req.query.phone
//                 if (em === eml) {
//                     alert("email id already exist")
//                 } else if (ph === phn) {
//                     alert("phone number already exist")
//                 } else {
//                     alert("data added")
//                 }
//             } else {
//                 var rr = Regdata(reg).save()
//                 res.redirect("/index")

//             }



//         })
//     })

// })
contactRouter.post('/add', function(req, res) {
    console.log(req.body.password)
    bcrypt.hash(req.body.password, 10, function(err, hash) {
        if (err) {
            // alert("password is not matching")
            return res.status(404).json({
                success: false,
                error: true,
                message: "password is not matching"

            })
        }

        var reg = {
            name: req.body.name,
            phone: req.body.phone,
            email: req.body.email,
            username: req.body.username,
            password: hash

        }
        console.log("details" + JSON.stringify(reg))
        Regdata.findOne({ username: req.body.username }).then((user) => {
            console.log("registration" + user)
            if (user) {
                console.log("details" + user)
                    // alert("username already exist")
                    // res.send("user")
                res.status(200).json({
                    success: true,
                    error: false,
                    message: "username already exist"
                })
            } else {

                Regdata.findOne({ email: req.body.email }).then((register) => {
                    console.log("reg", register)
                    if (register) {
                        res.status(400).json({
                            success: false,
                            error: true,
                            message: "email already exist"
                        })
                    } else {
                        Regdata.findOne({ phone: req.body.phone }).then((ph) => {
                            if (ph) {
                                res.status(400).json({
                                    success: false,
                                    error: true,
                                    message: "phone number already exist"
                                })
                            } else {
                                console.log("dd", reg)
                                var rr = Regdata(reg).save()
                                res.status(200).json({
                                    success: true,
                                    error: false,
                                    message: "data added"
                                })

                            }
                        })
                    }



                })

            }
            // var em = user[0].email
            // console.log("email", em)
            // var eml = req.body.email
            // var ph = user.phone
            // var phn = req.body.phone

        })
    })

})

contactRouter.get('/', function(req, res) {
    Regdata.find().then(function(contacts) {
            if (contacts == 0) {
                return res.status(401).json({
                    success: false,
                    error: true,
                    message: "not found"
                })
            } else {
                return res.status(200).json({
                    success: true,
                    error: false,
                    data: contacts
                })
            }

        })
        .catch((err) => {
            return res.status(400).json({
                success: false,
                error: true,
                message: err
            })
        })
})

contactRouter.get('/addmenu', function(req, res) {
    var mcat = {
        menucat: req.query.menucat

    }
    console.log(mcat)
    var imm = categorydata(mcat).save()
    res.redirect("/menucategory")
})
contactRouter.get('/', function(req, res) {
    categorydata.find().then(function(category) {
        res.render("about", {
            title: 'restuarent',
            category,
            ind: [{ link: '/', name: 'HOME' },
                { link: '/about', name: 'add menu' },
                { link: '/menu', name: 'MENU' },
                { link: '/news', name: 'OUR UPDATES' },
                { link: '/menucategory', name: 'menucategory' }

            ]
        })
    })

})
contactRouter.get('/contact', function(req, res) {
    categorydata.find().then(function(category) {
        res.render("contact", {
            title: 'restuarent',
            category,
            ind: [{ link: '/', name: 'HOME' },
                { link: '/about', name: 'add menu' },
                { link: '/menu', name: 'MENU' },
                { link: '/news', name: 'OUR UPDATES' },
                { link: '/menucategory', name: 'menucategory' }

            ]
        })
    })

})



module.exports = contactRouter;