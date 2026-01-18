const { logMensaje } = require("../utils/logger.js");
const bookService = require("../services/bookService");

class BookController {
  async getAllBooks(req, res) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const filters = {
          search: req.query.search,
          minYear: req.query.minYear,
          maxYear: req.query.maxYear
      };

      const result = await bookService.getAllBooks(page, limit, filters);
      return res.status(200).json({
        ok: true,
        datos: result,
        mensaje: "Libros recuperados correctamente",
      });
    } catch (err) {
      logMensaje("Error en getAllBooks:", err);
      return res.status(500).json({
        ok: false,
        datos: null,
        mensaje: "Error al recuperar libros",
      });
    }
  }

  async createBook(req, res) {
    const book = req.body;

    try {
      const bookNew = await bookService.createBook(book);

      return res.status(201).json({
        ok: true,
        datos: bookNew,
        mensaje: "Libro creado correctamente",
      });
    } catch (err) {
      logMensaje("Error en createBook:", err);
      return res.status(500).json({
        ok: false,
        datos: null,
        mensaje: "Error al crear un libro",
      });
    }
  }

  async deleteBook(req, res) {
    const id_libro = req.params.id;

    try {
      const numFilas = await bookService.deleteBook(id_libro);

      if (numFilas == 0) {
        return res.status(404).json({
          ok: false,
          datos: null,
          mensaje: "Libro no encontrado: " + id_libro,
        });
      } else {
        return res.status(204).send();
      }
    } catch (err) {
      logMensaje("Error en deleteBook:", err);
      return res.status(500).json({
        ok: false,
        datos: null,
        mensaje: "Error al borrar un libro",
      });
    }
  }

  async updateBook(req, res) {
    const id_libro = req.params.id;
    const book = req.body;
    book.id_libro = id_libro;

    try {
      const numFilas = await bookService.updateBook(book);

      if (numFilas == 0) {
        return res.status(404).json({
          ok: false,
          datos: null,
          mensaje: "No encontrado: " + id_libro,
        });
      } else {
        res.status(204).send();
      }
    } catch (err) {
      logMensaje("Error en updateBook:", err);
      return res.status(500).json({
        ok: false,
        datos: null,
        mensaje: "Error al editar un libro",
      });
    }
  }

  async getBookById(req, res) {
    const id_libro = req.params.id;
    try {
      const book = await bookService.getBookById(id_libro);
      if (book) {
        return res.status(200).json({
          ok: true,
          datos: book,
          mensaje: "Libro recuperado correctamente",
        });
      } else {
        return res.status(404).json({
          ok: false,
          datos: null,
          mensaje: "Libro no encontrado",
        });
      }
    } catch (err) {
      logMensaje("Error en getBookById:", err);
      return res.status(500).json({
        ok: false,
        datos: null,
        mensaje: "Error al recuperar un libro",
      });
    }
  }

  async getBooksByPageCount(req, res) {
    const minPages = req.query.minPages;
    
    if (!minPages) {
      return res.status(400).json({
        ok: false,
        datos: null,
        mensaje: "El parámetro minPages es requerido",
      });
    }

    try {
      const books = await bookService.getBooksByPageCount(minPages);
      return res.status(200).json({
        ok: true,
        datos: books,
        mensaje: "Libros filtrados por número de páginas",
      });
    } catch (err) {
      logMensaje("Error en getBooksByPageCount:", err);
      return res.status(500).json({
        ok: false,
        datos: null,
        mensaje: "Error al filtrar libros",
      });
    }
  }
}

module.exports = new BookController();
