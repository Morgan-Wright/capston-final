require('dotenv').config({path: '../.env'});

const {PORT} = process.env;

// const path = require('path');
const express = require('express');

const app = express();

app.use(express.json());

app.listen(PORT, () => {console.log(`server running on ${PORT}`)});


