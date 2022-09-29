const express = require('express')
const alert = require('alert')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const loginRouter = express.Router()
const logdata = require('../models/login')
const Regdata = require('../models/register')

loginRouter.get('/', function(req, res) {
        res.render("login", {
            title: 'restuarent',

        })
    })
    // loginRouter.post('/add', function(req, res) {
    //     // bcrypt.compare(password, user.password); {
    //     //     if (err) {
    //     //         alert("incorrect password")
    //     //     }
    //     //     var log = {
    //     //         username: req.body.username,
    //     //         password: hash
    //     //     }
    //     // console.log("details" + JSON.stringify(log))
    //     Regdata.findOne({ username: req.body.username }).then((user) => {
    //         console.log("name" + user)
    //         if (!user) {
    //             console.log("user not found")
    //             alert("username is not found")
    //         } else {
    //             return bcrypt.compare(req.body.password, user.password);
    //         }
    //     })

//     .then((result) => {
//             if (result) {
//                 res.redirect("/index")
//             } else {
//                 alert("password is not match")
//             }


//         })
//         // }
// })
loginRouter.post('/add', function(req, res) {
    var name = req.body.password
    console.log("nm" + name)
    Regdata.find({ username: req.body.username }).then((user) => {
        console.log("name", user[0].password)
        if (user == 0) {
            res.status(401).json({
                success: false,
                error: true,
                message: "not match"
            })
        }
        fetcheduser = user
        bcrypt.compare(req.body.password, user[0].password);



    }).then((result) => {
        // console.log(result)
        if (result == 0) {
            res.status(401).json({
                success: false,
                error: true,
                message: "please check password is not match"
            })

        } else {
            const token = jwt.sign({ username: fetcheduser.username, userid: fetcheduser._id, useremail: fetcheduser.email },
                "secret_this_should_be_longer", { expiresIn: "1h" }

            )
            console.log("token", token)
            const decode = jwt.verify(token, "secret_this_should_be_longer")
            const dcd = { username: decode.username }
            console.log("decode", dcd)
            res.status(200).json({
                success: true,
                error: false,
                message: "login successfull",
                id: fetcheduser._id,
                username: fetcheduser.username,
                token: token,
                expiresIn: "1h"

            })


        }


    })

})




loginRouter.get('/', function(req, res) {
    logdata.find().then(function(logins) {
        res.render("login", {
            title: 'restuarent',
            logins,
            ind: [{ link: '/', name: 'HOME' },
                { link: '/about', name: 'add menu' },
                { link: '/menu', name: 'MENU' },
                { link: '/news', name: 'OUR UPDATES' },
                { link: '/menucategory', name: 'menucategory' }

            ]
        })
    })
})

module.exports = loginRouter;