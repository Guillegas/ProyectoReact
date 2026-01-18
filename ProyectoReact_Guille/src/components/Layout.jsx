import React, { useState, useMemo, createContext, useContext } from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { getTheme } from "../theme";
import Navbar from "./Navbar";
import Footer from "./Footer";

// Contexto para compartir la función de cambio de tema (light/dark)
const ColorModeContext = createContext({ toggleColorMode: () => {} });

// Hook para acceder al contexto del tema
export const useColorMode = () => useContext(ColorModeContext);

// Componente principal que proporciona tema, navbar y footer
const Layout = ({ children }) => {
  // Estado para el modo de color (light/dark)
  const [mode, setMode] = useState("light");

  // Objeto memorizado con función para alternar el tema
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    [],
  );

  // Tema memorizado basado en el modo actual
  const theme = useMemo(() => getTheme(mode), [mode]);

  // proveedor de tema con estructura de layout (navbar, contenido, footer)
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
          }}
        >
          <Navbar />
          <main style={{ flex: 1, padding: "20px" }}>{children}</main>
          <Footer />
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default Layout;
