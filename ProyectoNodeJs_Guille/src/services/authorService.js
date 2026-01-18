// services/authorService.js
const { Author } = require("../models/init-models.js");

class AuthorService {
  async getAllAuthors() {
    const result = await Author.findAll();
    return result;
  }

  async getAuthorById(id_autor) {
    const result = await Author.findByPk(id_autor);
    return result;
  }

  async createAuthor(author) {
    const result = await Author.create(author);
    return result;
  }

  async deleteAuthor(id_autor) {
    const numFilas = await Author.destroy({
      where: { id_autor: id_autor },
    });
    return numFilas;
  }

  async updateAuthor(author) {
    let numFilas = await Author.update(author, {
      where: { id_autor: author.id_autor },
    });
    
    // Check if 0 rows modified but record exists (no data change needed)
    if (numFilas == 0 && (await Author.findByPk(author.id_autor))) {
      numFilas = 1;
    }

    return numFilas;
  }

  async getAuthorsByBirthYear(minYear) {
    const { Op } = require('sequelize');
    const result = await Author.findAll({
      where: {
        fecha_nacimiento: {
          [Op.gte]: `${minYear}-01-01`
        }
      },
      order: [['fecha_nacimiento', 'ASC']]
    });
    return result;
  }
}

module.exports = new AuthorService();
