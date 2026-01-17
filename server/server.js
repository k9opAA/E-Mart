const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv/config');

app.use(cors());

//middleware
app.use(bodyParser.json());

//routes
const categoryRoutes = require('./routes/categories');
const productRoutes = require('./routes/products');

app.use('/api/category', categoryRoutes);
app.use('/api/products', productRoutes);

//Database
mongoose.connect(process.env.CONNECTION_STRING)
.then(()=>{
    console.log('Database Connection is ready...')
    //server
    app.listen(process.env.PORT, ()=>{
        console.log(`server running at http://localhost:${process.env.PORT}`)
    })
})
.catch((err)=> {
    console.log(err);
})
