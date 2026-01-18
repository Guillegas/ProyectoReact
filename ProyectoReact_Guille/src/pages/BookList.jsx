import React, { useEffect, useState } from "react";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  Pagination,
  TextField,
  Box,
  Container,
  Fab,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { getBooks, deleteBook } from "../services/api";
import BookForm from "../components/BookForm";
import ConfirmDialog from "../components/ConfirmDialog";

// Página principal para listar libros con paginación y búsqueda
const BookList = () => {
  //  lista de libros, paginación, búsqueda, control de formulario, libro actual, confirmación de borrado
  const [books, setBooks] = useState([]);
  const [pagination, setPagination] = useState({ count: 0, page: 1 });
  const [search, setSearch] = useState("");
  const [openForm, setOpenForm] = useState(false);
  const [currentBook, setCurrentBook] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  // obtener lista de libros con paginación y búsqueda
  const fetchBooks = async (page = 1) => {
    try {
      const response = await getBooks(page, 10, search);
      if (response && response.ok) {
        setBooks(response.datos.data);
        setPagination({
          count: response.datos.pagination.totalPages,
          page: response.datos.pagination.currentPage,
        });
      } else {
        console.error("Error en la respuesta del servidor:", response);
      }
    } catch (error) {
      console.error("Error cargando libros", error);
    }
  };

  // recargar libros cuando cambia la búsqueda
  useEffect(() => {
    fetchBooks(1);
  }, [search]); // Recargar al buscar

  // cambio de página, eliminar libro, editar libro, crear nuevo libro
  const handlePageChange = (event, value) => {
    fetchBooks(value);
  };

  const handleDelete = async () => {
    if (deleteId) {
      await deleteBook(deleteId);
      setDeleteId(null);
      fetchBooks(pagination.page);
    }
  };

  const handleEdit = (book) => {
    setCurrentBook(book);
    setOpenForm(true);
  };

  const handleCreate = () => {
    setCurrentBook(null);
    setOpenForm(true);
  };

  const handleFormSubmit = () => {
    setOpenForm(false);
    fetchBooks(pagination.page);
  };

  // cabecera con botón nuevo, campo de búsqueda, grid de tarjetas de libros, paginación, formulario y diálogo
  return (
    <Container>
      <Box sx={{ display: "flex", justifyContent: "space-between", my: 2 }}>
        <Typography variant="h4">Catálogo de Libros</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleCreate}
        >
          Nuevo Libro
        </Button>
      </Box>

      <TextField
        label="Buscar libros..."
        variant="outlined"
        fullWidth
        sx={{ mb: 3 }}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <Grid container spacing={3}>
        {books.map((book) => {
          console.log("Book data:", book); 
          return (
            <Grid item xs={12} sm={6} md={4} key={book.id_libro}>
              <Card>
                <CardMedia
                  component="img"
                  height="140"
                  image={
                    book.imagen
                      ? book.imagen.includes("covers.openlibrary.org")
                        ? `${book.imagen}?default=false`
                        : book.imagen
                      : "https://placehold.co/300x200?text=No+Image"
                  }
                  alt={book.titulo}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://placehold.co/300x200?text=No+Cover";
                  }}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {book.titulo}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {book.editorial} - {book.anyo_publicacion}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Autor: {book.nombre_autor || "Desconocido"}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" onClick={() => handleEdit(book)}>
                    <EditIcon /> Editar
                  </Button>
                  <Button
                    size="small"
                    color="error"
                    onClick={() => setDeleteId(book.id_libro)}
                  >
                    <DeleteIcon /> Borrar
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <Pagination
          count={pagination.count}
          page={pagination.page}
          onChange={handlePageChange}
        />
      </Box>

      <BookForm
        open={openForm}
        handleClose={() => setOpenForm(false)}
        currentBook={currentBook}
        onSuccess={handleFormSubmit}
      />

      <ConfirmDialog
        open={!!deleteId}
        title="Confirmar eliminación"
        content="¿Estás seguro de que quieres eliminar este libro?"
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />
    </Container>
  );
};

export default BookList;
