const express = require('express')
const multer = require('multer')

const aboutRouter = express.Router() //CREATING ROUTER
const adddata = require('../models/about')
const categorydata = require('../models/category')



aboutRouter.get('/', function(req, res) {
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

const storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, './public/images/upload')
    },
    filename: function(req, file, callback) {
        callback(null, file.originalname)
    }
})
const upload = multer({ storage: storage })




aboutRouter.post('/add', upload.single('image'), function(req, res) {

        var imageadd = {
            menucategory: req.body.menucategory,
            foodname: req.body.foodname,
            rate: req.body.rate,
            image: req.file.filename
        }
        console.log(imageadd)
        var im = adddata(imageadd).save()
        res.redirect("/index")
    })
    // aboutRouter.get('/', function(req, res) {
    //     res.render("viewall", {
    //         title: 'restuarent',
    //         menu,
    //         ind: [{ link: '/', name: 'HOME' },
    //             { link: '/about', name: 'add menu' },
    //             { link: '/menu', name: 'MENU' },
    //             { link: '/news', name: 'OUR UPDATES' },
    //             { link: '/contact', name: 'CONTACT' }

//         ]

//     })
// })


module.exports = aboutRouter;