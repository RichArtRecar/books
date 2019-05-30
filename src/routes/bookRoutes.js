const express = require('express');
const bookRouter = express.Router();


const books = [{
    title: 'War and Peace',
    genre: 'Historical Fction',
    author: 'LNT',
    read: false
},
{
    title: 'Les Miserables',
    genre: 'Historical Fction',
    author: 'Victor Hugo',
    read: false
},
{
    title: 'The Time Machine',
    genre: 'Science Fction',
    author: 'H.G. Wells',
    read: false
},
{
    title: 'A Journey to The Center of the Earth',
    genre: 'Science Fction',
    author: 'Jules Verne',
    read: false
},
{
    title: 'The Dark World',
    genre: 'Fantasy',
    author: 'Henry Kuttner',
    read: false
}
];


bookRouter.route('/').get((req, res) => {
    res.render('books', {
        //eslint-disable-next-line array-element-newline
        nav: [{
            link: '/books',
            title: 'Books'
        },
        {
            link: '/authors',
            title: 'Authors'
        }
        ],
        title: 'My Blog',
        books
    });
});

bookRouter.route('/single').get((req, res) => {
    res.send('Hello single Book');
});

module.exports = bookRouter;
