const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');
const Author = require('./author');

const Book = sequelize.define('Book', {
    id_libro: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    titulo: {
        type: DataTypes.STRING(200),
        allowNull: false
    },
    isbn: {
        type: DataTypes.STRING(13),
        unique: true
    },
    editorial: {
        type: DataTypes.STRING(100)
    },
    anyo_publicacion: {
        type: DataTypes.INTEGER
    },
    paginas: {
        type: DataTypes.INTEGER
    },
    precio: {
        type: DataTypes.DECIMAL(6, 2)
    },
    imagen: {
        type: DataTypes.STRING(255)
    },
    id_autor: {
        type: DataTypes.INTEGER,
        references: {
            model: Author,
            key: 'id_autor'
        }
    }
}, {
    tableName: 'libros',
    timestamps: false
});

// relaciones
Author.hasMany(Book, { foreignKey: 'id_autor', as: 'books' });
Book.belongsTo(Author, { foreignKey: 'id_autor', as: 'author' });

module.exports = Book;
