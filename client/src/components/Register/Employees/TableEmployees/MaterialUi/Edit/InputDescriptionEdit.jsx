import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

export default function InputDescriptionEdit({
  inputDescription,
  setInputDescription,
}) {
  const handleChange = (event) => {
    setInputDescription(event.target.value);
  };

  return (
    <Box
      sx={{
        width: "80%",
        maxWidth: "100%",
        color: "white",
      }}
    >
      <TextField
        fullWidth
        label="Descripcion"
        id="Descripcion"
        value={inputDescription}
        onChange={handleChange}
        InputProps={{
          style: {
            color: "white",
          },
          multiline: true, // Agregamos esta propiedad para permitir múltiples líneas
          rows: 4, // Puedes ajustar la cantidad de filas que deseas mostrar
        }}
        InputLabelProps={{
          style: {
            color: "white",
          },
        }}
        variant="outlined" // Cambiamos la variante a "outlined" para que se vea como un textarea
      />
    </Box>
  );
}
