// services/bookService.js
const { Book, Author } = require("../models/init-models.js");
const { Op } = require('sequelize');

class BookService {
  async getAllBooks(page = 1, limit = 10, filters = {}) {
    const offset = (page - 1) * limit;
    const where = {};

    if (filters.search) {
        where[Op.or] = [
            { titulo: { [Op.like]: `%${filters.search}%` } },
        ];
    }
    if (filters.minYear) {
        where.anyo_publicacion = { ...where.anyo_publicacion, [Op.gte]: filters.minYear };
    }
    if (filters.maxYear) {
        where.anyo_publicacion = { ...where.anyo_publicacion, [Op.lte]: filters.maxYear };
    }

    const { count, rows } = await Book.findAndCountAll({
        where,
        include: [{ model: Author, as: 'author', attributes: ['nombre'] }],
        limit,
        offset,
        order: [['titulo', 'ASC']]
    });

    return {
        data: rows.map(book => {
            const b = book.toJSON();
            b.nombre_autor = b.author ? b.author.nombre : null;
            return b;
        }),
        pagination: {
            totalItems: count,
            totalPages: Math.ceil(count / limit),
            currentPage: page,
            itemsPerPage: limit
        }
    };
  }

  async getBookById(id_libro) {
    const result = await Book.findByPk(id_libro, { include: [{ model: Author, as: 'author' }] });
    return result;
  }

  async createBook(book) {
    const result = await Book.create(book);
    return result;
  }

  async deleteBook(id_libro) {
    const numFilas = await Book.destroy({ where: { id_libro: id_libro } });
    return numFilas;
  }

  async updateBook(book) {
    let numFilas = await Book.update(book, {
      where: { id_libro: book.id_libro },
    });

    if (numFilas == 0 && (await Book.findByPk(book.id_libro))) {
      numFilas = 1;
    }

    return numFilas;
  }

  async getBooksByPageCount(minPages) {
    const { count, rows } = await Book.findAndCountAll({
      where: {
        paginas: {
          [Op.gte]: minPages
        }
      },
      include: [{ model: Author, as: 'author', attributes: ['nombre'] }],
      order: [['paginas', 'DESC']]
    });

    return rows.map(book => {
      const b = book.toJSON();
      b.nombre_autor = b.author ? b.author.nombre : null;
      return b;
    });
  }
}

module.exports = new BookService();
