const { logMensaje } = require("../utils/logger.js");
const authorService = require("../services/authorService");

class AuthorController {
  async getAllAuthors(req, res) {
    try {
      const authors = await authorService.getAllAuthors();
      return res.status(200).json({
        ok: true,
        datos: authors,
        mensaje: "Autores recuperados correctamente",
      });
    } catch (err) {
      logMensaje("Error en getAllAuthors:", err);
      return res.status(500).json({
        ok: false,
        datos: null,
        mensaje: "Error al recuperar autores",
      });
    }
  }

  async createAuthor(req, res) {
    const author = req.body;

    try {
      const authorNew = await authorService.createAuthor(author);

      return res.status(201).json({
        ok: true,
        datos: authorNew,
        mensaje: "Autor creado correctamente",
      });
    } catch (err) {
      logMensaje("Error en createAuthor:", err);
      return res.status(500).json({
        ok: false,
        datos: null,
        mensaje: "Error al crear un autor",
      });
    }
  }

  async deleteAuthor(req, res) {
    const id_autor = req.params.id;

    try {
      const numFilas = await authorService.deleteAuthor(id_autor);

      if (numFilas == 0) {
        return res.status(404).json({
          ok: false,
          datos: null,
          mensaje: "Autor no encontrado: " + id_autor,
        });
      } else {
        return res.status(204).send();
      }
    } catch (err) {
      logMensaje("Error en deleteAuthor:", err);
      return res.status(500).json({
        ok: false,
        datos: null,
        mensaje: "Error al borrar un autor",
      });
    }
  }

  async updateAuthor(req, res) {
    const id_autor = req.params.id;
    const author = req.body;
    author.id_autor = id_autor; 

    try {
      const numFilas = await authorService.updateAuthor(author);

      if (numFilas == 0) {
        return res.status(404).json({
          ok: false,
          datos: null,
          mensaje: "No encontrado: " + id_autor,
        });
      } else {
        res.status(204).send();
      }
    } catch (err) {
      logMensaje("Error en updateAuthor:", err);
      return res.status(500).json({
        ok: false,
        datos: null,
        mensaje: "Error al editar un autor",
      });
    }
  }

  async getAuthorById(req, res) {
    const id_autor = req.params.id;
    try {
      const author = await authorService.getAuthorById(id_autor);
      if (author) {
        return res.status(200).json({
          ok: true,
          datos: author,
          mensaje: "Autor recuperado correctamente",
        });
      } else {
        return res.status(404).json({
          ok: false,
          datos: null,
          mensaje: "Autor no encontrado",
        });
      }
    } catch (err) {
      logMensaje("Error en getAuthorById:", err);
      return res.status(500).json({
        ok: false,
        datos: null,
        mensaje: "Error al recuperar un autor",
      });
    }
  }

  async getAuthorsByBirthYear(req, res) {
    const minYear = req.query.minYear;
    
    if (!minYear) {
      return res.status(400).json({
        ok: false,
        datos: null,
        mensaje: "El parámetro minYear es requerido",
      });
    }

    try {
      const authors = await authorService.getAuthorsByBirthYear(minYear);
      return res.status(200).json({
        ok: true,
        datos: authors,
        mensaje: "Autores filtrados por año de nacimiento",
      });
    } catch (err) {
      logMensaje("Error en getAuthorsByBirthYear:", err);
      return res.status(500).json({
        ok: false,
        datos: null,
        mensaje: "Error al filtrar autores",
      });
    }
  }
}

module.exports = new AuthorController();
