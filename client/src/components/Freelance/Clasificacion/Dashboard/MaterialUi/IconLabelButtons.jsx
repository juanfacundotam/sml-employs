import * as React from "react";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import Stack from "@mui/material/Stack";

// Componente de función para el botón con ícono y etiqueta
export default function IconLabelButtons() {
  return (
    <Stack>
      {/* Botón con variante "contained" y un estilo personalizado */}
      <Button
        variant="contained"
        style={{
          color: "white",
          borderColor: "#ae2dff",
          background: "#ae2dff",
        }}
        // Ícono que se muestra al final del texto del botón
        endIcon={<SendIcon />}
      >
        Enviar
      </Button>
    </Stack>
  );
}
