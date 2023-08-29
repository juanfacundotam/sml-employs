// Importar las dependencias necesarias desde React y Material-UI
import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

// Definir el componente funcional InputIncidencia
export default function InputIncidencia({
  inputIncidencia,
  setInputIncidencia,
}) {
  // Función para manejar el cambio en el valor del TextField
  const handleChange = (event) => {
    setInputIncidencia(event.target.value);
  };

  return (
    <Box
      sx={{
        width: "70%",
        maxWidth: "100%",
        color: "white",
      }}
    >
      {/* TextField para ingresar la incidencia */}
      <TextField
        fullWidth
        label="Incidencia" // Etiqueta del TextField
        id="Incidencia"
        value={inputIncidencia} // Valor del TextField, proviene de la prop inputIncidencia
        onChange={handleChange} // Función para manejar el cambio en el valor del TextField
        InputProps={{
          style: {
            color: "white",
          },
          multiline: true, // Permitir varias líneas de texto
          rows: 8, // Número de filas del TextField
        }}
        InputLabelProps={{
          style: {
            color: "white",
          },
        }}
        variant="outlined" // Estilo de borde para el TextField
      />
    </Box>
  );
}
