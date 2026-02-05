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
import { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import {
  PDFDownloadLink,
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import PrintIcon from "@mui/icons-material/Print";

const styles = StyleSheet.create({
  page: { flexDirection: "column", backgroundColor: "#fff", padding: 20 },
  header: { fontSize: 20, textAlign: "center", marginBottom: 20 },
  table: {
    display: "table",
    width: "auto",
    borderStyle: "solid",
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: { margin: "auto", flexDirection: "row" },
  tableCol: {
    width: "25%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCell: { margin: "auto", marginTop: 5, fontSize: 10 },
  tableHeader: {
    margin: "auto",
    marginTop: 5,
    fontSize: 12,
    fontWeight: "bold",
  },
});

const AuthorDocument = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.header}>Listado de Autores</Text>
      <View style={styles.table}>
        <View style={styles.tableRow}>
          <View style={styles.tableCol}>
            <Text style={styles.tableHeader}>Nombre</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableHeader}>Nacionalidad</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableHeader}>Fecha Nac.</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableHeader}>Activo</Text>
          </View>
        </View>
        {data.map((row) => (
          <View style={styles.tableRow} key={row.id_autor}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{row.nombre}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{row.nacionalidad}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{row.fecha_nacimiento}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{row.activo ? "Sí" : "No"}</Text>
            </View>
          </View>
        ))}
      </View>
    </Page>
  </Document>
);

// Página de listado básico de autores en formato tabla
/**
 * Componente de página que muestra un listado de autores en una tabla.
 * Permite crear, editar, eliminar y exportar a PDF (imagen y reporte).
 * @component
 */
function AuthorTableList() {
  // Estados: lista de autores, error, formulario y confirmación de borrado
  const [datos, setDatos] = useState([]);
  const [error, setError] = useState(null);
  const [openForm, setOpenForm] = useState(false);
  const [currentAuthor, setCurrentAuthor] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const tableRef = useRef(null);

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
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          my: 3,
          alignItems: "center",
        }}
      >
        <Typography variant="h4">Listado de autores</Typography>
        <Box>
          <Button
            variant="outlined"
            color="secondary"
            size="small"
            startIcon={<PrintIcon />}
            onClick={async () => {
              const element = tableRef.current;
              if (!element) return;
              const canvas = await html2canvas(element);
              const imgData = canvas.toDataURL("image/png");
              const pdf = new jsPDF("p", "mm", "a4");
              const pdfWidth = pdf.internal.pageSize.getWidth();
              const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
              pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
              pdf.save("autores-imagen.pdf");
            }}
            sx={{ mr: 1 }}
          >
            PDF Imagen
          </Button>

          <PDFDownloadLink
            document={<AuthorDocument data={datos} />}
            fileName="listado-autores.pdf"
            style={{ textDecoration: "none", marginRight: "8px" }}
          >
            {({ loading }) => (
              <Button
                variant="outlined"
                color="secondary"
                size="small"
                startIcon={<PictureAsPdfIcon />}
                disabled={loading}
              >
                {loading ? "..." : "PDF Reporte"}
              </Button>
            )}
          </PDFDownloadLink>

          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleCreate}
          >
            Nuevo Autor
          </Button>
        </Box>
      </Box>

      <TableContainer component={Paper} ref={tableRef}>
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
