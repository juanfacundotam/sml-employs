import { Box, Button, Modal } from "@mui/material";
import { useEffect, useState } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  borderRadius: "30px",
  boxShadow: 24,
  textAlign: "center",
  color: "white",
  pt: 2,
  px: 4,
  pb: 3,
};

export default function DownloadCSV() {
  const [open, setOpen] = useState(false);
  const [nivel, setNivel] = useState({
    a: false,
    b: false,
    c: false,
    d: false,
  });

  useEffect(() => {}, [nivel]);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const changeNivel = (change) => {
    setNivel({ ...nivel, [change]: !nivel[change] });
  };

  const download = () => {
    const niveles = [];
    if (nivel.a === true) {
      niveles.push("0");
    }
    if (nivel.b === true) {
      niveles.push("1");
    }
    if (nivel.c === true) {
      niveles.push("2");
    }
    if (nivel.d === true) {
      niveles.push("incidencia");
    }
    const nivelesQuery = niveles.map((nivel) => `nivel[]=${nivel}`).join("&");
  };

  return (
    <div>
      <Button variant="contained" onClick={handleOpen}>
        Descargar CSV
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box
          sx={{
            ...style,
            width: "30%",
            height: "50%",
            bgcolor: "#39394b",
          }}
        >
          <div className="flex flex-col justify-between h-full">
            <div className="flex flex-col gap-5 my-5">
              <h2 id="parent-modal-title">Descargar archivo CSV</h2>
            </div>
            <div className="flex  items-center justify-center gap-5">
              <h2>Nivel</h2>
              <Button
                variant="outlined"
                id="a"
                onClick={(event) => changeNivel(event.target.id)}
                sx={
                  nivel.a === true
                    ? { color: "black", bgcolor: "white", borderColor: "black" }
                    : { color: "white" }
                }
              >
                0
              </Button>
              <Button
                variant="outlined"
                id="b"
                onClick={(event) => changeNivel(event.target.id)}
                sx={
                  nivel.b === true
                    ? { color: "black", bgcolor: "white", borderColor: "black" }
                    : { color: "white" }
                }
              >
                1
              </Button>
              <Button
                variant="outlined"
                id="c"
                onClick={(event) => changeNivel(event.target.id)}
                sx={
                  nivel.c === true
                    ? { color: "black", bgcolor: "white", borderColor: "black" }
                    : { color: "white" }
                }
              >
                2
              </Button>
              <Button
                variant="outlined"
                id="d"
                onClick={(event) => changeNivel(event.target.id)}
                sx={
                  nivel.d === true
                    ? { color: "black", bgcolor: "white", borderColor: "black" }
                    : { color: "white" }
                }
              >
                ⚠
              </Button>
            </div>
            <Button variant="contained" onClick={download}>
              Descargar CSV
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
