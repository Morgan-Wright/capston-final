require('dotenv').config({path: '../.env'});

const {PORT, NODE_ENV} = process.env;

const path = require('path');
const express = require('express');

const app = express();
const session = require('express-session');
const { getList } = require('./routers/lists.router.js');

app.use(express.json());



const publicDir = path.join(__dirname, '../public/login');
app.use(express.static(publicDir));

app.get('/protected', (req, res) =>{
    res.redirect('/');
});

// app.get('/')

app.listen(PORT, () => {
    if (NODE_ENV === 'development') {
      console.log(`Server running on http://localhost:${PORT}`);
    } else {
      console.log(`Server listening on ${PORT}`);
    }
  });
