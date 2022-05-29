const express = require('express');
const {
    getList,
    createListItem,
    } = require('../controller/protected.controller');

const listsRouter = express.Router();

listsRouter.get('/', getList);
listsRouter.post('/', createListItem);

module.exports = {
    listsRouter,
};