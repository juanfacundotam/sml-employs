import * as React from "react";
import axios from "axios";
import { useEffect } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { CiEdit } from "react-icons/ci";
import { MdPriceCheck } from "react-icons/md";
import { useUser } from "@clerk/clerk-react";
import ResponsiveDateTimePickers from "./ResponsiveDateTimePickers";
import { ToastContainer, toast } from "react-toastify";
import { CiWarning, CiInstagram, CiMail, CiGlobe } from "react-icons/ci";
import { motion, spring } from "framer-motion";
import {
  AiOutlineConsoleSql,
  AiOutlinePhone,
  AiOutlineUserAdd,
  AiOutlineEuroCircle,
} from "react-icons/ai";
import "react-toastify/dist/ReactToastify.css";
import { BsCurrencyEuro } from "react-icons/bs";
import { BsCheck } from "react-icons/bs";

const style = {
  position: "absolute",
  top: "45%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#39394B",
  border: "none",
  boxShadow: 24,
  pt: 4,
  px: 6,
  pb: 4,
};

//************************************************************************************************ */
function ChildModalHistory({
  item,
  setOpen,
  statusObj,
  SendLeadAlertBaja,
  SendErrorUpdateAlertBaja,
  updateLeads,
  llamadoVenta,
  handleLlamadoVentaChange,
  emailAddress,
  fullName,
  cancelModal,
  setStatusObj,
}) {
  const [openChild, setOpenChild] = React.useState(false);

  const handleOpen = () => {
    if (statusObj.status === "Contratado") {
      let valorCuota = statusObj.pagos.monto / statusObj.pagos.cuotas;

      setStatusObj({
        ...statusObj,
        pagos: {
          ...statusObj.pagos,
          monto: Number(statusObj.pagos.monto),
          valorCuota: valorCuota,
          cuotas: Number(statusObj.pagos.cuotas),
          cuotasPagadas: 1,
        },
        status_op: statusObj.pagos.monto,
      });
    } else {
      statusObj.pagos = {};
    }

    setOpenChild(true);
    handleLlamadoVentaChange();
  };

  const handleClose = () => {
    setOpenChild(false);
  };

  const handleUpdate = async () => {
    try {
      const body = { deleted: true };
      const response = await axios.put(`/lead/changeemail/${item._id}`, body);
      SendLeadAlertBaja();
    } catch (error) {
      SendErrorUpdateAlertBaja();
    }
    setOpenChild(false);
    setOpen(false);
  };

  const handleCancel = () => {
    cancelModal();
    setOpen(false);
    statusObj.status = "";
  };
  return (
    <React.Fragment>
      <div className="flex justify-around items-center relative">
        {/* <button
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-[#161616] dark:hover:bg-[#1f1f1f] focus:outline-none dark:focus:ring-blue-800"
          onClick={handleOpen}
        >
          Solicitar Baja
        </button> */}
        <button
          type="button"
          className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          onClick={handleCancel}
        >
          Cerrar x
        </button>
      </div>
      <Modal
        open={openChild}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box
          sx={{
            ...style,
            width: 400,
            borderRadius: 5,
            backgroundColor: "#39394B",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignContent: "center",
          }}
        >
          <h2 id="child-modal-title" className="text-white text-center mb-5 ">
            Quiéres dar de baja al cliente?
          </h2>
          <div className="flex justify-around items-center m-5">
            <button
              type="button"
              className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              onClick={handleClose}
            >
              No
            </button>
            <button
              type="button"
              className="text-[#bbbaba] bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              onClick={handleUpdate}
            >
              Si
            </button>
          </div>
        </Box>
      </Modal>
    </React.Fragment>
  );
}

//************************************************************************************************ */
function IncidenceModal({
  setOpen,
  SendIncidenceAlert,
  statusObj,
  item,
  emailAddress,
  fullName,
  updateLeads,
}) {
  const [openIncidenceChild, setOpenIncidenceChild] = React.useState(false);
  const [observationIncidence, setObservationIncidence] = React.useState("");

  const handleChangeObservation = (event) => {
    const value = event.target.value;
    setObservationIncidence(value);
  };

  const handleClose = () => {
    setOpenIncidenceChild(false);
  };
  const confirmSendIncidence = () => {
    statusObj.level = "incidencia";

    const dataVendedor = {
      _id: item._id,
      name: item.name,
      email: item.email,
      status: statusObj.status,
      status_op: observationIncidence,
      llamada_venta: statusObj.llamada_venta,
      province: item.province,
      category: item.category,
      telephone: item.telephone,
      url: item.url,
      instagram: item.instagram,
      level: statusObj.level,
    };

    const dataLead = {
      status: statusObj.status,
      level: statusObj.level,
      status_op: observationIncidence,
      vendedor: emailAddress,
      vendedor_name: fullName,
      llamados: item.llamados,
      llamada_venta: statusObj.llamada_venta,
    };

    const dataUpdate = {
      dataLead,
      dataVendedor,
    };

    axios
      .put(`/lead/vendedor/${item._id}`, dataUpdate)
      .then((response) => {
        SendIncidenceAlert();
      })
      .catch((error) => {});

    setOpen(false);
  };

  const sendIncidence = () => {
    setOpenIncidenceChild(true);
  };
  return (
    <React.Fragment>
      <div className="flex justify-around items-center">
        <CiWarning
          className="text-[#ffffff] p-0 text-[35px] font-bold cursor-pointer"
          onClick={sendIncidence}
        />
      </div>
      <Modal
        open={openIncidenceChild}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box
          sx={{
            ...style,
            width: 500,
            borderRadius: "15px",
            backgroundColor: "#39394B",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignContent: "center",
          }}
        >
          <h2 id="child-modal-title" className="text-white text-center mb-5">
            Enviar Incidencia?
          </h2>
          <textarea
            name="observation"
            value={observationIncidence}
            id=""
            cols="30"
            rows="5"
            placeholder="Observation"
            onChange={handleChangeObservation}
            className="bbg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          ></textarea>
          <div className="flex justify-around items-center m-5">
            <button
              type="button"
              className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              onClick={handleClose}
            >
              No
            </button>
            <button
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              onClick={confirmSendIncidence}
            >
              Si
            </button>
          </div>
        </Box>
      </Modal>
    </React.Fragment>
  );
}

//************************************************************************************************ */
function ConfirmacionEdicion({ handleConfirmEdit, id, emailValidator }) {
  const [openConfirmacionEdicion, setConfirmacionEdicion] =
    React.useState(false);

  const handleClose = () => {
    setConfirmacionEdicion(false);
  };

  const handleOpen = () => {
    setConfirmacionEdicion(true);
  };

  const handleCancel = () => {
    setConfirmacionEdicion(false);
    statusObj.status = "";
  };
  const handleUpdate = () => {
    handleConfirmEdit(id);
    setConfirmacionEdicion(false);
  };
  return (
    <React.Fragment>
      <div className="flex justify-around items-center relative">
        {emailValidator ? (
          <BsCheck
            onClick={handleOpen}
            className="flex justify-center items-center border-2 text-1 w-12 h-10 cursor-pointer text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg  hover:bg-gray-100 hover:text-[#5cf73d] focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-[#5cf73d] dark:hover:bg-gray-700 "
          />
        ) : (
          <>
            <BsCheck className="flex justify-center items-center border-2 text-1 w-12 h-10 cursor-pointer text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg  hover:bg-gray-100 hover:text-[#f73d3d] focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-[#f73d3d] dark:hover:bg-gray-700 " />
            <p className="absolute whitespace-nowrap text-red-600 -left-64 -bottom-7">
              email invalido
            </p>
          </>
        )}
      </div>
      <Modal
        open={openConfirmacionEdicion}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box
          sx={{
            ...style,
            width: 500,
            borderRadius: 5,
            backgroundColor: "#39394B",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignContent: "center",
          }}
        >
          <h2 id="child-modal-title" className="text-white text-center">
            Quiéres Confirmar la edición?
          </h2>
          <div className="flex justify-around items-center m-5 mt-10">
            <button
              type="button"
              className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              onClick={handleClose}
            >
              No
            </button>
            <button
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              onClick={handleUpdate}
            >
              Si
            </button>
          </div>
        </Box>
      </Modal>
    </React.Fragment>
  );
}
//************************************************************************************************ */

export default function NestedModal({
  item,
  SendLeadAlertBaja,
  SendIncidenceAlert,
  SendErrorUpdateAlertBaja,
  updateLeads,
  emailAddress,
  fullName,
  cancelModal,
}) {
  const [open, setOpen] = React.useState(false);
  const [dateHour, setDateHour] = React.useState({});
  const [openTimeHour, setOpenTimeHour] = React.useState(false);
  const [openPagoSelect, setOpenPagoSelect] = React.useState(false);
  const [openAlert, setOpenAlert] = React.useState(false);
  const [openAlertError, setOpenAlertError] = React.useState(false);
  const [showCopiedMessage, setShowCopiedMessage] = React.useState(false);

  const [editEmail, setEditEmail] = React.useState(false);
  const [inputEmail, setInputEmail] = React.useState(item.email);
  const [updatedEmail, setUpdatedEmail] = React.useState(item.email);

  const [editInstagram, setEditInstagram] = React.useState(false);
  const [inputInstagram, setInputInstagram] = React.useState(item.instagram);
  const [updatedInstagram, setUpdatedInstagram] = React.useState(
    item.instagram
  );

  const [editTelephone, setEditTelephone] = React.useState(false);
  const [inputTelephone, setInputTelephone] = React.useState(item.telephone);
  const [updatedTelephone, setUpdatedTelephone] = React.useState(
    item.telephone
  );

  const [editEmailApp, setEditEmailApp] = React.useState(false);
  const [inputEmailApp, setInputEmailApp] = React.useState(item.emailApp);
  const [updatedEmailApp, setUpdatedEmailApp] = React.useState(item.emailApp);

  const [editContacto, setEditContacto] = React.useState(false);
  const [inputContacto, setInputContacto] = React.useState(item.contacto);
  const [updatedContacto, setUpdatedContacto] = React.useState(item.contacto);

  const [editPago, setEditPago] = React.useState(false);
  const [inputPago, setInputPago] = React.useState(item.linkPago);
  const [updatedPago, setUpdatedPago] = React.useState(item.linkPago);

  const [emailValidator, setEmailValidator] = React.useState(false);

  const [statusObj, setStatusObj] = React.useState({
    status: item.status,
    emailApp: "",
    pagos: {},
    status_op: item.status_op,
    llamados: item.llamados,
    llamada_venta: {},
  });

  const [llamadoVenta, setLlamadoVenta] = React.useState({
    contacto: "",
    observaciones: "",
    dia: dateHour.$D,
    mes: dateHour.$M + 1,
    year: dateHour.$y,
    hora: dateHour.$D,
    minutos: dateHour.$m,
    diaHora: "",
  });

  useEffect(() => {
    setStatusObj({
      ...statusObj,
      status: item.status,
    });
  }, [setStatusObj]);
  useEffect(() => {
    setUpdatedEmail(inputEmail);
  }, [updatedEmail]);

  const handleCopyClick = (copyToProps) => {
    navigator.clipboard
      .writeText(copyToProps)
      .then(() => {
        setShowCopiedMessage(true);
        setTimeout(() => setShowCopiedMessage(false), 2000);
      })
      .catch((err) => alert(`Error al copiar: ${err}`));
  };

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    cancelModal();
    setOpen(false);
    statusObj.status = "";
  };

  const handleSelectChange = (event) => {
    setOpenTimeHour(false);
    //CHEQUEAR ESTOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO
    statusObj.pagos = {};
    const value = event.target.value;
    const property = event.target.name;
    if (value === "No responde" || value === "Sin contactar") {
      setStatusObj({
        ...statusObj,
        [property]: value,
        status_op: "",
      });
    } else if (value === "Agenda llamada") {
      setStatusObj({
        ...statusObj,
        [property]: value,
        status_op: "",
      });
    } else {
      setStatusObj({ ...statusObj, [property]: value });
    }
  };

  const handleSelectChangeContratado = (event) => {
    setOpenTimeHour(false);
    const value = event.target.value;
    const property = event.target.name;
    setStatusObj({
      ...statusObj,
      pagos: {
        ...statusObj.pagos,
        [property]: value,
      },
    });
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

  const setDateTime = () => {
    setOpenTimeHour(!openTimeHour);
  };

  const handleLlamadoVentaChange = (event) => {
    if (event) {
      const value = event.target.value;
      const property = event.target.name;
      setLlamadoVenta({
        ...llamadoVenta,
        [property]: value,
        diaHora: `Dia: ${dateHour.$D}/${dateHour.$M + 1}/${dateHour.$y} Hora: ${
          dateHour.$H && String(dateHour.$H).length === 1
            ? `0${dateHour.$H}`
            : dateHour.$H
        }:${
          dateHour.$m && String(dateHour.$m).length === 1
            ? `0${dateHour.$m}`
            : dateHour.$m
        }`,
        dia: dateHour.$D,
        mes: dateHour.$M + 1,
        year: dateHour.$y,
        hora: dateHour.$D,
        minutos: dateHour.$m,
      });
    } else {
      setLlamadoVenta({
        ...llamadoVenta,
        diaHora: `Dia: ${dateHour.$D}/${dateHour.$M + 1}/${dateHour.$y} Hora: ${
          dateHour.$H && String(dateHour.$H).length === 1
            ? `0${dateHour.$H}`
            : dateHour.$H
        }:${
          dateHour.$m && String(dateHour.$m).length === 1
            ? `0${dateHour.$m}`
            : dateHour.$m
        }`,
        dia: dateHour.$D,
        mes: dateHour.$M + 1,
        year: dateHour.$y,
        hora: dateHour.$D,
        minutos: dateHour.$m,
      });
    }
  };

  const SendEmailLeadAlert = (texto) => {
    setOpenAlert(true);
    setTimeout(() => {
      setOpenAlert(false);
    }, 3000);
  };
  const SendEmailLeadAlertError = (texto) => {
    setOpenAlertError(true);
    setTimeout(() => {
      setOpenAlertError(false);
    }, 3000);
  };

  // Email Validator FUNCTION
  const validatorEmailFunction = (email) => {
    setEmailValidator(false);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(email)) {
      setEmailValidator(true);
    } else {
      setEmailValidator(false);
    }
  };

  const validatorEmailAppFunction = (email) => {
    setEmailValidator(false);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(email)) {
      setEmailValidator(true);
    } else {
      setEmailValidator(false);
    }
  };

  //EDITAR DATOS EMAIL
  const handleEditEmail = () => {
    setEmailValidator(true);
    setEditEmail(!editEmail);
    setEditPago(false);
    setEditEmailApp(false);
    setEditInstagram(false);
    setEditTelephone(false);
    setEditContacto(false);
  };
  const handleChangeEmail = (event) => {
    const emailChecked = event.target.value.trim();
    setInputEmail(emailChecked);
    validatorEmailFunction(emailChecked);
  };
  const handleConfirmEditEmail = async (id) => {
    try {
      const body = { email: inputEmail };
      const response = await axios.put(`/lead/changeemail/${id}`, body);
      setUpdatedEmail(response.data.email);
      SendEmailLeadAlert("Email");
    } catch (error) {
      SendEmailLeadAlertError("Email");
    }
    setEditEmail(false);
  };

  //EDITAR DATOS Instagram
  const handleEditInstagram = () => {
    setEmailValidator(true);
    setEditInstagram(!editInstagram);
    setEditPago(false);
    setEditEmailApp(false);
    setEditEmail(false);
    setEditTelephone(false);
    setEditContacto(false);
  };
  const handleChangeInstagram = (event) => {
    setInputInstagram(event.target.value);
  };
  const handleConfirmEditInstagram = async (id) => {
    try {
      const body = { instagram: inputInstagram };
      const response = await axios.put(`/lead/changeemail/${id}`, body);
      setUpdatedInstagram(response.data.instagram);
      SendEmailLeadAlert("Instagram");
    } catch (error) {
      SendEmailLeadAlertError("Instagram");
    }

    setEditInstagram(false);
  };

  //EDITAR DATOS Phone
  const handleEditTelephone = () => {
    setEmailValidator(true);
    setEditTelephone(!editTelephone);
    setEditPago(false);
    setEditEmailApp(false);
    setEditEmail(false);
    setEditInstagram(false);
    setEditContacto(false);
  };
  const handleChangeTelephone = (event) => {
    setInputTelephone(event.target.value);
  };
  const handleConfirmEditTelephone = async (id) => {
    try {
      const body = { telephone: inputTelephone };
      const response = await axios.put(`/lead/changeemail/${id}`, body);
      setUpdatedTelephone(response.data.telephone);
      SendEmailLeadAlert("Phone");
    } catch (error) {
      SendEmailLeadAlertError("Phone");
    }

    setEditTelephone(false);
  };
  //EDITAR DATOS EmailApp
  const handleEditEmailApp = () => {
    setEmailValidator(true);
    setEditEmailApp(!editEmailApp);
    setEditPago(false);
    setEditTelephone(false);
    setEditEmail(false);
    setEditInstagram(false);
    setEditContacto(false);
  };
  const handleChangeEmailApp = (event) => {
    const emailChecked = event.target.value.trim();
    setInputEmailApp(emailChecked);
    validatorEmailFunction(emailChecked);
  };
  const handleConfirmEditEmailApp = async (id) => {
    try {
      const body = { emailApp: inputEmailApp };
      const response = await axios.put(`/lead/changeemail/${id}`, body);
      setUpdatedEmailApp(response.data.emailApp);
      SendEmailLeadAlert("Email App");
    } catch (error) {
      SendEmailLeadAlertError("Email App");
    }
    setEditEmailApp(false);
  };

  //EDITAR DATOS Contacto
  const handleEditContacto = () => {
    setEmailValidator(true);
    setEditContacto(!editContacto);
    setEditPago(false);
    setEditEmailApp(false);
    setEditTelephone(false);
    setEditEmail(false);
    setEditInstagram(false);
  };
  const handleChangeContacto = (event) => {
    setInputContacto(event.target.value);
  };
  const handleConfirmEditContacto = async (id) => {
    try {
      const body = { contacto: inputContacto };
      const response = await axios.put(`/lead/changeemail/${id}`, body);
      setUpdatedContacto(response.data.contacto);
      SendEmailLeadAlert("Contacto");
    } catch (error) {
      SendEmailLeadAlertError("Contacto");
    }
    setEditContacto(false);
  };

  //EDITAR Link Pago
  const handleEditPago = () => {
    setEmailValidator(true);
    setEditPago(!editPago);
    setEditContacto(false);
    setEditEmailApp(false);
    setEditTelephone(false);
    setEditEmail(false);
    setEditInstagram(false);
  };
  const handleChangePago = (event) => {
    setInputPago(event.target.value);
  };
  const handleConfirmEditPago = async (id) => {
    try {
      const body = { linkActivado: false };
      const body2 = { linkPago: "" };
      const response = await axios.put(`/lead/changeemail/${id}`, body);
      const response2 = await axios.put(`/lead/changeemail/${id}`, body2);
      setUpdatedPago(response.data.linkActivado);
      SendEmailLeadAlert("Link Pago");
    } catch (error) {
      SendEmailLeadAlertError("Link Pago");
    }
    setEditPago(false);
  };

  return (
    <div className="">
      <div className="flex gap-4">
        <BsCurrencyEuro
          className="bg-[#468866] text-1 text-white w-10 h-8 rounded-md cursor-pointer py-1 "
          onClick={handleOpen}
        />
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box
          sx={{
            ...style,
            width: 700,
            borderRadius: 5,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div className=" w-full flex justify-center items-center mt-2">
            {showCopiedMessage && (
              <p className="absolute -top-20 w-52 text-[#fff] font-bold flex justify-center gap-5 items-center rounded-xl py-4 mt-2 bg-[#2bca80] hover:bg-[#3f437a] cursor-pointer">
                Copiado!
              </p>
            )}
            {openAlert && (
              <motion.div
                initial={{ opacity: 0, x: "-20px" }}
                whileInView={{ x: "0px", opacity: 1 }}
                transition={{
                  duration: 1,
                  delay: 0.1,
                  type: "spring",
                  bounce: 0.6,
                }}
                className="-top-20 absolute bg-[#44a044] pr-5 pl-3 py-5 rounded-md"
              >
                <label>✔ Lead Actualizado!</label>
              </motion.div>
            )}
            {openAlertError && (
              <motion.div
                initial={{ opacity: 0, x: "-20px" }}
                whileInView={{ x: "0px", opacity: 1 }}
                transition={{
                  duration: 1,
                  delay: 0.1,
                  type: "spring",
                  bounce: 0.6,
                }}
                className="border-2 -top-20 absolute bg-[#000000] pr-5 pl-3 py-5 rounded-md"
              >
                <label className=" text-white">❌ Error al Actualizar!</label>
              </motion.div>
            )}
            <div className="w-full flex flex-col justify-center items-center">
              <h2 id="parent-modal-title" className="text-center text-white">
                {item.name}
              </h2>
              <div className="flex flex-col justify-center items-center mt-3">
                <div className="mt-3  flex  justify-between items-center">
                  <div className="relative h-fit w-fit group flex justify-center items-center">
                    <p className="w-fit  whitespace-nowrap hidden absolute text-[#9c9b9b] -top-7 group-hover:block">
                      Open WebSite
                    </p>
                    <a href={item.url} target="blank">
                      <CiGlobe
                        className={
                          editEmail
                            ? "mx-3 border-2 text-1 w-12 h-10 cursor-pointer text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg  hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-blue-700 dark:text-white dark:border-gray-600 dark:hover:text-white dark:hover:bg-blue-500"
                            : "mx-3 border-2 text-1 w-12 h-10 cursor-pointer text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg  hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 "
                        }
                      />
                    </a>
                  </div>
                  <div className="relative h-fit w-fit group flex justify-center items-center">
                    <p className="w-fit  whitespace-nowrap hidden absolute text-[#9c9b9b] -top-7 group-hover:block">
                      Editar email lead
                    </p>
                    <CiMail
                      onClick={handleEditEmail}
                      className={
                        editEmail
                          ? "mx-3 border-2 text-1 w-12 h-10 cursor-pointer text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg  hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-blue-700 dark:text-white dark:border-gray-600 dark:hover:text-white dark:hover:bg-blue-500"
                          : "mx-3 border-2 text-1 w-12 h-10 cursor-pointer text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg  hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 "
                      }
                    />
                  </div>
                  <div className="relative h-fit w-fit group flex justify-center items-center">
                    <p className="w-fit  whitespace-nowrap hidden absolute text-[#9c9b9b] -top-7 group-hover:block">
                      Editar instagram
                    </p>
                    <CiInstagram
                      onClick={handleEditInstagram}
                      className={
                        editInstagram
                          ? "mx-3 border-2 text-1 w-12 h-10 cursor-pointer text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg  hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-blue-700 dark:text-white dark:border-gray-600 dark:hover:text-white dark:hover:bg-blue-500"
                          : "mx-3 border-2 text-1 w-12 h-10 cursor-pointer text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg  hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 "
                      }
                    />
                  </div>
                  <div className="relative h-fit w-fit group flex justify-center items-center">
                    <p className="w-fit  whitespace-nowrap hidden absolute text-[#9c9b9b] -top-7 group-hover:block">
                      Editar Teléfono
                    </p>
                    <AiOutlinePhone
                      onClick={handleEditTelephone}
                      className={
                        editTelephone
                          ? "mx-3 border-2 text-1 w-12 h-10 cursor-pointer text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg  hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-blue-700 dark:text-white dark:border-gray-600 dark:hover:text-white dark:hover:bg-blue-500"
                          : "mx-3 border-2 text-1 w-12 h-10 cursor-pointer text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg  hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 "
                      }
                    />
                  </div>
                  <div className="relative h-fit w-fit group flex justify-center items-center">
                    <p className="w-fit  whitespace-nowrap hidden absolute text-[#9c9b9b] -top-7 group-hover:block">
                      Editar contacto
                    </p>
                    <AiOutlineUserAdd
                      onClick={handleEditContacto}
                      className={
                        editContacto
                          ? "mx-3 border-2 text-1 w-12 h-10 cursor-pointer text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg  hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-blue-700 dark:text-white dark:border-gray-600 dark:hover:text-white dark:hover:bg-blue-500"
                          : "mx-3 border-2 text-1 w-12 h-10 cursor-pointer text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg  hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 "
                      }
                    />
                  </div>
                  <div className="relative h-fit w-fit group flex justify-center items-center">
                    <p className="w-fit  whitespace-nowrap hidden absolute text-[#9c9b9b] -top-7 group-hover:block">
                      Editar email app
                    </p>
                    <p
                      onClick={handleEditEmailApp}
                      className={
                        editEmailApp
                          ? "flex items-center justify-center mx-3 border-2 text-1 w-12 h-10 cursor-pointer text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg  hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-blue-700 dark:text-white dark:border-gray-600 dark:hover:text-white dark:hover:bg-blue-500"
                          : "flex items-center justify-center mx-3 border-2 text-1 w-12 h-10 cursor-pointer text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg  hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 "
                      }
                    >
                      APP
                    </p>
                  </div>
                  <div className="relative h-fit w-fit group flex justify-center items-center">
                    <p className="w-fit  whitespace-nowrap hidden absolute text-[#9c9b9b] -top-7 group-hover:block">
                      Reinciar Link de Pago
                    </p>
                    <p
                      onClick={handleEditPago}
                      className={
                        editPago
                          ? "flex items-center justify-center mx-3 border-2 text-1 w-12 h-10 cursor-pointer text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg  hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-blue-700 dark:text-white dark:border-gray-600 dark:hover:text-white dark:hover:bg-blue-500"
                          : "flex items-center justify-center mx-3 border-2 text-1 w-12 h-10 cursor-pointer text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg  hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 "
                      }
                    >
                      PAGO
                    </p>
                  </div>

                  <div className="relative h-fit w-fit group flex justify-center items-center">
                    <p className="w-fit  whitespace-nowrap hidden absolute text-[#9c9b9b] -top-7 group-hover:block">
                      Copiar Link Pago
                    </p>

                    {window.location.hostname.includes("localhost") && (
                      <p
                        onClick={() =>
                          handleCopyClick(
                            `http://localhost:5173/promocion-pagos?emailApp=${inputEmailApp}`
                          )
                        }
                        className=" w-16 text-[#fff] font-bold flex justify-center gap-5 items-center rounded-xl py-2 ml-2 bg-[#474646] hover:bg-[#3f437a] cursor-pointer"
                      >
                        Link
                      </p>
                    )}
                    {window.location.hostname.includes(
                      "sml-app.vercel.app"
                    ) && (
                      <p
                        onClick={() =>
                          handleCopyClick(
                            `https://sml-app.vercel.app/promocion-pagos?emailApp=${inputEmailApp}`
                          )
                        }
                        className=" w-16 text-[#fff] font-bold flex justify-center gap-5 items-center rounded-xl py-2 ml-2 bg-[#474646] hover:bg-[#3f437a] cursor-pointer"
                      >
                        Link
                      </p>
                    )}
                    {window.location.hostname.includes("sml-app.com") && (
                      <p
                        onClick={() =>
                          handleCopyClick(
                            `https://sml-app.com/promocion-pagos?emailApp=${inputEmailApp}`
                          )
                        }
                        className=" w-16 text-[#fff] font-bold flex justify-center gap-5 items-center rounded-xl py-2 ml-2 bg-[#474646] hover:bg-[#3f437a] cursor-pointer"
                      >
                        Link
                      </p>
                    )}
                  </div>
                </div>
                <div className="">
                  {editEmail && (
                    <div className="w-full flex justify-center items-center mt-5 gap-3">
                      <input
                        type="text"
                        name="contacto"
                        onChange={handleChangeEmail}
                        defaultValue={updatedEmail}
                        className=" bbg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-64 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        // placeholder={inputEmail}
                        // value={inputEmail}
                        disabled={!editEmail}
                        required
                      />
                      <p
                        onClick={handleEditEmail}
                        className="flex justify-center items-center border-2 text-1 w-12 h-10 cursor-pointer text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg  hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 "
                      >
                        ❌
                      </p>
                      <ConfirmacionEdicion
                        handleConfirmEdit={handleConfirmEditEmail}
                        id={item._id}
                        emailValidator={emailValidator}
                      />
                    </div>
                  )}
                  {/* EDITAR DATOS Email-------------------------------------  */}
                  {editInstagram && (
                    <div className="w-full flex justify-center items-center mt-5 gap-3">
                      <input
                        type="text"
                        name="contacto"
                        onChange={handleChangeInstagram}
                        defaultValue={updatedInstagram}
                        className=" bbg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-64 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        disabled={!editInstagram}
                        required
                      />
                      <p
                        onClick={handleEditInstagram}
                        className="flex justify-center items-center border-2 text-1 w-12 h-10 cursor-pointer text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg  hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 "
                      >
                        ❌
                      </p>
                      <ConfirmacionEdicion
                        handleConfirmEdit={handleConfirmEditInstagram}
                        id={item._id}
                        emailValidator={emailValidator}
                      />
                    </div>
                  )}
                  {/* EDITAR DATOS Phone-------------------------------------  */}
                  {editTelephone && (
                    <div className="w-full flex justify-center items-center mt-5 gap-3">
                      <input
                        type="text"
                        name="contacto"
                        onChange={handleChangeTelephone}
                        defaultValue={updatedTelephone}
                        className=" bbg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-64 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        disabled={!editTelephone}
                        required
                      />
                      <p
                        onClick={handleEditTelephone}
                        className="flex justify-center items-center border-2 text-1 w-12 h-10 cursor-pointer text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg  hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 "
                      >
                        ❌
                      </p>
                      <ConfirmacionEdicion
                        handleConfirmEdit={handleConfirmEditTelephone}
                        id={item._id}
                        emailValidator={emailValidator}
                      />
                    </div>
                  )}
                  {editEmailApp && (
                    <div className="w-full flex justify-center items-center mt-5 gap-3">
                      <input
                        type="text"
                        name="contacto"
                        onChange={handleChangeEmailApp}
                        defaultValue={updatedEmailApp}
                        className=" bbg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-64 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Agregar email App cliente"
                        disabled={!editEmailApp}
                        required
                      />
                      <p
                        onClick={handleEditEmailApp}
                        className="flex justify-center items-center border-2 text-1 w-12 h-10 cursor-pointer text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg  hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 "
                      >
                        ❌
                      </p>
                      <ConfirmacionEdicion
                        handleConfirmEdit={handleConfirmEditEmailApp}
                        id={item._id}
                        emailValidator={emailValidator}
                      />
                    </div>
                  )}
                  {editContacto && (
                    <div className="w-full flex justify-center items-center mt-5 gap-3">
                      <input
                        type="text"
                        name="contacto"
                        onChange={handleChangeContacto}
                        defaultValue={updatedContacto}
                        className=" bbg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-64 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Agregar nombre de contacto"
                        disabled={!editContacto}
                        required
                      />
                      <p
                        onClick={handleEditContacto}
                        className="flex justify-center items-center border-2 text-1 w-12 h-10 cursor-pointer text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg  hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 "
                      >
                        ❌
                      </p>
                      <ConfirmacionEdicion
                        handleConfirmEdit={handleConfirmEditContacto}
                        id={item._id}
                        emailValidator={emailValidator}
                      />
                    </div>
                  )}
                  {editPago && (
                    <div className="w-full flex justify-center items-center mt-5 gap-3 text-white">
                      <p>¿Deseas reiniciar el link de pago?</p>
                      <p
                        onClick={handleEditPago}
                        className="flex justify-center items-center border-2 text-1 w-12 h-10 cursor-pointer text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg  hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 "
                      >
                        ❌
                      </p>
                      <ConfirmacionEdicion
                        handleConfirmEdit={handleConfirmEditPago}
                        id={item._id}
                        emailValidator={emailValidator}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="flex flex-col absolute right-4 top-4">
              {/* <div className="bg-[#8d8b0c] text-[#e8e8e9] w-[40px] rounded-md h-9 text-[35px] drop-shadow-xl hover:bg-[#c94219] ">
                <IncidenceModal
                  setOpen={setOpen}
                  SendIncidenceAlert={SendIncidenceAlert}
                  setStatusObj={setStatusObj}
                  statusObj={statusObj}
                  item={item}
                  emailAddress={emailAddress}
                  fullName={fullName}
                  updateLeads={updateLeads}
                />
              </div> */}
            </div>
          </div>
          <div className="flex flex-col justify-center items-center w-full my-10 gap-1 ">
            {/* <h1 className="text-14 text-white mb-3">- ESTADO DE CUENTA -</h1>
            <div className="gap-3 flex flex-col justify-center items-center w-56 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              <div className="w-48 flex justify-start items-center">
                <h3 className="w-36">Valor servicio:</h3>
                <h3>{`€${item.pagos && item.pagos.monto}`} </h3>
              </div>
              <div className="w-48 flex justify-start items-center">
                <h3 className="w-36">Cantidad cuotas:</h3>
                <h3>{`${item.pagos && item.pagos.cuotas}`}</h3>
              </div>
              <div className="w-48 flex justify-start items-center">
                <h3 className="w-36">Valor cuotas:</h3>
                <h3>{`€${item.pagos && item.pagos.valorCuota}`}</h3>
              </div>
              <div className="w-48 flex justify-start items-center">
                <h3 className="w-36">Pagos realizados:</h3>
                <h3>{`${item.pagos && item.pagos.cuotasPagadas}/${item.pagos && item.pagos.cuotas}`}</h3>
              </div>
            </div> */}
          </div>

          <div className=" h-fit flex items-center justify-start flex-col mb-10">
            <div className="">
              <div className="">
                <ChildModalHistory
                  item={item}
                  statusObj={statusObj}
                  llamadoVenta={llamadoVenta}
                  setOpen={setOpen}
                  SendLeadAlertBaja={SendLeadAlertBaja}
                  SendErrorUpdateAlertBaja={SendErrorUpdateAlertBaja}
                  handleLlamadoVentaChange={handleLlamadoVentaChange}
                  updateLeads={updateLeads}
                  emailAddress={emailAddress}
                  fullName={fullName}
                  cancelModal={cancelModal}
                  setStatusObj={setStatusObj}
                />
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
