import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Checkbox, FormControlLabel } from "@mui/material";

// Estilo del modal
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#39394B",
  color: "white",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

// Componente de función para el modal
export default function BasicModal() {
  // Estado para controlar si el modal está abierto o cerrado
  const [open, setOpen] = React.useState(false);

  // Estados para el estado de los checkboxes
  const [seguidores2000, setSeguidores2000] = React.useState(false);
  const [repercusion, setRepercusion] = React.useState(false);
  const [frecuencia, setFrecuencia] = React.useState(false);
  const [contenidoPersonal, setContenidoPersonal] = React.useState(false);
  const [contenidoValor, setContenidoValor] = React.useState(false);
  const [calidadInstagram, setCalidadInstagram] = React.useState(false);

  // Funciones para abrir y cerrar el modal
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Función para manejar el cambio del estado de "seguidores2000" cuando se hace clic en su checkbox
  const currentClient = () => {
    setSeguidores2000(!seguidores2000);
  };

  return (
    <div>
      {/* Botón para abrir el modal */}
      <Button onClick={handleOpen}>Descripción</Button>
      {/* Modal */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {/* Contenido del modal */}
        <Box sx={style}>
          <div>
            {/* Checkboxes con etiquetas para evaluar características del cliente */}
            <FormControlLabel
              onClick={currentClient}
              control={<Checkbox />}
              label="Tiene más de 2000 seguidores?"
            />
            <FormControlLabel
              control={<Checkbox />}
              label="Tiene Repercusión en sus Reels-Publicaciones?"
            />
            <FormControlLabel
              control={<Checkbox />}
              label="Sube contenido con frecuencia?"
            />
            <FormControlLabel
              control={<Checkbox />}
              label="Su contenido tiende a la marca personal?"
            />
            <FormControlLabel
              control={<Checkbox />}
              label="Sube Contenido de valor?"
            />
            <FormControlLabel
              control={<Checkbox />}
              label="Su cuenta de Instagram está administrada con calidad?"
            />
          </div>
        </Box>
      </Modal>
    </div>
  );
}
