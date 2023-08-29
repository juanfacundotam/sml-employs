import * as React from "react";
import axios from "axios";
import { useEffect } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { FaHistory, FaWhatsapp } from "react-icons/fa";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  height: 650,
  bgcolor: "#39394B",
  border: "none",
  boxShadow: 24,
  pt: 4,
  px: 6,
  pb: 4,
};

export default function ModalIntelligentInfo({ item }) {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const formattedUpdate = () => {
    let fechaYear = "";
    let fechaMonth = "";
    let fechaDay = "";
    let timeHour = "";
    let timeMinute = "";
    for (let i = 0; i < item.updatedAt.length; i++) {
      if (i < 4) {
        fechaYear += item.updatedAt[i];
      } else if (i >= 5 && i < 7) {
        fechaMonth += item.updatedAt[i];
      } else if (i >= 8 && i < 10) {
        fechaDay += item.updatedAt[i];
      } else if (i >= 11 && i < 13) {
        timeHour += item.updatedAt[i];
      }
      if (i >= 13 && i < 19) {
        timeMinute += item.updatedAt[i];
      }
    }

    return (
      <p htmlFor="" className="text-white m-2">
        {`Date: ${fechaDay}/${fechaMonth}/${fechaYear} - Hour: ${
          timeHour - 3
        }${timeMinute}`}
      </p>
    );
  };

  const funcionHorario = (horario) => {
    const fechaHoraISO = horario;

    const fechaHora = new Date(fechaHoraISO);

    const opciones = { hour12: false };

    const fechaHoraLocal = fechaHora.toLocaleString(undefined, opciones);

    return fechaHoraLocal;
  };

  return (
    <div>
      <div className="flex gap-4">
        <div className="relative h-fit w-fit group flex justify-center items-center">
          <p className="z-10 w-fit  whitespace-nowrap hidden absolute text-[#9c9b9b] -top-6 group-hover:block">
            Observaciones
          </p>
          <FaHistory
            className="text-[32px] text-[#a09e9e]  cursor-pointer"
            onClick={handleOpen}
          />
        </div>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 580, borderRadius: 5 }}>
          <div className="flex flex-col items-center justify-center gap-y-3 text-white">
            <h1 className="text-24 text-[#e4e1e1]">Historial Observaciones</h1>
            <p>{item.name}</p>
            <div className="flex flex-col  justify-start items-center h-[400px] w-[500px] my-3 overflow-scroll text-white">
              {item.observaciones_ventas &&
              item.observaciones_ventas.length > 0 &&
              item.observaciones_ventas[0].status ? (
                item.observaciones_ventas
                  .map((item, index) => (
                    <div
                      key={index}
                      className=" flex flex-col  justify-center items-center w-[500px] text-white p-2"
                    >
                      <div className="border-2 w-full mb-2"></div>
                      <div className="flex justify-start items-start h-fit w-full gap-x-3">
                        <div className="whitespace-nowrap flex justify-start items-start h-fit w-56 gap-x-2">
                          <h1>Status: </h1>
                          <h1>{item.status && item.status}</h1>
                        </div>
                        <div className=" flex justify-end items-start h-fit w-full gap-x-2">
                          <h1>Fechas: </h1>
                          <h1>{item.fecha && funcionHorario(item.fecha)}</h1>
                        </div>
                      </div>

                      <div className=" flex flex-col justify-start items-start h-fit w-full gap-x-3">
                        {item.status === "Rechazado" && (
                          <div className=" flex justify-start items-start h-fit w-56 gap-x-2">
                            <h1>Motivo: </h1>
                            <h1>{item.status_op && item.status_op}</h1>
                          </div>
                        )}
                        {item.status === "Contratado" && (
                          <div className=" flex justify-start items-start h-fit w-56 gap-x-2">
                            <h1>Pago: </h1>
                            <h1>{item.status_op && item.status_op}</h1>
                          </div>
                        )}
                        {item.status === "No responde" && (
                          <div className=" flex justify-start items-start h-fit w-56 gap-x-2 text-white">
                            <h1>Llamados: </h1>
                            <h1>{item.status_op && item.status_op}</h1>
                          </div>
                        )}
                        {  item.status !== "Contratado" && (
                        <div className="flex justify-start items-start h-fit w-56 gap-x-2">
                          <h1>Contacto: </h1>
                          <h1>{item.tipoContacto && item.tipoContacto}</h1>
                        </div>)}
                      </div>
                      {  item.status !== "Contratado" && (
                      <div className="flex justify-start items-start h-fit w-full gap-x-2">
                        <h1>Observación: </h1>
                        <h1>{item.observacion && item.observacion}</h1>
                        </div>)}
                    </div>
                  ))
                  .reverse()
              ) : (
                <div className=" flex flex-col  justify-center items-center h-[400px] w-[500px] my-3 overflow-scroll text-white">
                  <h1>No hay observaciones disponibles</h1>
                </div>
              )}
            </div>

            <button
              type="button"
              className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              onClick={handleClose}
            >
              Cerrar x
            </button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
