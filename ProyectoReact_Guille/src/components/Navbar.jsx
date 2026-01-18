import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  Menu,
  MenuItem,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useTheme } from "@mui/material/styles";
import { useColorMode } from "./Layout";

// barra de navegación con enlaces y botón de cambio de tema
const Navbar = () => {
  const theme = useTheme();
  const { toggleColorMode } = useColorMode();
  const [anchorElLibros, setAnchorElLibros] = React.useState(null);
  const [anchorElAutores, setAnchorElAutores] = React.useState(null);

  const handleOpenLibrosMenu = (event) => {
    setAnchorElLibros(event.currentTarget);
  };

  const handleCloseLibrosMenu = () => {
    setAnchorElLibros(null);
  };

  const handleOpenAutoresMenu = (event) => {
    setAnchorElAutores(event.currentTarget);
  };

  const handleCloseAutoresMenu = () => {
    setAnchorElAutores(null);
  };

  // barra superior con título, menús desplegables de navegación y botón de tema
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, fontFamily: "Georgia" }}
        >
          Biblioteca Clásica
        </Typography>

        <Button color="inherit" component={RouterLink} to="/">
          Inicio
        </Button>

        {/* Menú desplegable de Libros */}
        <Button
          color="inherit"
          onClick={handleOpenLibrosMenu}
          endIcon={<ArrowDropDownIcon />}
        >
          Libros
        </Button>
        <Menu
          anchorEl={anchorElLibros}
          open={Boolean(anchorElLibros)}
          onClose={handleCloseLibrosMenu}
        >
          <MenuItem
            component={RouterLink}
            to="/libros-tabla"
            onClick={handleCloseLibrosMenu}
          >
            Listado Básico
          </MenuItem>
          <MenuItem
            component={RouterLink}
            to="/libros"
            onClick={handleCloseLibrosMenu}
          >
            Listado con Cards
          </MenuItem>
          <MenuItem
            component={RouterLink}
            to="/libros-filtro"
            onClick={handleCloseLibrosMenu}
          >
            Filtrar por Páginas
          </MenuItem>
        </Menu>

        {/* Menú desplegable de Autores */}
        <Button
          color="inherit"
          onClick={handleOpenAutoresMenu}
          endIcon={<ArrowDropDownIcon />}
        >
          Autores
        </Button>
        <Menu
          anchorEl={anchorElAutores}
          open={Boolean(anchorElAutores)}
          onClose={handleCloseAutoresMenu}
        >
          <MenuItem
            component={RouterLink}
            to="/autores-tabla"
            onClick={handleCloseAutoresMenu}
          >
            Listado Básico
          </MenuItem>
          <MenuItem
            component={RouterLink}
            to="/autores"
            onClick={handleCloseAutoresMenu}
          >
            DataGrid
          </MenuItem>
          <MenuItem
            component={RouterLink}
            to="/autores-filtro"
            onClick={handleCloseAutoresMenu}
          >
            Filtrar por Año
          </MenuItem>
        </Menu>

        <IconButton sx={{ ml: 1 }} onClick={toggleColorMode} color="inherit">
          {theme.palette.mode === "dark" ? (
            <Brightness7Icon />
          ) : (
            <Brightness4Icon />
          )}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
