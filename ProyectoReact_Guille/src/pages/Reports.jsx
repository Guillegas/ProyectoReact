import React, { useEffect, useState, useRef } from "react";
import { Container, Typography, Box, CircularProgress } from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { getBooks } from "../services/api";

/**
 * Componente que muestra informes y estadísticas de libros.
 * Incluye una gráfica de barras y listados.
 * @component
 */
const Reports = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const chartRef = useRef(null);

  /**
   * Efecto para cargar los datos al montar el componente.
   */
  useEffect(() => {
    fetchData();
  }, []);

  /**
   * Obtiene los datos de libros desde la API para alimentar la gráfica.
   * @async
   */
  const fetchData = async () => {
    try {
      // Fetching a larger limit to get meaningful data for the chart
      const response = await getBooks(1, 100);
      // The API returns { ok: true, datos: { data: [...] } }
      if (response && response.datos && response.datos.data) {
        setBooks(response.datos.data);
      } else {
        setBooks([]);
      }
    } catch (error) {
      console.error("Error fetching books:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" marginTop={4}>
        <CircularProgress />
      </Box>
    );
  }

  // Preparaing data for Recharts (e.g., top 10 books by pages)
  const chartData = books
    .filter((b) => b.paginas)
    .sort((a, b) => b.paginas - a.paginas)
    .slice(0, 10)
    .map((b) => ({
      name: b.titulo.length > 15 ? b.titulo.substring(0, 15) + "..." : b.titulo,
      fullTitle: b.titulo,
      Páginas: b.paginas,
    }));

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Informes y Estadísticas
      </Typography>

      <Box
        ref={chartRef}
        sx={{
          p: 2,
          bgcolor: "background.paper",
          borderRadius: 2,
          boxShadow: 1,
        }}
      >
        <Typography variant="h5" align="center" gutterBottom>
          Top 10 Libros con más Páginas
        </Typography>
        <div style={{ width: "100%", height: 400 }}>
          <ResponsiveContainer>
            <BarChart
              data={chartData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip
                labelFormatter={(value, entry) =>
                  entry[0]?.payload.fullTitle || value
                }
              />
              <Legend />
              <Bar dataKey="Páginas" fill="#8884d8" name="Número de Páginas" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Box>
    </Container>
  );
};

export default Reports;
