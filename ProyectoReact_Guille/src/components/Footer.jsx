import React from "react";
import { Box, Typography, Container } from "@mui/material";

// footer con información del proyecto
const Footer = () => {
  // footer con fondo adaptable al tema (light/dark)
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: "auto",
        backgroundColor: (theme) =>
          theme.palette.mode === "light"
            ? theme.palette.grey[200]
            : theme.palette.grey[900],
      }}
    >
      <Container maxWidth="sm">
        <Typography variant="body1" align="center" color="text.primary">
          DIW - 2º DAM
        </Typography>
        <Typography variant="body2" color="text.secondary" align="center">
          Biblioteca Clásica.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
