const sequelize = require('../config/sequelize');
const Author = require('./author');
const Book = require('./book');

module.exports = {
    sequelize,
    Author,
    Book
};
