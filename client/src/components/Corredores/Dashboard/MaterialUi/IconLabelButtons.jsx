// Importar las dependencias necesarias desde React y Material-UI
import * as React from "react";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import Stack from "@mui/material/Stack";

// Definir el componente funcional IconLabelButtons
export default function IconLabelButtons() {
  return (
    <Stack>
      {/* Botón con etiqueta e ícono */}
      <Button
        variant="outlined" // Estilo de borde para el botón
        style={{ color: "white", borderColor: "#ae2dff" }} // Estilos personalizados para el botón (color del texto y borde)
        endIcon={<SendIcon style={{ color: "#ae2dff" }} />} // Ícono que se muestra al final del texto del botón (color personalizado para el ícono)
      >
        Enviar {/* Texto del botón */}
      </Button>
    </Stack>
  );
}
