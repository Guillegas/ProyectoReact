import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import { createAuthor, updateAuthor } from "../services/api";

// Componente formulario para crear/editar autores
const AuthorForm = ({ open, handleClose, currentAuthor, onSuccess }) => {
  // Estado del formulario con los campos del autor
  const [formData, setFormData] = useState({
    nombre: "",
    nacionalidad: "",
    fecha_nacimiento: "",
    activo: true,
  });

  // cargar datos del autor cuando se abre el formulario para edición
  useEffect(() => {
    if (currentAuthor) {
      setFormData({
        nombre: currentAuthor.nombre,
        nacionalidad: currentAuthor.nacionalidad || "",
        fecha_nacimiento: currentAuthor.fecha_nacimiento
          ? currentAuthor.fecha_nacimiento.split("T")[0]
          : "",
        activo:
          currentAuthor.activo !== undefined ? currentAuthor.activo : true,
      });
    } else {
      setFormData({
        nombre: "",
        nacionalidad: "",
        fecha_nacimiento: "",
        activo: true,
      });
    }
  }, [currentAuthor, open]);

  // actualiza los campos del formulario
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // envía el formulario (crear o actualizar autor)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (currentAuthor) {
        await updateAuthor(currentAuthor.id_autor, formData);
      } else {
        await createAuthor(formData);
      }
      onSuccess();
    } catch (error) {
      console.error(error);
      alert("Error al guardar autor");
    }
  };

  // diálogo modal con formulario de autor (campos: nombre, nacionalidad, fecha, activo)
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>
        {currentAuthor ? "Editar Autor" : "Nuevo Autor"}
      </DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="nombre"
            label="Nombre"
            fullWidth
            required
            value={formData.nombre}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="nacionalidad"
            label="Nacionalidad"
            fullWidth
            value={formData.nacionalidad}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="fecha_nacimiento"
            label="Fecha Nacimiento"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={formData.fecha_nacimiento}
            onChange={handleChange}
          />
          <div style={{ marginTop: 16 }}>
            <label>
              <input
                type="checkbox"
                name="activo"
                checked={formData.activo}
                onChange={(e) =>
                  setFormData({ ...formData, activo: e.target.checked })
                }
              />{" "}
              Activo
            </label>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button type="submit" variant="contained">
            Guardar
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AuthorForm;
