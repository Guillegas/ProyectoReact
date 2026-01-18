import { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import { getAuthors, deleteAuthor } from "../services/api";
import AuthorForm from "../components/AuthorForm";
import ConfirmDialog from "../components/ConfirmDialog";

// Página de listado básico de autores en formato tabla
function AuthorTableList() {
  // Estados: lista de autores, error, formulario y confirmación de borrado
  const [datos, setDatos] = useState([]);
  const [error, setError] = useState(null);
  const [openForm, setOpenForm] = useState(false);
  const [currentAuthor, setCurrentAuthor] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  // Cargar lista de autores desde la API
  useEffect(() => {
    async function fetchAutores() {
      try {
        const respuesta = await getAuthors();

        if (respuesta && respuesta.ok) {
          // Actualizamos los datos de autores
          setDatos(respuesta.datos);
          // Y no tenemos errores
          setError(null);
        } else {
          setError(respuesta?.mensaje || "Error al cargar autores");
          setDatos([]);
        }
      } catch (error) {
        setError(error.mensaje || "No se pudo conectar al servidor");
        setDatos([]);
      }
    }

    fetchAutores();
  }, []);

  // Eliminar un autor
  async function handleDelete() {
    if (!deleteId) return;

    try {
      await deleteAuthor(deleteId);

      const datos_nuevos = datos.filter((autor) => autor.id_autor != deleteId);

      // Actualizamos los datos de autores sin el que hemos borrado
      setDatos(datos_nuevos);

      // Y no tenemos errores
      setError(null);
      setDeleteId(null);
    } catch (error) {
      setError(error.mensaje || "No se pudo conectar al servidor");
    }
  }

  // Abrir formulario para editar autor
  const handleEdit = (autor) => {
    setCurrentAuthor(autor);
    setOpenForm(true);
  };

  // Abrir formulario para crear nuevo autor
  const handleCreate = () => {
    setCurrentAuthor(null);
    setOpenForm(true);
  };

  // Recargar lista después de crear/editar
  const handleFormSubmit = async () => {
    setOpenForm(false);
    const respuesta = await getAuthors();
    if (respuesta && respuesta.ok) {
      setDatos(respuesta.datos);
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
          No hay autores disponibles
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleCreate}
          >
            Nuevo Autor
          </Button>
        </Box>
      </>
    );
  }

  // Tabla de autores con cabecera y botón de nuevo
  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between", my: 3 }}>
        <Typography variant="h4">Listado de autores</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleCreate}
        >
          Nuevo Autor
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table stickyHeader aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell align="center">Nacionalidad</TableCell>
              <TableCell align="center">Fecha nacimiento</TableCell>
              <TableCell align="center">Activo</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {datos.map((row) => (
              <TableRow key={row.id_autor}>
                <TableCell>{row.nombre}</TableCell>
                <TableCell align="center">{row.nacionalidad}</TableCell>
                <TableCell align="center">{row.fecha_nacimiento}</TableCell>
                <TableCell align="center">{row.activo ? "Sí" : "No"}</TableCell>
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
                    onClick={() => setDeleteId(row.id_autor)}
                  >
                    <DeleteIcon />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <AuthorForm
        open={openForm}
        handleClose={() => setOpenForm(false)}
        currentAuthor={currentAuthor}
        onSuccess={handleFormSubmit}
      />

      <ConfirmDialog
        open={!!deleteId}
        title="Eliminar Autor"
        content="¿Estás seguro?"
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />
    </>
  );
}

export default AuthorTableList;
