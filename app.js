
//List of requires
const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;
//eslint-disable-next-line new-cap
const bookRouter = express.Router();

app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname, '/public')));
app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/jquery/dist')));
app.set('views', './src/views');
app.set('view engine', 'ejs');

const books = [
    {
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

app.use('/books', bookRouter);

bookRouter.route('/').get((req, res) => {
    res.render('books', {
        //eslint-disable-next-line array-element-newline
        nav: [{link: '/books', title: 'Books'},
            {link: '/authors', title: 'Authors'}
        ],
        title: 'My Blog',
        books
    });
});

app.get('/', (req, res) => {
    //eslint-disable-next-line quote-props
    res.render('index', {
        //eslint-disable-next-line array-element-newline
        nav: [{link: '/books', title: 'Books'},
            {link: '/authors', title: 'Authors'}
        ],
        title: 'My Blog'
    });
});

bookRouter.route('/single').get((req, res) => {
    res.send('Hello single Book');
});


app.get('/', (_req, res) => {
    res.sendFile(path.join(__dirname, 'views/index.html'));
});


app.listen(port, () => {
    debug(`listening on port ${chalk.green(port)}`);
});
