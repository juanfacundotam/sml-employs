import * as React from "react";
import axios from "axios";
import { useEffect } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { CiWarning, CiEdit } from "react-icons/ci";
import { useUser } from "@clerk/clerk-react";
import { orderCategory } from "../../../../redux/actions";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { CgFileAdd } from "react-icons/cg";
import { BsCheck } from "react-icons/bs";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  height: 500,
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

  return (
    <div>
      <div className="flex gap-4">
      <div className="relative h-fit w-fit group flex justify-center items-center">
                    <p className="z-10 w-fit  whitespace-nowrap hidden absolute text-[#9c9b9b] -top-6 group-hover:block">
                      Lead Info AI
                    </p>
      <AiOutlineInfoCircle className="text-[33px] text-[#b3bebd] cursor-pointer" onClick={handleOpen}/>
      </div>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 580, borderRadius: 5 }}>
          <div className="flex flex-col items-center justify-center gap-y-7">
            <h1 className="text-24 text-[#e4e1e1]">Información Cliente</h1>
            <div className="mb-10 gap-y-3">
              {item && item.seguidores2000 ? (
                <div className="flex justify-start items-center">
                  <p>Seguidores +2000: </p>{" "}
                  <BsCheck className="flex justify-center items-center text-green-500 text-[35px] font-extrabold" />
                </div>
              ) : (
                <p>Seguidores +2000: ❌</p>
              )}
              {item && item.repercusion ? (
                <div className="flex justify-start items-center">
                  <p>Repercusión: </p>{" "}
                  <BsCheck className="flex justify-center items-center text-green-500 text-[35px] font-extrabold" />
                </div>
              ) : (
                <p>Repercusión: ❌</p>
              )}
              {item && item.contenidoPersonal ? (
                <div className="flex justify-start items-center">
                  <p>Contenido Personal: </p>{" "}
                  <BsCheck className="flex justify-center items-center text-green-500 text-[35px] font-extrabold" />
                </div>
              ) : (
                <p>Contenido Personal: ❌</p>
              )}
              {item && item.contenidoValor ? (
                <div className="flex justify-start items-center">
                  <p>Contenido de Valor: </p>{" "}
                  <BsCheck className="flex justify-center items-center text-green-500 text-[35px] font-extrabold" />
                </div>
              ) : (
                <p>Contenido de Valor: ❌</p>
              )}
              {item && item.calidadInstagram ? (
                <div className="flex justify-start items-center">
                  <p>Calidad Instagram: </p>{" "}
                  <BsCheck className="flex justify-center items-center text-green-500 text-[35px] font-extrabold" />
                </div>
              ) : (
                <p>Calidad Instagram: ❌</p>
              )}
              {item && item.frecuencia ? (
                <div className="flex justify-start items-center">
                  <p>Frecuencia: </p>{" "}
                  <BsCheck className="flex justify-center items-center text-green-500 text-[35px] font-extrabold" />
                </div>
              ) : (
                <p>Frecuencia: ❌</p>
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
