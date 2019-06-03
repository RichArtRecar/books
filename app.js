//List of requires
const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');
const sql = require('mssql');

const config = {
    user: 'library',
    password: '1Drakehand',
    server: 'pslibraryrr.database.windows.net', // You can use 'localhost\\instance' to connect to named instance
    database: 'MyLibrary',

    options: {
        encrypt: true // Use this if you're on Windows Azure
    }
};


const app = express();
const port = process.env.PORT || 3000;

//eslint-disable-next-line new-cap

sql.connect(config).
    catch((err) => debug(err));
app.use(morgan('tiny'));
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

app.get('/', (_req, res) => {
    res.sendFile(path.join(__dirname, 'views/index.html'));
});


app.listen(port, () => {
    debug(`listening on port ${chalk.green(port)}`);
});
