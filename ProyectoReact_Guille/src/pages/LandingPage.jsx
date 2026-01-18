import React from "react";
import { MDBCarousel, MDBCarouselItem } from "mdb-react-ui-kit";
import { Container, Typography, Box, Paper } from "@mui/material";

// Página de inicio con carrusel de imágenes y descripción de la aplicación
const LandingPage = () => {
  // título, carrusel con imágenes de biblioteca y sección informativa
  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          align="center"
          color="text.primary"
        >
          Bienvenidos a la Biblioteca Clásica
        </Typography>

        <MDBCarousel showControls showIndicators>
          <MDBCarouselItem itemId={1}>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4Lz2XD1DHsZwJsF3eOiT0AMj20svZ7jayWQ&s"
              className="d-block w-100"
              alt="Escritorio antiguo"
              style={{ height: "400px", objectFit: "cover" }}
            />
          </MDBCarouselItem>
          <MDBCarouselItem itemId={2}>
            <img
              src="https://preview.redd.it/01w76j4p5tp51.jpg?width=1080&crop=smart&auto=webp&s=ea979fec421110472c1654d5917f37e967852e0b"
              className="d-block w-100"
              alt="Biblioteca"
              style={{ height: "400px", objectFit: "cover" }}
            />
          </MDBCarouselItem>
        </MDBCarousel>

        <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
          <Typography variant="body1">
            Esta aplicación web permite gestionar una colección de libros y sus
            autores. Utilizando React, Node.js y MySQL, ofrecemos una
            experiencia rápida y accesible para navegar por nuestra base de
            datos literaria.
          </Typography>
        </Paper>
      </Box>
    </Container>
  );
};

export default LandingPage;
