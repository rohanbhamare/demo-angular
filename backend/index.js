require('./config/config');
require('./config/passportConfig');

const express = require('express');
const cors = require('cors');
const mongoose = require('./database/mongoose');
const passport = require('passport');

const Categories = require('./controllers/categories');
const Users = require('./controllers/users');

const app = express();

app.use(express.json());
app.use(cors({origin: "http://localhost:4200"}));
app.use(passport.initialize());
app.use(passport.session());
app.use('/categories', Categories);
app.use('/users', Users);

app.listen(3000, ()=>console.log("server is listening to port 3000..."))