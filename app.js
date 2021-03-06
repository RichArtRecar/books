//List of requires
const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');


const app = express();
const port = process.env.PORT || 3000;

//eslint-disable-next-line new-cap


app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(express.static(path.join(__dirname, '/public')));
app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/jquery/dist')));
app.set('views', './src/views');
app.set('view engine', 'ejs');

//Nav
const nav = [{
        link: '/books',
        title: 'Book'
    },
    {
        link: '/authors',
        title: 'Author'
    }
];
const bookRouter = require('./src/routes/bookRoutes')(nav);
const adminRouter = require('./src/routes/adminRoutes')(nav);
const authRouter = require('./src/routes/authRoutes')(nav);
//

app.get('/', (req, res) => {
    //eslint-disable-next-line quote-props
    res.render('index', {
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
        title: 'My Blog'
    });
});
app.use('/books', bookRouter);
app.use('/admin', adminRouter);
app.use('/auth', authRouter);

app.get('/', (_req, res) => {
    res.sendFile(path.join(__dirname, 'views/index.html'));
});


app.listen(port, () => {
    debug(`listening on port ${chalk.green(port)}`);
});