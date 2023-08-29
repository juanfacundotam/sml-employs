// Importamos las bibliotecas necesarias de React y Material-UI
import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

// Definimos un componente de función llamado BasicButtons
export default function BasicButtons() {
  return (
    // Utilizamos el componente Stack de Material-UI para alinear los botones en una fila con espaciado entre ellos
    <Stack spacing={2} direction="row">
      {/* Creamos un botón con la variante "contained" que muestra un fondo de color */}
      <Button variant="contained">Búsqueda</Button>
    </Stack>
  );
}
