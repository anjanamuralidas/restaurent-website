const express = require('express')
const indexRouter = express.Router() //CREATING ROUTER




// var image = [{ img: 'louis-hansel-cH5IPjaAYyo-unsplash.jpg' }]
indexRouter.get('/', function(req, res) {
    res.render("index", {
        title: 'restuarent',
        ind: [{ link: '/index', name: 'HOME' },
            { link: '/about', name: 'add menu' },
            { link: '/menu', name: 'MENU' },
            { link: '/news', name: 'OUR UPDATES' },
            { link: '/menucategory', name: 'menucategory' }

        ],
        image: [{ imgg: 'louis-hansel-dphM2U1xq0U-unsplash', }],
        menu: [{ img: 'brett-jordan-8xt8-HIFqc8-unsplash.jpg', time: 'breakfast', item: 'morning fresh', point: '12.50', review: '4.3/5', total: '102 reviews' },
            { img: 'l2.jpg', time: 'lunch', item: 'toplate soup', point: '24.50', review: '3/5', total: '50 reviews' },
            { img: 'a1.jpg', time: 'dinner', item: 'premium steak', point: '45', review: '4/5', total: '40 reviews' },
            { img: 'a2.jpg', time: 'dinner', item: 'seafood set', point: '86', review: '3/5', total: '44 reviews' },
            { img: 'l1.jpg', time: 'lunch', item: 'berger set', point: '20.50', review: '4.3/5', total: '102 reviews' },
            { img: 'm2.jpg', time: 'breakfast', item: 'healthy soup', point: '32.50', review: '4/5', total: '102 reviews' }
        ],
        head: [{ img: 's1.jpg', head1: 'new york', head2: 'fine dining restuarent' },
            { img: 's2.jpg', head1: 'new york', head2: 'fine dining restuarent' },
            { img: 's3.jpg', head1: 'new york', head2: 'fine dining restuarent' }


        ]




    })

})


module.exports = indexRouter;