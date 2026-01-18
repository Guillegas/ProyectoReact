import React, { useState } from "react";
import {
  Container,
  Typography,
  Button,
  Box,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import { getAuthorsByYear } from "../services/api";

// Página para filtrar autores por año de nacimiento
const AuthorsByYear = () => {
  // lista filtrada, año mínimo ingresado, estado de carga
  const [authors, setAuthors] = useState([]);
  const [minYear, setMinYear] = useState("");
  const [loading, setLoading] = useState(false);

  // filtrar autores nacidos a partir del año especificado
  const handleFilter = async () => {
    if (!minYear) {
      alert("Por favor, ingrese un año");
      return;
    }

    setLoading(true);
    try {
      const response = await getAuthorsByYear(minYear);
      if (response && response.ok) {
        setAuthors(response.datos);
      } else {
        console.error("Error en la respuesta del servidor:", response);
        alert("Error al filtrar autores");
      }
    } catch (error) {
      console.error("Error filtrando autores:", error);
      alert("Error al filtrar autores");
    } finally {
      setLoading(false);
    }
  };

  // campo de año, botón filtrar y tabla de resultados
  return (
    <Container sx={{ mt: 3 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Autores por Año de Nacimiento
      </Typography>

      <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
        <TextField
          label="Año mínimo de nacimiento"
          type="number"
          value={minYear}
          onChange={(e) => setMinYear(e.target.value)}
          placeholder="Ej: 1950"
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

      {authors.length > 0 ? (
        <TableContainer component={Paper}>
          <Table stickyHeader aria-label="tabla de autores filtrados">
            <TableHead>
              <TableRow>
                <TableCell>Nombre</TableCell>
                <TableCell align="center">Nacionalidad</TableCell>
                <TableCell align="center">Fecha de Nacimiento</TableCell>
                <TableCell align="center">Activo</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {authors.map((row) => (
                <TableRow key={row.id_autor}>
                  <TableCell>{row.nombre}</TableCell>
                  <TableCell align="center">{row.nacionalidad}</TableCell>
                  <TableCell align="center">{row.fecha_nacimiento}</TableCell>
                  <TableCell align="center">
                    {row.activo ? "Sí" : "No"}
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
              : "No se han encontrado autores. Use el filtro para buscar."}
          </Typography>
        </Box>
      )}
    </Container>
  );
};

export default AuthorsByYear;
