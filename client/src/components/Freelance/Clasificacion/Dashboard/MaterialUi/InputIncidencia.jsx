import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

// Componente funcional InputIncidencia
export default function InputIncidencia({
  inputIncidencia,
  setInputIncidencia,
}) {
  // Función para manejar el cambio en el valor del campo de texto
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
      {/* Componente TextField para el campo de entrada de texto */}
      <TextField
        fullWidth
        label="Incidencia" // Etiqueta que se muestra encima del campo de texto
        id="Incidencia" // Identificador único del campo de texto
        value={inputIncidencia} // Valor del campo de texto, viene del estado inputIncidencia
        onChange={handleChange} // Función que se ejecuta cuando cambia el valor del campo
        InputProps={{
          style: {
            color: "white",
          },
          multiline: true, // Permite múltiples líneas de texto
          rows: 8, // Número de filas visibles en el campo
        }}
        InputLabelProps={{
          style: {
            color: "white",
          },
        }}
        variant="outlined" // Estilo de la variante del campo de texto
      />
    </Box>
  );
}
