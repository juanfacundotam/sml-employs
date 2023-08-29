// Importaciones necesarias
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import axios from "axios";
import InputIncidencia from "./InputIncidencia";
import { BsFillEnvelopePaperFill } from "react-icons/bs";
import { getLeadClasificacion } from "../../../../../redux/actions";
import { useDispatch } from "react-redux";

// Estilos para el modal
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

// Componente ChildModal
function ChildModal({
  inputIncidencia,
  handleReset,
  handleCloseChild,
  item,
  email,
  username,
  profesion,
  category,
  country,
  marca_personal,
}) {
  // Utilizamos el hook useDispatch para obtener el método dispatch
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  // Funciones para abrir y cerrar el modal
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  // Función para manejar el envío de la incidencia
  const handleIncidencia = async () => {
    try {
      // Hacemos una solicitud al servidor para actualizar el estado de la incidencia
      const response = await axios.put(`/lead/${item._id}`, {
        status_op: inputIncidencia,
      });
    } catch (error) {}

    // Despachamos la acción para obtener la clasificación de los leads
    dispatch(
      getLeadClasificacion(
        email,
        username,
        profesion,
        category,
        country,
        marca_personal
      )
    );

    // Cerramos el modal hijo y el modal padre, y reseteamos el input de la incidencia
    setOpen(false);
    handleCloseChild();
    handleReset();
  };

  return (
    <div>
      {/* Botones para Cerrar y Siguiente */}
      <div className="flex gap-2 justify-center items-center mt-5">
        <Button variant="outlined" onClick={handleCloseChild}>
          Cerrar
        </Button>
        <Button variant="contained" onClick={handleOpen}>
          Siguiente
        </Button>
      </div>
      {/* Modal Hijo */}
      <Modal
        open={open}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: "20%", backgroundColor: "#39394b" }}>
          <div className="flex flex-col gap-5 p-2">
            <h2 id="child-modal-title">Descripción de la incidencia</h2>
            <div className="flex flex-col gap-2 justify-start items-start">
              <div className="flex gap-2">
                <h2 id="child-modal-description">Incidencia: </h2>
                <p id="child-modal-description">{inputIncidencia}</p>
              </div>
            </div>
            <p id="child-modal-description">
              ¿Estás seguro de que quieres enviar esta incidencia?
            </p>
            <div className="flex justify-center gap-2 items-center">
              <Button variant="outlined" onClick={handleClose}>
                Cerrar
              </Button>
              <Button variant="contained" onClick={handleIncidencia}>
                Guardar incidencia
              </Button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

// Componente principal NestedModal
export default function NestedModal({
  item,
  email,
  username,
  profesion,
  category,
  country,
  marca_personal,
}) {
  const [open, setOpen] = useState(false);

  // Funciones para abrir y cerrar el modal
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [inputIncidencia, setInputIncidencia] = useState("");

  // Función para resetear el input de la incidencia
  const handleReset = () => {
    setInputIncidencia("");
  };

  return (
    <div>
      {/* Botón con ícono de sobre */}
      <Button onClick={handleOpen}>
        {item.status_op === "" ? (
          <BsFillEnvelopePaperFill className="text-[1.6rem] text-[#a89e3c] hover:text-[#3570bd]" />
        ) : (
          <BsFillEnvelopePaperFill className="text-[1.6rem] text-[#4da342] hover:text-[#3570bd]" />
        )}
      </Button>
      {/* Modal Padre */}
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
          <div>
            <div className="flex flex-col gap-5 my-5">
              <h2 id="parent-modal-title">Nueva incidencia</h2>
            </div>
            <div className="flex flex-col items-center justify-center gap-5">
              {/* Componente InputIncidencia */}
              <InputIncidencia
                inputIncidencia={inputIncidencia}
                setInputIncidencia={setInputIncidencia}
              />
            </div>
          </div>
          {/* Componente ChildModal */}
          <ChildModal
            item={item}
            inputIncidencia={inputIncidencia}
            handleReset={handleReset}
            handleCloseChild={handleClose}
            email={email}
            username={username}
            profesion={profesion}
            category={category}
            country={country}
            marca_personal={marca_personal}
          />
        </Box>
      </Modal>
    </div>
  );
}
