// Importar las dependencias necesarias desde React y Material-UI
import React, { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import axios from "axios";
import InputIncidencia from "./InputIncidencia";
import { BsFillEnvelopePaperFill } from "react-icons/bs";
import { getLeadCorredores } from "../../../../redux/actions";
import { useDispatch } from "react-redux";

// Estilos del modal
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

// Componente ChildModal que muestra un modal dentro de otro modal
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
  const dispatch = useDispatch();

  // Estado para controlar la apertura y cierre del modal interno
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  // Función para guardar la incidencia en la base de datos
  const handleIncidencia = async () => {
    try {
      const response = await axios.put(`/lead/${item._id}`, {
        status_op: inputIncidencia,
      });
    } catch (error) {}

    // Actualizar la lista de corredores después de guardar la incidencia
    dispatch(
      getLeadCorredores(
        email,
        username,
        profesion,
        category,
        country,
        marca_personal
      )
    );

    setOpen(false);
    handleCloseChild();
    handleReset();
  };

  return (
    <div>
      {/* Botones para cerrar el modal interno o guardar la incidencia */}
      <div className="flex gap-2 justify-center items-center mt-5">
        <Button variant="outlined" onClick={handleCloseChild}>
          Cerrar
        </Button>
        <Button variant="contained" onClick={handleOpen}>
          Siguiente
        </Button>
      </div>
      {/* Modal interno para mostrar la descripción de la incidencia */}
      <Modal
        open={open}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: "20%", backgroundColor: "#39394b" }}>
          <div className="flex flex-col gap-5 p-2">
            <h2 id="child-modal-title">Descripcion de incidencia</h2>
            <div className="flex flex-col gap-2 justify-start items-start">
              <div className="flex gap-2">
                <h2 id="child-modal-description">Incidencia: </h2>
                <p id="child-modal-description">{inputIncidencia}</p>
              </div>
            </div>
            <p id="child-modal-description">
              Estas seguro que quieres enviar esta incidencia?
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

// Componente NestedModal que muestra un modal con otro modal dentro
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

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  // Estado para almacenar la descripción de la incidencia
  const [inputIncidencia, setInputIncidencia] = useState(item.status_op);

  // Función para resetear el valor de la descripción de incidencia
  const handleReset = () => {
    setInputIncidencia("");
  };

  return (
    <div>
      {/* Botón para abrir el modal */}
      <Button onClick={handleOpen}>
        {item.status_op === "" ? (
          <BsFillEnvelopePaperFill className="text-[1.6rem] text-[#a89e3c] hover:text-[#3570bd]" />
        ) : (
          <BsFillEnvelopePaperFill className="text-[1.6rem] text-[#4da342] hover:text-[#3570bd]" />
        )}
      </Button>
      {/* Modal principal */}
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
              {/* Componente InputIncidencia para ingresar la descripción */}
              <InputIncidencia
                inputIncidencia={inputIncidencia}
                setInputIncidencia={setInputIncidencia}
              />
            </div>
          </div>
          {/* Componente ChildModal para mostrar el modal interno */}
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
