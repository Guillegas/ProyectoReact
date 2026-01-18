import React, { useState } from "react";
import {
  Typography,
  Button,
  TextField,
  Box,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import { getBooksByPages } from "../services/api";

// Página para filtrar libros por número mínimo de páginas
const BooksByPages = () => {
  // lista filtrada, páginas mínimas ingresadas, estado de carga
  const [books, setBooks] = useState([]);
  const [minPages, setMinPages] = useState("");
  const [loading, setLoading] = useState(false);

  // filtrar libros con mínimo de páginas especificado
  const handleFilter = async () => {
    if (!minPages) {
      alert("Por favor, ingrese un número de páginas");
      return;
    }

    setLoading(true);
    try {
      const response = await getBooksByPages(minPages);
      if (response && response.ok) {
        setBooks(response.datos);
      } else {
        console.error("Error en la respuesta del servidor:", response);
        alert("Error al filtrar libros");
      }
    } catch (error) {
      console.error("Error filtrando libros:", error);
      alert("Error al filtrar libros");
    } finally {
      setLoading(false);
    }
  };

  // campo de páginas, botón filtrar y tabla de resultados
  return (
    <Container sx={{ mt: 3 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Libros por Número de Páginas
      </Typography>

      <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
        <TextField
          label="Número mínimo de páginas"
          type="number"
          value={minPages}
          onChange={(e) => setMinPages(e.target.value)}
          placeholder="Ej: 500"
          sx={{ width: 250 }}
        />
        <Button
          variant="contained"
          startIcon={<FilterListIcon />}
          onClick={handleFilter}
          disabled={loading}
        >
          Filtrar
        </Button>
      </Box>

      {books.length > 0 ? (
        <TableContainer component={Paper}>
          <Table stickyHeader aria-label="tabla de libros filtrados">
            <TableHead>
              <TableRow>
                <TableCell>Título</TableCell>
                <TableCell align="center">Editorial</TableCell>
                <TableCell align="center">Año</TableCell>
                <TableCell align="center">Páginas</TableCell>
                <TableCell align="center">Autor</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {books.map((row) => (
                <TableRow key={row.id_libro}>
                  <TableCell>{row.titulo}</TableCell>
                  <TableCell align="center">{row.editorial}</TableCell>
                  <TableCell align="center">{row.anyo_publicacion}</TableCell>
                  <TableCell align="center">{row.paginas}</TableCell>
                  <TableCell align="center">
                    {row.nombre_autor || "Desconocido"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Box sx={{ textAlign: "center", mt: 4 }}>
          <Typography variant="body1" color="text.secondary">
            {loading
              ? "Cargando..."
              : "No se han encontrado libros. Use el filtro para buscar."}
          </Typography>
        </Box>
      )}
    </Container>
  );
};

export default BooksByPages;
