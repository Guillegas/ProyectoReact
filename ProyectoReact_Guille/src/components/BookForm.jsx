import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { createBook, updateBook, getAuthors } from "../services/api";

// Componente formulario para crear/editar libros
const BookForm = ({ open, handleClose, currentBook, onSuccess }) => {
  // Estado del formulario con todos los campos del libro
  const [formData, setFormData] = useState({
    titulo: "",
    isbn: "",
    editorial: "",
    anyo_publicacion: "",
    paginas: "",
    precio: "",
    id_autor: "",
    imagen: "",
  });
  const [authors, setAuthors] = useState([]);

  // Efecto: cargar lista de autores al montar el componente
  useEffect(() => {
    const fetchAuthors = async () => {
      const response = await getAuthors();
      if (response && response.ok) {
        setAuthors(response.datos);
      } else {
        console.error("Error cargando autores:", response);
      }
    };
    fetchAuthors();
  }, []);

  // Efecto: cargar datos del libro cuando se abre el formulario para edición
  useEffect(() => {
    if (currentBook) {
      setFormData({
        titulo: currentBook.titulo,
        isbn: currentBook.isbn || "",
        editorial: currentBook.editorial || "",
        anyo_publicacion: currentBook.anyo_publicacion || "",
        paginas: currentBook.paginas || "",
        precio: currentBook.precio || "",
        id_autor: currentBook.id_autor || "",
        imagen: currentBook.imagen || "",
      });
    } else {
      setFormData({
        titulo: "",
        isbn: "",
        editorial: "",
        anyo_publicacion: "",
        paginas: "",
        precio: "",
        id_autor: "",
        imagen: "",
      });
    }
  }, [currentBook, open]);

  // actualiza los campos del formulario (maneja checkboxes y campos normales)
  const handleChange = (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  // envía el formulario (crear o actualizar libro)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (currentBook) {
        await updateBook(currentBook.id_libro, formData);
      } else {
        await createBook(formData);
      }
      onSuccess();
    } catch (error) {
      console.error(error);
      alert("Error al guardar el libro");
    }
  };

  // diálogo modal con formulario de libro (título, ISBN, editorial, año, páginas, precio, imagen, autor)
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{currentBook ? "Editar Libro" : "Nuevo Libro"}</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="titulo"
            label="Título"
            fullWidth
            required
            value={formData.titulo}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="isbn"
            label="ISBN"
            fullWidth
            value={formData.isbn}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="editorial"
            label="Editorial"
            fullWidth
            value={formData.editorial}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="anyo_publicacion"
            label="Año"
            type="number"
            fullWidth
            value={formData.anyo_publicacion}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="paginas"
            label="Páginas"
            type="number"
            fullWidth
            value={formData.paginas}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="precio"
            label="Precio"
            type="number"
            value={formData.precio}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="imagen"
            label="URL Imagen"
            fullWidth
            value={formData.imagen}
            onChange={handleChange}
          />

          <FormControl fullWidth margin="dense">
            <InputLabel>Autor</InputLabel>
            <Select
              name="id_autor"
              value={formData.id_autor}
              onChange={handleChange}
            >
              {authors.map((auth) => (
                <MenuItem key={auth.id_autor} value={auth.id_autor}>
                  {auth.nombre}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button type="submit" variant="contained">
            Guardar
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default BookForm;
