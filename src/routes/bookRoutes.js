const express = require('express');
const bookRouter = express.Router();
const sql = require('mssql');
const debug = require('debug')('app:bookRoutes');

function router(nav) {
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
        (async function query() {
            const request = new sql.Request();

            const result = await request.query('select * from books');

            debug(result);
            res.render('bookListView', {
                //eslint-disable-next-line array-element-newline
                nav,
                title: 'My Blog',
                books: result.recordset
            });
        }());
    });

    bookRouter.route('/:id').get((req, res) => {
        const {
            id
        } = req.params;

        res.render(
            'bookView', {
                nav,
                title: 'Library',
                book: books[id]
            }
        );
    });

    return bookRouter;
}
module.exports = router;