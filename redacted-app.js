const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const teamRoutes = require('./routes/team');

const MONGODB_URI = ''; // Redacted the URI for security.

const app = express();
const store = new MongoDBStore({
    uri: MONGODB_URI,
    collection: 'sessions'
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: 'team manager application secret code',
    resave: false,
    saveUninitialized: false,
    store: store
}));

app.use('/login', authRoutes);
app.use('/user', userRoutes);
app.use('/team', teamRoutes);

app.get('/', (req, res, next) => {res.sendFile(path.join(__dirname, 'public', 'index.html'))});

mongoose.connect(MONGODB_URI)
    .then(() => {
        console.log('Connected');
        app.listen(3000);
    })
    .catch((err) => {
        console.log('MongoDB Connection Error', err);
    })