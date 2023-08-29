import React, { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import BasicSelect from "./BasicSelect";
import InputName from "./InputName";
import InputEmail from "./InputEmail";
import axios from "axios";
import { useDispatch } from "react-redux";
import {
  getAllClevel,
  getAllCorredores,
  getAllLeader,
  getAllVendedores,
} from "../../../../../redux/actions";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  border: "2px solid #000",
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
  handleReset,
  CreateEmployees,
  ErrorCreateEmployees,
  handleCloseChild,
}) {
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
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
      case "leader":
        url = "/leader";
        break;
      case "corredor":
        url = "/corredor";
        break;
      case "vendedor":
        url = "/vendedor";
        break;
      default:
        alert("El campo 'rol' no es válido");
        return;
    }

    try {
      const response = await axios.post(url, {
        name: inputName,
        email: inputEmail,
        rol: selectEmployees,
      });
      CreateEmployees(inputName);

      // const emailData = {
      //   clientName: client[i].name,
      //   recipientEmail: inputEmail,
      //   message: `Bienvenido a la empresa ${inputName}, su mail es ${inputEmail} y su contraseña es ${selectEmployees}`,
      // };

      // await axios.post(
      //   "/corredor/sendmail",
      //   emailData
      // );
    } catch (error) {
      ErrorCreateEmployees(inputName);
    }

    try {
      const responseEmployees = await axios.post("/employees", {
        name: inputName,
        email: inputEmail,
        rol: selectEmployees,
      });
    } catch (error) {}

    dispatch(getAllCorredores());
    dispatch(getAllVendedores());
    dispatch(getAllLeader());
    dispatch(getAllClevel());
    setOpen(false);
    handleReset();
  };

  return (
    <React.Fragment>
      <div className="flex gap-2 justify-center items-center mt-5">
        <Button variant="outlined" onClick={handleCloseChild}>
          Close x
        </Button>
        <Button variant="contained" onClick={handleOpen}>
          Create Employ
        </Button>
      </div>
      <Modal
        open={open}
        onClose={handleCreate}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: "20%", backgroundColor: "#39394b" }}>
          <div className="flex flex-col gap-5 p-4">
            <h2 id="child-modal-title">Confirm employee creation</h2>
            <div className="flex flex-col gap-2 justify-center items-start">
              <p id="child-modal-description">Name: {inputName}</p>
              <p id="child-modal-description">Email: {inputEmail}</p>
              <p id="child-modal-description">Rol: {selectEmployees}</p>
            </div>
            <p id="child-modal-description">
              Are you sure about creating this employee?
            </p>

            <div className="flex justify-center gap-2 items-center">
              <Button variant="outlined" onClick={handleClose}>
                Close x
              </Button>
              <Button variant="contained" onClick={handleCreate}>
                Create Employ
              </Button>
            </div>
          </div>
        </Box>
      </Modal>
    </React.Fragment>
  );
}

export default function NestedModal({ CreateEmployees, ErrorCreateEmployees }) {
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

  const handleReset = () => {
    setInputName("");
    setInputEmail("");
    setSelectEmployees("");
  };

  return (
    <div>
      <Button variant="contained" onClick={handleOpen}>
        Add Employees
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: "30%", height: "50%", bgcolor: "#39394b" }}>
          <div>
            <div className="flex flex-col gap-5 my-5">
              <h2 id="parent-modal-title">New Employees</h2>
              <p id="parent-modal-description">Employee registration</p>
            </div>
            <div className="flex flex-col items-center justify-center gap-5">
              <InputName name={inputName} setName={setInputName} />
              <InputEmail email={inputEmail} setEmail={setInputEmail} />

              <BasicSelect
                employees={selectEmployees}
                setEmployees={setSelectEmployees}
              />
            </div>
          </div>
          <ChildModal
            inputName={inputName}
            inputEmail={inputEmail}
            selectEmployees={selectEmployees}
            handleReset={handleReset}
            CreateEmployees={CreateEmployees}
            ErrorCreateEmployees={ErrorCreateEmployees}
            handleCloseChild={handleClose}
          />
        </Box>
      </Modal>
    </div>
  );
}
