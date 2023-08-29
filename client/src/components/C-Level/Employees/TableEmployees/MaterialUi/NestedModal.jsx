import React, { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import BasicSelect from "./BasicSelect";
import InputName from "./InputName";
import InputEmail from "./InputEmail";
import axios from "axios";
import { useDispatch } from "react-redux";
import { getAllEmployees } from "../../../../../redux/actions";
import LeadAsigned from "./LeadAsigned";
import "./Loader.css";
import Profesion from "./Profesion";

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

function ChildModal({
  inputName,
  inputEmail,
  selectEmployees,
  profesion,
  country,
  leadAsigned,
  handleReset,
  CreateEmployees,
  okLeads,
  almostLeads,
  errorLeads,
  ErrorCreateEmployees,
  handleCloseChild,
}) {
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleCreate = async () => {
    if (!inputName) {
      alert("El campo Name es requerido");
      setOpen(false);
      return;
    }

    const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    if (!inputEmail || !emailRegex.test(inputEmail)) {
      alert("El campo Email debe ser un correo electrónico válido");
      setOpen(false);
      return;
    }

    if (!selectEmployees) {
      alert("El campo Employees es obligatorio");
      setOpen(false);
      return;
    }

    let url;
    switch (selectEmployees) {
      case "clevel":
        url = "/clevel";
        break;
      case "leader":
        url = "/leader";
        break;
      case "corredor":
        url = "/corredor";
        break;
      case "vendedor":
        url = "/vendedor";
        break;
      case "freelancer":
        url = "/freelancer";
        break;
      default:
        alert("El campo 'rol' no es válido");
        return;
    }

    try {
      const response1 = await axios.post(url, {
        name: inputName,
        email: inputEmail,
        rol: selectEmployees,
        deleted: false,
      });

      if (selectEmployees === "clevel" || selectEmployees === "leader") {
        await axios.post("/corredor", {
          name: inputName,
          email: inputEmail,
          rol: "corredor",
          deleted: false,
        });

        await axios.post("/vendedor", {
          name: inputName,
          email: inputEmail,
          rol: "vendedor",
          deleted: false,
        });
      }

      if (selectEmployees === "freelancer") {
        await axios.post("/corredor", {
          name: inputName,
          email: inputEmail,
          rol: "corredor",
          deleted: false,
        });

        await axios.post("/vendedor", {
          name: inputName,
          email: inputEmail,
          rol: "vendedor",
          deleted: false,
        });

        setLoading(true);

        if (axios.defaults.baseURL === "https://sml-app.com/api") {
          const response = await axios.get(
            `https://apisml.onrender.com/freelance?freelance=${inputName}&email=${inputEmail}&num_leads=${leadAsigned}&profesion=${profesion}&country=${country}`
          );
          if (response.data.message === "Carga completa de leads") {
            okLeads(response.data.message);
          } else if (
            response.data.message === "No hay leads con la profesion solicitada"
          ) {
            errorLeads(response.data.message);
          } else {
            almostLeads(response.data.message);
          }
        } else if (
          axios.defaults.baseURL === "http://localhost:3001/api" ||
          axios.defaults.baseURL === "https://smlapp.onrender.com/api"
        ) {
          const response = await axios.get(
            `https://apisml.onrender.com/freelance_desarrollo?freelance=${inputName}&email=${inputEmail}&num_leads=${leadAsigned}&profesion=${profesion}&country=${country}`
          );
          if (response.data.message === "Carga completa de leads") {
            okLeads(response.data.message);
          } else if (
            response.data.message === "No hay leads con la profesion solicitada"
          ) {
            errorLeads(response.data.message);
          } else {
            almostLeads(response.data.message);
          }
        }

        setLoading(false);
      }
      CreateEmployees(inputName);
    } catch (error) {
      ErrorCreateEmployees(inputName);
    }

    try {
      const responseEmployees = await axios.post("/employees", {
        name: inputName,
        email: inputEmail,
        rol: selectEmployees,
        deleted: false,
      });
    } catch (error) {}

    dispatch(getAllEmployees());
    setOpen(false);
    handleReset();
  };

  return (
    <React.Fragment>
      <div className="flex gap-2 justify-center items-center mt-5">
        <Button
          variant="outlined"
          sx={{
            color: "white",
            borderColor: "#ae2dff",
            "&:hover": {
              borderColor: "#a020f0",
            },
          }}
          onClick={handleCloseChild}
        >
          Cerrar
        </Button>
        <Button
          variant="contained"
          sx={{
            color: "white",
            bgcolor: "#ae2dff",
            "&:hover": {
              bgcolor: "#a020f0",
            },
          }}
          onClick={handleOpen}
        >
          Siguiente
        </Button>
      </div>
      <Modal
        open={open}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box
          sx={{
            ...style,
            width: "fit-content",
            height: "fit-content",
            backgroundColor: "#39394b",
          }}
        >
          <div className="flex flex-col items-center justify-center gap-5 p-2">
            <h2 id="child-modal-title">Creacion de empleado</h2>
            <div className="flex flex-col gap-2 justify-start items-start">
              <div className="flex gap-2">
                <h2 id="child-modal-description">Nombre: </h2>
                <p id="child-modal-description">{inputName}</p>
              </div>
              <div className="flex gap-2">
                <h2 id="child-modal-description">Email: </h2>
                <p id="child-modal-description">{inputEmail}</p>
              </div>
              <div className="flex gap-2">
                <h2 id="child-modal-description">Rol: </h2>
                <p id="child-modal-description">{selectEmployees}</p>
              </div>
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <h2 id="child-modal-description">
                      Asignado Leads a Freelancer{" "}
                    </h2>
                    <div className="lds-roller">
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
            <p id="child-modal-description">
              Estas seguro que queres crear este empleado?
            </p>
            <div className="flex justify-center gap-2 items-center">
              <Button
                variant="outlined"
                sx={{
                  color: "white",
                  borderColor: "#ae2dff",
                  "&:hover": {
                    borderColor: "#a020f0",
                  },
                }}
                onClick={handleClose}
              >
                Cerrar
              </Button>
              <Button
                variant="contained"
                sx={{
                  color: "white",
                  bgcolor: "#ae2dff",
                  "&:hover": {
                    bgcolor: "#a020f0",
                  },
                }}
                onClick={handleCreate}
              >
                Crear empleado
              </Button>
            </div>
          </div>
        </Box>
      </Modal>
    </React.Fragment>
  );
}

export default function NestedModal({
  CreateEmployees,
  okLeads,
  almostLeads,
  errorLeads,
  ErrorCreateEmployees,
}) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [inputName, setInputName] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [selectEmployees, setSelectEmployees] = useState("");
  const [leadAsigned, setLeadAsigned] = useState(0);
  const [profesion, setProfesion] = useState("");
  const [country, setCountry] = useState("");

  const handleReset = () => {
    setInputName("");
    setInputEmail("");
    setSelectEmployees("");
    setLeadAsigned();
  };

  return (
    <div>
      <Button
        variant="contained"
        sx={{
          color: "white",
          bgcolor: "#ae2dff",
          "&:hover": {
            bgcolor: "#a020f0",
          },
        }}
        onClick={handleOpen}
      >
        Agregar empleado
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
            width: "35%",
            height: "fit-content",
            bgcolor: "#39394b",
          }}
        >
          <div>
            <div className="flex flex-col gap-5 my-5">
              <h2 id="parent-modal-title">Nuevo empleado</h2>
              <p id="parent-modal-description">Regristar nuevo empleado</p>
            </div>
            <div className="flex flex-col items-center justify-center gap-5">
              <InputName name={inputName} setName={setInputName} />
              <InputEmail email={inputEmail} setEmail={setInputEmail} />
              <BasicSelect
                employees={selectEmployees}
                setEmployees={setSelectEmployees}
              />
              {selectEmployees === "freelancer" ? (
                <div className="flex flex-col justify-center items-center gap-10 m-2">
                  <LeadAsigned
                    leadAsigned={leadAsigned}
                    setLeadAsigned={setLeadAsigned}
                  />
                  <Profesion
                    profesion={profesion}
                    setProfesion={setProfesion}
                    country={country}
                    setCountry={setCountry}
                  />
                </div>
              ) : null}
            </div>
          </div>
          <ChildModal
            inputName={inputName}
            inputEmail={inputEmail}
            profesion={profesion}
            country={country}
            leadAsigned={leadAsigned}
            selectEmployees={selectEmployees}
            handleReset={handleReset}
            CreateEmployees={CreateEmployees}
            okLeads={okLeads}
            almostLeads={almostLeads}
            errorLeads={errorLeads}
            ErrorCreateEmployees={ErrorCreateEmployees}
            handleCloseChild={handleClose}
          />
        </Box>
      </Modal>
    </div>
  );
}
