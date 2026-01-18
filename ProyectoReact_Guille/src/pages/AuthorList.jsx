import React, { useEffect, useState } from "react";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { Container, Typography, Button, Box } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { getAuthors, deleteAuthor } from "../services/api";
import AuthorForm from "../components/AuthorForm";
import ConfirmDialog from "../components/ConfirmDialog";

// Página principal para listar y gestionar autores
const AuthorList = () => {
  // Estados: lista de autores, control de formulario, autor actual y confirmación de borrado
  const [authors, setAuthors] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const [currentAuthor, setCurrentAuthor] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  // obtener lista de autores desde la API
  const fetchAuthors = async () => {
    const response = await getAuthors();
    if (response && response.ok) {
      setAuthors(response.datos);
    } else {
      console.error("Error cargando autores:", response);
    }
  };

  // cargar autores al montar el componente
  useEffect(() => {
    fetchAuthors();
  }, []);

  // eliminar autor seleccionado
  const handleDelete = async () => {
    if (deleteId) {
      await deleteAuthor(deleteId);
      setDeleteId(null);
      fetchAuthors();
    }
  };

  // abrir formulario de edición con datos del autor
  const handleEdit = (row) => {
    setCurrentAuthor(row);
    setOpenForm(true);
  };

  // columnas de la tabla (ID, nombre, nacionalidad, fecha, estado, acciones)
  const columns = [
    { field: "id_autor", headerName: "ID", width: 70 },
    { field: "nombre", headerName: "Nombre", width: 200 },
    { field: "nacionalidad", headerName: "Nacionalidad", width: 130 },
    { field: "fecha_nacimiento", headerName: "Nacimiento", width: 130 },
    {
      field: "activo",
      headerName: "Activo",
      width: 100,
      renderCell: (params) => (params.value ? "Sí" : "No"),
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Acciones",
      width: 100,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<EditIcon />}
          label="Edit"
          onClick={() => handleEdit(params.row)}
        />,
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Delete"
          onClick={() => setDeleteId(params.row.id_autor)}
        />,
      ],
    },
  ];

  // JSX: tabla de autores con botón de nuevo autor, formulario modal y diálogo de confirmación
  return (
    <Container sx={{ height: 600, width: "100%" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", my: 2 }}>
        <Typography variant="h4">Autores</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => {
            setCurrentAuthor(null);
            setOpenForm(true);
          }}
        >
          Nuevo Autor
        </Button>
      </Box>

      <DataGrid
        rows={authors}
        columns={columns}
        getRowId={(row) => row.id_autor}
        pageSize={10}
        rowsPerPageOptions={[10]}
      />

      <AuthorForm
        open={openForm}
        handleClose={() => setOpenForm(false)}
        currentAuthor={currentAuthor}
        onSuccess={() => {
          setOpenForm(false);
          fetchAuthors();
        }}
      />

      <ConfirmDialog
        open={!!deleteId}
        title="Eliminar Autor"
        content="¿Estás seguro?"
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />
    </Container>
  );
};

export default AuthorList;
