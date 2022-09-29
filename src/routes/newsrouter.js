const express = require('express')
const newsRouter = express.Router() //CREATING ROUTER

// var image = [{ img: 'louis-hansel-cH5IPjaAYyo-unsplash.jpg' }]
newsRouter.get('/', function(req, res) {
    res.render("news", {
        title: 'restuarent',
        ind: [{ link: '/', name: 'HOME' },
            { link: '/about', name: 'add menu' },
            { link: '/menu', name: 'MENU' },
            { link: '/news/newsdetail', name: 'OUR UPDATES' },
            { link: '/menucategory', name: 'menucategoryT' }

        ],

        news: [{ img: 'n6.jpg', link: 'How to make a healthy diet?' },
            { img: 'n8.jpg', link: 'Happy Living and happy eating tips' },

        ],
        newsevent: [{ img: 'n3.jpg', head: 'Promotions', day: '12 April 2022', main: 'Is Coconut good for your health?' },
            { img: 'n4.jpg', head: 'career', day: '14 may 2021', main: 'How to run a sushi business?' },
            { img: 'n2.jpg', head: 'meeting', day: '18 April 2022', main: 'Learning a fine dining experience' }



        ]





    })

})
newsRouter.get('/', function(req, res) {
    res.render("newsdetail", {
        title: 'restuarent',
        ind: [{ link: '/', name: 'HOME' },
            { link: '/about', name: 'add menu' },
            { link: '/menu', name: 'MENU' },
            { link: '/news/newsdetail', name: 'OUR UPDATES' },
            { link: '/index/menucategory', name: 'menucategory' }
        ],
        news: [{ img: 'n6.jpg', link: 'How to make a healthy diet?' },
            { img: 'n8.jpg', link: 'Happy Living and happy eating tips' },

        ],
        newsevent: [{ img: 'n3.jpg', head: 'Promotions', day: '12 April 2022', main: 'Is Coconut good for your health?' },
            { img: 'n4.jpg', head: 'career', day: '14 may 2021', main: 'How to run a sushi business?' },
            { img: 'n2.jpg', head: 'meeting', day: '18 April 2022', main: 'Learning a fine dining experience' }



        ]


    })

})

module.exports = newsRouter;