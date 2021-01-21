const express = require('express');
const cors = require('cors');

const mongoose = require('./database/mongoose');
const Categories = require('./controllers/categories');

const app = express();

app.use(express.json());
app.use(cors({origin: "http://localhost:4200"}));
app.use('/categories', Categories);

app.listen(3000, ()=>console.log("server is listening to port 3000..."))