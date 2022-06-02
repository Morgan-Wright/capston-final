const express = require('express');
const {
    getList,
    addListItem,
    } = require('../controller/protected.controller');

const listsRouter = express.Router();

listsRouter.get('/', getList);
listsRouter.post('/', addListItem);

module.exports = {
    listsRouter,
};