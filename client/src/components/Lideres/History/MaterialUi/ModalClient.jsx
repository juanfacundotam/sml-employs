import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { motion } from "framer-motion";
import { useState } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "rgb(55 65 81)",
  boxShadow: 24,
  p: 4,
  textColor: "white",
  color: "white",
  borderRadius: "20px",
  overflow: "auto",
  maxHeight: "80vh",
};

export default function BasicModal({ modalItems, open, handleClose }) {
  const [empresa, setEmpresa] = useState(false);
  const [corredor, setCorredor] = useState(false);
  const [vendedor, setVendedor] = useState(false);

  const empresaVisible = () => {
    setEmpresa(!empresa);
  };
  const corredorVisible = () => {
    setCorredor(!corredor);
  };
  const vendedorVisible = () => {
    setVendedor(!vendedor);
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
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        BackdropProps={{
          sx: {
            backgroundColor: "rgba(00, 00, 00, 0.3)",
          },
        }}
      >
        <Box sx={style}>
          <div className="flex flex-col gap-2 justify-between h-full">
            <div className="font-semibold flex flex-col gap-3 items-center text-24 mb-5">
              <h1>{modalItems.name}</h1>
            </div>
            <div>
              <motion.div
                className="w-full flex items-center justify-start mb-1"
                onClick={empresaVisible}
              >
                {empresa === false ? (
                  <h2 className="text-24 font-bold">Empresa ⮳</h2>
                ) : (
                  <h2 className="text-24 font-bold">Empresa ⮷</h2>
                )}
              </motion.div>
              <motion.div
                initial={
                  empresa === true
                    ? { opacity: 0, height: 0, overflow: "hidden" }
                    : { opacity: 0.1, height: "auto", overflow: "hidden" }
                }
                animate={
                  empresa === true
                    ? { opacity: 1, height: "auto", overflow: "visible" }
                    : { opacity: 0, height: 0, overflow: "hidden" }
                }
                transition={{ duration: 0.5 }}
              >
                <div className="font-semibold flex gap-3">
                  <p>Web:</p>
                  <a
                    href={modalItems.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {modalItems.url}
                  </a>
                </div>
                <div className="font-semibold flex gap-3">
                  <p>Instagram:</p>
                  <a
                    href={modalItems.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {modalItems.instagram}
                  </a>
                </div>
                <div className="font-semibold flex gap-3">
                  <p>Descripción:</p>
                  <p className="font-normal">{modalItems.description}</p>
                </div>
                <div className="font-semibold flex gap-3">
                  <p>Categoria:</p>
                  <p className="font-normal">{modalItems.category}</p>
                </div>
                <div className="font-semibold flex gap-3">
                  <p>Profesion:</p>
                  <p className="font-normal">{modalItems.profesion}</p>
                </div>
                <div className="font-semibold flex gap-3">
                  <p>Pais:</p>
                  <p className="font-normal">{modalItems.country}</p>
                </div>
                <div className="font-semibold flex gap-3">
                  <p>Provincia:</p>
                  <p className="font-normal">{modalItems.province}</p>
                </div>
                <div className="font-semibold flex gap-3">
                  <p>Ciudad:</p>
                  <p className="font-normal">{modalItems.city}</p>
                </div>
                <div className="font-semibold flex gap-3">
                  <p>Email:</p>
                  <p className="font-normal">{modalItems.email}</p>
                </div>
                <div className="font-semibold flex gap-3">
                  <p>Telefono:</p>
                  <p className="font-normal">{modalItems.telephone}</p>
                </div>
                <div className="font-semibold flex gap-3">
                  <p>Nivel:</p>
                  <p className="font-normal">{modalItems.level}</p>
                </div>
                <div className="font-semibold flex gap-3">
                  <p>Detalle:</p>
                  <p className="font-normal">
                    {modalItems.status_op ? modalItems.status_op : "-"}
                  </p>
                </div>
                <div className="font-semibold flex gap-3">
                  <p>Marca Personal:</p>
                  <p className="font-normal">{modalItems.marca_personal}</p>
                </div>
                <div className="font-semibold flex gap-3">
                  <p>Creado:</p>
                  <p className="font-normal">
                    {funcionHorario(modalItems.createdAt)}
                  </p>
                </div>
                <div className="font-semibold flex gap-3">
                  <p>Estado:</p>
                  <p className="font-normal">{modalItems.status}</p>
                </div>
                {modalItems.status === "Contratado" && (
                  <div>
                    <div className="font-semibold flex gap-3">
                      <p>Monto:</p>
                      <p className="font-normal">
                        A discutir
                        {/* {modalItems.pagos.monto} */}
                      </p>
                    </div>
                    <div className="font-semibold flex gap-3">
                      <p>Cuotas:</p>
                      <p className="font-normal">
                        {" "}
                        A discutir
                        {/* {modalItems.pagos.cuotasPagadas} /{" "}
                      {modalItems.pagos.cuotas}{" "} */}
                      </p>
                    </div>
                    <div className="font-semibold flex gap-3">
                      <p>Valor cuota:</p>
                      <p className="font-normal">
                        {" "}
                        A discutir
                        {/* {modalItems.pagos.valorCuota} */}
                      </p>
                    </div>
                  </div>
                )}
              </motion.div>
            </div>

            <div className="">
              <div
                className="w-full flex items-center justify-start mb-1"
                onClick={corredorVisible}
              >
                {corredor === false ? (
                  <h2 className="text-24 font-bold">Corredor ⮳</h2>
                ) : (
                  <h2 className="text-24 font-bold">Corredor ⮷</h2>
                )}
              </div>
              <motion.div
                initial={
                  corredor === true
                    ? { opacity: 0, height: 0, overflow: "hidden" }
                    : { opacity: 0.1, height: "auto", overflow: "hidden" }
                }
                animate={
                  corredor === true
                    ? { opacity: 1, height: "auto", overflow: "visible" }
                    : { opacity: 0, height: 0, overflow: "hidden" }
                }
                transition={{ duration: 0.5 }}
              >
                <div className="font-semibold flex gap-3">
                  <p>Corredor:</p>
                  <p className="font-normal">{modalItems.corredor_name}</p>
                </div>
                <div className="font-semibold flex gap-3">
                  <p>Corredor Email:</p>
                  <p className="font-normal">{modalItems.corredor}</p>
                </div>
                <div className="font-semibold flex gap-3">
                  <p>Clasificado:</p>
                  <p className="font-normal">
                    {funcionHorario(modalItems.updateCorredor)}
                  </p>
                </div>
              </motion.div>
            </div>
            <div className="">
              <div
                className="w-full flex items-center justify-start mb-1"
                onClick={vendedorVisible}
              >
                {vendedor === false ? (
                  <h2 className="text-24 font-bold">Vendedor ⮳</h2>
                ) : (
                  <h2 className="text-24 font-bold">Vendedor ⮷</h2>
                )}
              </div>
              <motion.div
                initial={
                  vendedor === true
                    ? { opacity: 0, height: 0, overflow: "hidden" }
                    : { opacity: 0.1, height: "auto", overflow: "hidden" }
                }
                animate={
                  vendedor === true
                    ? { opacity: 1, height: "auto", overflow: "visible" }
                    : { opacity: 0, height: 0, overflow: "hidden" }
                }
                transition={{ duration: 0.5 }}
              >
                <div className="font-semibold flex gap-3">
                  <p>Vendedor:</p>
                  <p className="font-normal">{modalItems.vendedor_name}</p>
                </div>
                <div className="font-semibold flex gap-3">
                  <p>Vendedor Email:</p>
                  <p className="font-normal">{modalItems.vendedor}</p>
                </div>
                <div className="font-semibold flex gap-3">
                  <p>Ultimo Cambio:</p>
                  <p className="font-normal">
                    {funcionHorario(modalItems.updateVendedor)}
                  </p>
                </div>
                {modalItems.updateNoResponde && (
                  <div className="font-semibold flex gap-3">
                    <p>No responde:</p>
                    <p className="font-normal">
                      {funcionHorario(modalItems.updateNoResponde)}
                    </p>
                  </div>
                )}
                {modalItems.updateContactado && (
                  <div className="font-semibold flex gap-3">
                    <p>Contactado:</p>
                    <p className="font-normal">
                      {funcionHorario(modalItems.updateContactado)}
                    </p>
                  </div>
                )}
                {modalItems.updateEnProceso && (
                  <div className="font-semibold flex gap-3">
                    <p>En proceso:</p>
                    <p className="font-normal">
                      {funcionHorario(modalItems.updateEnProceso)}
                    </p>
                  </div>
                )}
                {modalItems.updateAPagar && (
                  <div className="font-semibold flex gap-3">
                    <p>A pagar:</p>
                    <p className="font-normal">
                      {funcionHorario(modalItems.updateAPagar)}
                    </p>
                  </div>
                )}
                {modalItems.updateIncidencia && (
                  <div className="font-semibold flex gap-3">
                    <p>Incidencia:</p>
                    <p className="font-normal">
                      {funcionHorario(modalItems.updateIncidencia)}
                    </p>
                  </div>
                )}
                {modalItems.updateContratado && (
                  <div className="font-semibold flex gap-3">
                    <p>Contratado:</p>
                    <p className="font-normal">
                      {funcionHorario(modalItems.updateContratado)}
                    </p>
                  </div>
                )}
                {modalItems.updateRechazado && (
                  <div className="font-semibold flex gap-3">
                    <p>Rechazado:</p>
                    <p className="font-normal">
                      {funcionHorario(modalItems.updateRechazado)}
                    </p>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
