import { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import { getBooks, deleteBook } from "../services/api";
import BookForm from "../components/BookForm";
import ConfirmDialog from "../components/ConfirmDialog";

// Página de listado básico de libros en formato tabla
function BookTableList() {
  // Estados: lista de libros, error, formulario y confirmación de borrado
  const [datos, setDatos] = useState([]);
  const [error, setError] = useState(null);
  const [openForm, setOpenForm] = useState(false);
  const [currentBook, setCurrentBook] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  // Cargar lista de libros desde la API
  useEffect(() => {
    async function fetchLibros() {
      try {
        const respuesta = await getBooks(1, 100, ""); // Carga primeros 100 sin paginación

        if (respuesta && respuesta.ok) {
          // Actualizamos los datos de libros
          setDatos(respuesta.datos.data);
          // Y no tenemos errores
          setError(null);
        } else {
          setError(respuesta?.mensaje || "Error al cargar libros");
          setDatos([]);
        }
      } catch (error) {
        setError(error.mensaje || "No se pudo conectar al servidor");
        setDatos([]);
      }
    }

    fetchLibros();
  }, []);

  // Eliminar un libro
  async function handleDelete() {
    if (!deleteId) return;

    try {
      await deleteBook(deleteId);

      const datos_nuevos = datos.filter((libro) => libro.id_libro != deleteId);

      // Actualizamos los datos de libros sin el que hemos borrado
      setDatos(datos_nuevos);

      // Y no tenemos errores
      setError(null);
      setDeleteId(null);
    } catch (error) {
      setError(error.mensaje || "No se pudo conectar al servidor");
    }
  }

  // Abrir formulario para editar libro
  const handleEdit = (libro) => {
    setCurrentBook(libro);
    setOpenForm(true);
  };

  // Abrir formulario para crear nuevo libro
  const handleCreate = () => {
    setCurrentBook(null);
    setOpenForm(true);
  };

  // Recargar lista después de crear/editar
  const handleFormSubmit = async () => {
    setOpenForm(false);
    const respuesta = await getBooks(1, 100, "");
    if (respuesta && respuesta.ok) {
      setDatos(respuesta.datos.data);
    }
  };

  // Mensaje de error
  if (error != null) {
    return (
      <>
        <Typography variant="h5" align="center" sx={{ mt: 3 }}>
          {error}
        </Typography>
      </>
    );
  }

  // Mensaje si no hay datos
  if (!datos || datos.length === 0) {
    return (
      <>
        <Typography variant="h5" align="center" sx={{ mt: 3 }}>
          No hay libros disponibles
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleCreate}
          >
            Nuevo Libro
          </Button>
        </Box>
      </>
    );
  }

  // Tabla de libros con cabecera y botón de nuevo
  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between", my: 3 }}>
        <Typography variant="h4">Listado de libros</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleCreate}
        >
          Nuevo Libro
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table stickyHeader aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Título</TableCell>
              <TableCell align="center">Editorial</TableCell>
              <TableCell align="center">Año</TableCell>
              <TableCell align="center">Páginas</TableCell>
              <TableCell align="center">Autor</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {datos.map((row) => (
              <TableRow key={row.id_libro}>
                <TableCell>{row.titulo}</TableCell>
                <TableCell align="center">{row.editorial}</TableCell>
                <TableCell align="center">{row.anyo_publicacion}</TableCell>
                <TableCell align="center">{row.paginas}</TableCell>
                <TableCell align="center">
                  {row.nombre_autor || "Desconocido"}
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleEdit(row)}
                    sx={{ mr: 1 }}
                  >
                    <EditIcon />
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => setDeleteId(row.id_libro)}
                  >
                    <DeleteIcon />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <BookForm
        open={openForm}
        handleClose={() => setOpenForm(false)}
        currentBook={currentBook}
        onSuccess={handleFormSubmit}
      />

      <ConfirmDialog
        open={!!deleteId}
        title="Eliminar Libro"
        content="¿Estás seguro?"
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />
    </>
  );
}

export default BookTableList;
