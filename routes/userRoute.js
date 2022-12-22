const express = require('express');
const { getAllUser, getOneUser } = require('../controllers/usersController');
const { checkCurrentUser } = require('../middlewares/checkCurrentUser');

const Router = express.Router();

Router.route('/latest').get(checkCurrentUser, getAllUser);
Router.route('/:userId').get(checkCurrentUser, getOneUser);

module.exports = Router;