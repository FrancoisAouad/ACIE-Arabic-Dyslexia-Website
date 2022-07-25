import express from 'express';
import bodyParser from 'body-parser';
import userRoutes from './routes/user.js';
import path from 'path';
import connectStore from 'connect-mongodb-session';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import csrf from 'csurf';
import dotenv from 'dotenv';
import session from 'express-session';
dotenv.config();

const app = express();
let port = process.env.PORT;
const MongoDBStore = connectStore(session);

// let IN_PROD=process.env.NODE_ENV==='production';
let DB_CONNECTION = process.env.MONGODB_URI;
//session store
const store = new MongoDBStore({
    uri: DB_CONNECTION,
    collection: 'sessions',
});

//initialize dependencies

app.set('view engine', 'ejs');
// const csrfProtection=csrf();
const __dirname = path.resolve();
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/public/img'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
//csrf protection middleware
// app.use(csrfProtection);

//CSRF MIDDLEWARE
// app.use((req, res, next)=>{

//     res.locals.csrfToken = req.csrfToken();
//     next();
// });

//session initialization and cookie
app.use(
    session({
        resave: false,
        saveUninitialized: false,
        secret: 'sdfgsdfsd/.;@weef',
        store: store,

        cookie: {
            maxAge: 1000 * 60 * 60 * 2,
            sameSite: true,
            // store:store
        },
    })
);

//ROUTES
app.use(userRoutes);

//ERROR 404
app.use((req, res, next) => {
    res.status(404).render('./partials/404');
});

//SERVER

mongoose
    .connect(DB_CONNECTION)
    .then((result) => {
        console.log('Successfully connected to MongoDB!');
        app.listen(port, console.log(`Server is listening on Port ${port}`));
    })
    .catch((error) => {
        console.log(error);
    });
