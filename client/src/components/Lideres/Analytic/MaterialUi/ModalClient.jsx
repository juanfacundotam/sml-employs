import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "40%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "rgb(55 65 81)",
  boxShadow: 24,
  p: 4,
  textColor: "white",
  color: "white",
  height: 700,
  borderRadius: "20px",
};

export default function BasicModal(props) {
  const {
    name,
    category,
    level,
    email,
    instagram,
    telephone,
    status,
    city,
    province,
    corredor,
    vendedor,
    op,
    web,
  } = props;
  return (
    <div>
      <Modal
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        BackdropProps={{
          sx: {
            backgroundColor: "rgba(00, 00, 00, 0.3)",
          },
        }}
      >
        <Box sx={style}>
          <div className="flex flex-col justify-between h-full">
            <div className="font-semibold flex flex-col gap-3 items-center text-24 mb-5">
              <h1>{name} </h1>
              <hr className=" border-gray-400 w-5/6 text-center" />
            </div>
            <div className="font-semibold flex gap-3">
              <p>CATEGORIA: </p>
              <p className="font-normal">{category} </p>
            </div>
            <div className="font-semibold flex gap-3">
              <p>CIUDAD: </p>
              <p className="font-normal">
                {province}, {city}{" "}
              </p>
            </div>
            <div className="font-semibold flex gap-3">
              <p>NIVEL: </p>
              <p className="font-normal">{level} </p>
            </div>
            <div className="font-semibold flex gap-3">
              <p>WEB: </p>
              <a href={web} target="_blank" rel="noopener noreferrer">
                Ingrese a la web aqui!
              </a>
            </div>
            <div className="font-semibold flex gap-3">
              <p>EMAIL: </p>
              <p className="font-normal">{email} </p>
            </div>
            <div className="font-semibold flex gap-3">
              <p>INSTAGRAM: </p>
              <a href={instagram} target="_blank" rel="noopener noreferrer">
                {instagram}
              </a>
            </div>
            <div className="font-semibold flex gap-3">
              <p>TELEFONO: </p>
              <p className="font-normal">{telephone} </p>
            </div>
            <div className="font-semibold flex gap-3">
              <p>CORREDOR: </p>
              <p className="font-normal">{corredor}</p>
            </div>
            <div className="font-semibold flex gap-3">
              <p>VENDEDOR: </p>
              <p className="font-normal">{vendedor}</p>
            </div>
            <div className="font-semibold flex gap-3">
              <p>ESTADO: </p>
              <p className="font-normal">{status} </p>
            </div>
            <div className="font-semibold flex gap-3">
              <p>DETALLE: </p>
              <p className="font-normal">{op ? op : "-"} </p>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
