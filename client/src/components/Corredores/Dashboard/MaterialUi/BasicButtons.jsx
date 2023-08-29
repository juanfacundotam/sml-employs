// Importar las dependencias necesarias desde React y Material-UI
import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

// Definir el componente funcional BasicButtons
export default function BasicButtons() {
  return (
    // Utilizar el componente Stack de Material-UI para agrupar elementos verticalmente con un espacio de 2 unidades entre ellos
    <Stack spacing={2} direction="row">
      <Button variant="contained">Busqueda</Button>
    </Stack>
  );
}
