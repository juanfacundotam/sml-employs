// Importar las dependencias necesarias desde React y Material-UI
import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { Checkbox, FormControlLabel } from "@mui/material";

// Estilos del modal
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

// Definir el componente funcional BasicModal
export default function BasicModal() {
  // Estados para controlar el estado del modal y los checkboxes
  const [open, setOpen] = React.useState(false);
  const [seguidores2000, setSeguidores2000] = React.useState(false);

  // Funciones para abrir y cerrar el modal
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Función para cambiar el estado del checkbox de seguidores2000
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
        <Box sx={style}>
          {/* Contenido del modal */}
          <div>
            {/* Checkbox para indicar si tiene más de 2000 seguidores */}
            <FormControlLabel
              onClick={currentClient}
              control={<Checkbox />}
              label="Tiene mas de 2000 seguidores?"
            />
            {/* Checkbox para indicar si tiene repercusión en sus Reels-Publicaciones */}
            <FormControlLabel
              control={<Checkbox />}
              label="Tiene Repercusion en sus Reels-Publicaciones?"
            />
            {/* Checkbox para indicar si sube contenido con frecuencia */}
            <FormControlLabel
              control={<Checkbox />}
              label="Sube contenido con frecuencia?"
            />
            {/* Checkbox para indicar si el contenido tiende a la marca personal */}
            <FormControlLabel
              control={<Checkbox />}
              label="Su contenido tiende a la marca personal?"
            />
            {/* Checkbox para indicar si sube contenido de valor */}
            <FormControlLabel
              control={<Checkbox />}
              label="Sube Contenido de valor?"
            />
            {/* Checkbox para indicar si la cuenta de Instagram está administrada con calidad */}
            <FormControlLabel
              control={<Checkbox />}
              label="Su  cuenta de instagram esta administrada con caliad?"
            />
          </div>
        </Box>
      </Modal>
    </div>
  );
}
