const express = require('express')
const alert = require('alert')
const menuRouter = express.Router() //CREATING ROUTER
const multer = require('multer')
const adddata = require('../models/about')
const menucategory = require('../models/category')
const bookdata = require('../models/booknow')
const logdata = require('../models/login')
const Regdata = require('../models/register')

menuRouter.get('/', function(req, res) {
    let lunchdata
    let breakdata
    let dinnerdata
    menucategory.aggregate([
            [{
                '$lookup': {
                    'from': 'foods',
                    'localField': '_id',
                    'foreignField': 'menucategory',
                    'as': 'lunch'
                }
            }, {
                '$match': {
                    'menucat': 'lunch'
                }
            }]
        ])
        .then((ldata) => {
            // console.log("lunch" + JSON.stringify(ldata[0].lunch[0]))
            lunchdata = ldata[0].lunch
                // console.log(lunchdata)


            menucategory.aggregate([
                    [{
                        '$lookup': {
                            'from': 'foods',
                            'localField': '_id',
                            'foreignField': 'menucategory',
                            'as': 'breakfast'
                        }
                    }, {
                        '$match': {
                            'menucat': 'breakfast'
                        }
                    }]
                ])
                .then((bdata) => {
                    // console.log("breakfast" + JSON.stringify(bdata[0].breakfast[0]))
                    breakdata = bdata[0].breakfast
                    console.log("breakfast deatails", breakdata)

                    menucategory.aggregate([
                            [{
                                '$lookup': {
                                    'from': 'foods',
                                    'localField': '_id',
                                    'foreignField': 'menucategory',
                                    'as': 'dinner'
                                }
                            }, {
                                '$match': {
                                    'menucat': 'dinner'
                                }
                            }]
                        ])
                        .then((ddata) => {
                            // console.log("dinner" + JSON.stringify(ddata[0].dinner[0]))
                            dinnerdata = ddata[0].dinner
                                // console.log(dinnerdata)


                            res.render("menu", {
                                title: 'restuarent',
                                lunchdata,
                                breakdata,
                                dinnerdata,

                                ind: [{ link: '/', name: 'HOME' },
                                    { link: '/about', name: 'add menu' },
                                    { link: '/menu', name: 'MENU' },
                                    { link: '/news', name: 'OUR UPDATES' },
                                    { link: '/menucategory', name: 'menucategory' }

                                ],
                                image: [{ imgg: 'louis-hansel-dphM2U1xq0U-unsplash', }],

                                head: [{ img: 's1.jpg', head1: 'new york', head2: 'fine dining restuarent' },
                                    { img: 's2.jpg', head1: 'new york', head2: 'fine dining restuarent' },
                                    { img: 's3.jpg', head1: 'new york', head2: 'fine dining restuarent' }


                                ]
                            })
                        })
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
menuRouter.post('/add', upload.single('image'), function(req, res) {
    var imageadd = {
        menucategory: req.body.menucategory,
        foodname: req.body.name,
        rate: req.body.rate,
        image: req.file.filename
    }
    console.log(imageadd)
    var im = adddata(imageadd).save()
    res.redirect("/index")
})
menuRouter.get('/viewall', function(req, res) {
    menucategory.aggregate([
            [{
                '$lookup': {
                    'from': 'foods',
                    'localField': '_id',
                    'foreignField': 'menucategory',
                    'as': 'breakfast'
                }
            }, {
                '$match': {
                    'menucat': 'breakfast'
                }
            }]
        ])
        .then((bdata) => {
            // console.log("breakfast" + JSON.stringify(bdata[0].breakfast[0]))
            breakdata = bdata[0].breakfast
            console.log("breakfast deatails", breakdata)

            // console.log("details" + menu)
            // res.render("viewall", {
            //     title: 'restuarent',

            //     ind: [{ link: '/', name: 'HOME' },
            //         { link: '/about', name: 'add menu' },
            //         { link: '/menu', name: 'MENU' },
            //         { link: '/news', name: 'OUR UPDATES' },
            //         { link: '/menucategory', name: 'menucategory' }

            //     ]
            // })
            return res.status(200).json({
                success: false,
                error: true,
                message: breakdata
            })
        })
})
menuRouter.get('/singlebreak/:id', function(req, res) {
    const id = req.params.id
    console.log(id)
    adddata.findOne({ _id: id }).then((food) => {
        console.log("details" + food)
        res.render("singlebreakfast", {
            title: 'restuarent',
            ind: [{ link: '/', name: 'HOME' },
                { link: '/about', name: 'add menu' },
                { link: '/menu', name: 'MENU' },
                { link: '/news', name: 'OUR UPDATES' },
                { link: '/menucategory', name: 'menucategory' }

            ],
            food: food

        })
    })

})

menuRouter.get('/edit/:id', function(req, res) {
    const id = req.params.id
    adddata.findOne({ _id: id }).then((food) => {
        console.log(food)
        res.render("update", {
            title: 'restuarent',
            ind: [{ link: '/', name: 'HOME' },
                { link: '/about', name: 'add menu' },
                { link: '/menu', name: 'MENU' },
                { link: '/news', name: 'OUR UPDATES' },
                { link: '/menucategory', name: 'menucategory' }

            ],
            food: food
        })

    })
})

menuRouter.get('/editItem/:id', function(req, res) {
    const id = req.params.id
    console.log("id", id);
    var updatedata = {
        // menucategory: req.body.menucategory,
        foodname: req.query.foodname,
        rate: req.query.rate
            // image: req.body.filename
    }
    console.log(updatedata);
    adddata.findByIdAndUpdate({ _id: id }, updatedata).then((food) => {
        //     console.log(food)
        //     res.render("update", {
        //         title: 'restuarent',
        //         ind: [{ link: '/', name: 'HOME' },
        //             { link: '/about', name: 'add menu' },
        //             { link: '/menu', name: 'MENU' },
        //             { link: '/news', name: 'OUR UPDATES' },
        //             { link: '/contact', name: 'CONTACT' }

        //         ],
        //         food: food
        res.redirect("/menu")
    })




    // })

})



menuRouter.get('/delete/:id', function(req, res) {
    const id = req.params.id
    adddata.findByIdAndDelete(id, (err, doc) => {
        if (err) {
            console.log(err)
        } else {
            console.log("deleted", doc)
        }
        res.redirect("/menu")
    })

})
menuRouter.get('/viewalldinner', function(req, res) {
    menucategory.aggregate([
            [{
                '$lookup': {
                    'from': 'foods',
                    'localField': '_id',
                    'foreignField': 'menucategory',
                    'as': 'dinner'
                }
            }, {
                '$match': {
                    'menucat': 'dinner'
                }
            }]
        ])
        .then((ddata) => {
            // console.log("dinner" + JSON.stringify(ddata[0].dinner[0]))
            dinnerdata = ddata[0].dinner
                // console.log(dinnerdata)
            res.render("viewalldinner", {
                title: 'restuarent',

                ind: [{ link: '/', name: 'HOME' },
                    { link: '/about', name: 'add menu' },
                    { link: '/menu', name: 'MENU' },
                    { link: '/news', name: 'OUR UPDATES' },
                    { link: '/menucategory', name: 'menucategory' }

                ]
            })
        })
})
menuRouter.get('/singledinner/:id', function(req, res) {
    const id = req.params.id
    console.log(id)
    adddata.findOne({ _id: id }).then((food) => {
        console.log("details" + food)
        res.render("singledinner", {
            title: 'restuarent',
            ind: [{ link: '/', name: 'HOME' },
                { link: '/about', name: 'add menu' },
                { link: '/menu', name: 'MENU' },
                { link: '/news', name: 'OUR UPDATES' },
                { link: '/menucategory', name: 'menucategory' }

            ],
            food: food

        })
    })
})

menuRouter.get('/viewalllunch', function(req, res) {
    menucategory.aggregate([
            [{
                '$lookup': {
                    'from': 'foods',
                    'localField': '_id',
                    'foreignField': 'menucategory',
                    'as': 'lunch'
                }
            }, {
                '$match': {
                    'menucat': 'lunch'
                }
            }]
        ])
        .then((ldata) => {
            // console.log("lunch" + JSON.stringify(ldata[0].lunch[0]))
            lunchdata = ldata[0].lunch
            res.render("viewalllunch", {
                title: 'restuarent',

                ind: [{ link: '/', name: 'HOME' },
                    { link: '/about', name: 'add menu' },
                    { link: '/menu', name: 'MENU' },
                    { link: '/news', name: 'OUR UPDATES' },
                    { link: '/menucategory', name: 'menucategory' }

                ]
            })
        })
})

menuRouter.get('/singlelunch/:id', function(req, res) {
    const id = req.params.id
    console.log(id)
    adddata.findOne({ _id: id }).then((food) => {
        console.log("details" + food)
        res.render("singlelunch", {
            title: 'restuarent',
            ind: [{ link: '/', name: 'HOME' },
                { link: '/about', name: 'add menu' },
                { link: '/menu', name: 'MENU' },
                { link: '/news', name: 'OUR UPDATES' },
                { link: '/menucategory', name: 'menucategory' }

            ],
            food: food

        })
    })
})


menuRouter.get('/menu/viewall', function(req, res) {
    res.render("singlebreakfast", {
        title: 'restuarent',
        ind: [{ link: '/', name: 'HOME' },
            { link: '/about', name: 'add menu' },
            { link: '/menu', name: 'MENU' },
            { link: '/news', name: 'OUR UPDATES' },
            { link: '/menucategory', name: 'menucategory' }
        ]
    })
})
menuRouter.get('/menu/viewalllunch', function(req, res) {
    res.render("singlemenu", {
        title: 'restuarent',
        ind: [{ link: '/', name: 'HOME' },
            { link: '/about', name: 'add menu' },
            { link: '/menu', name: 'MENU' },
            { link: '/news', name: 'OUR UPDATES' },
            { link: '/menucategory', name: 'menucategory' }
        ]
    })
})
menuRouter.get('/menu/viewalldinner', function(req, res) {
    res.render("singledinner", {
        title: 'restuarent',
        ind: [{ link: '/', name: 'HOME' },
            { link: '/about', name: 'add menu' },
            { link: '/menu', name: 'MENU' },
            { link: '/news', name: 'OUR UPDATES' },
            { link: '/menucategory', name: 'menucategory' }
        ]
    })
})
menuRouter.get('/menu/viewall', function(req, res) {
    res.render("update", {
        title: 'restuarent',
        ind: [{ link: '/', name: 'HOME' },
            { link: '/about', name: 'add menu' },
            { link: '/menu', name: 'MENU' },
            { link: '/news', name: 'OUR UPDATES' },
            { link: '/menucategory', name: 'menucategory' }
        ]
    })
})

menuRouter.get('/', function(req, res) {
    res.render("menucategory", {
        title: 'restuarent',
        ind: [{ link: '/', name: 'HOME' },
            { link: '/about', name: 'add menu' },
            { link: '/menu', name: 'MENU' },
            { link: '/news', name: 'OUR UPDATES' },
            { link: '/menucategory', name: 'menucategory' }

        ]
    })
    res.redirect("/index")
})
menuRouter.get('/booknow/:id', function(req, res) {
    const id = req.params.id
    adddata.findOne({ _id: id }).then((food) => {
        console.log(food)
        res.render("booknow", {
                title: 'restuarent',
                ind: [{ link: '/', name: 'HOME' },
                    { link: '/about', name: 'add menu' },
                    { link: '/menu', name: 'MENU' },
                    { link: '/news', name: 'OUR UPDATES' },
                    { link: '/menucategory', name: 'menucategory' }

                ],
                food: food

            })
            // res.redirect("/menu")
    })
})


menuRouter.get('/addfood', function(req, res) {
    var fdcount = req.query.user
    console.log("user" + fdcount)
    Regdata.findOne({ username: req.query.user }).then((userid) => {
        console.log("user====>" + userid)
        var fdcount = {
            foodname: req.query.foodid,
            user: req.query.user,
            count: req.query.count,

        }
        if (!userid) {
            return res.status(401).json({
                success: false,
                error: true,
                message: "not found"
            })
        } else {
            var cnt = bookdata(fdcount).save()
            return res.status(200).json({
                success: true,
                error: false,
                message: "data added"

            })

        }
    })
})
menuRouter.get('/bookview', function(req, res) {
    let fddata
    bookdata.aggregate([

        [{
            '$lookup': {
                'from': 'foods',
                'localField': 'foodname',
                'foreignField': '_id',
                'as': 'name'
            }
        }]
    ])

    .then((fdbook) => {
        console.log("fd" + fdbook)

        fddata = fdbook
        console.log("view", JSON.stringify(fddata))
        res.render("bookview", {
            title: 'restuarent',
            fddata,

            ind: [{ link: '/', name: 'HOME' },
                { link: '/about', name: 'add menu' },
                { link: '/menu', name: 'MENU' },
                { link: '/news', name: 'OUR UPDATES' },
                { link: '/menucategory', name: 'menucategory' }
            ]
        })

    })

})

module.exports = menuRouter;