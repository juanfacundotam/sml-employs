import React, { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import InputNameEdit from "./InputNameEdit";
import InputPhoneEdit from "./InputPhoneEdit";
import axios from "axios";
import { useDispatch } from "react-redux";
import {
  getAllClevel,
  getAllCorredores,
  getAllLeader,
  getAllVendedores,
} from "../../../../../../redux/actions";
import BasicSelect from "../BasicSelect";
import InputEmailEdit from "./InputEmailEdit";

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

function ChildModalDelete({
  inputName,
  inputEmail,
  itemRol,
  itemId,
  onModalClose,
  ErrorEmployees,
  BannedEmployees,
}) {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const handleOpen = () => {
    setOpen(true);
  };

  const handleCreate = async () => {
    try {
      const response = await axios.put(`/${itemRol}/${itemId}`, {
        deleted: true,
      });
    } catch (error) {
      ErrorEmployees(inputName);
    }
    try {
      const response = await axios.put(`/employees/?email=${inputEmail}`, {
        deleted: true,
      });

      BannedEmployees(inputName);
      onModalClose();
    } catch (error) {}
    dispatch(getAllCorredores());
    dispatch(getAllVendedores());
    dispatch(getAllLeader());
    dispatch(getAllClevel());
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button
        variant="contained"
        sx={{ marginTop: "2rem" }}
        onClick={handleOpen}
      >
        Delete Employ
      </Button>
      <Modal
        open={open}
        onClose={handleCreate}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: "20%", backgroundColor: "#39394b" }}>
          <h2 id="child-modal-title">Confirm deletion of {inputName}?</h2>
          <Button variant="contained" onClick={handleCreate}>
            Delete Employ
          </Button>
        </Box>
      </Modal>
    </React.Fragment>
  );
}

function ChildModal({
  inputName,
  inputEmail,
  selectEmployees,
  inputPhone,
  itemRol,
  itemId,
  onModalClose,
  EditEmployees,
  ErrorEditEmployees,
}) {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const handleOpen = () => {
    setOpen(true);
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

    try {
      const response = await axios.put(`/${itemRol}/${itemId}`, {
        name: inputName,
        email: inputEmail,
        rol: selectEmployees,
        contactNumber: inputPhone,
      });
      EditEmployees(inputName);
      onModalClose();
    } catch (error) {
      ErrorEditEmployees(inputName);
    }

    dispatch(getAllCorredores());
    dispatch(getAllVendedores());
    dispatch(getAllLeader());
    dispatch(getAllClevel());
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button
        variant="contained"
        sx={{ marginTop: "2rem" }}
        onClick={handleOpen}
      >
        Update Employ
      </Button>
      <Modal
        open={open}
        onClose={handleCreate}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: "20%", backgroundColor: "#39394b" }}>
          <h2 id="child-modal-title">Confirm update of {inputName}?</h2>
          <Button variant="contained" onClick={handleCreate}>
            Update Employ
          </Button>
        </Box>
      </Modal>
    </React.Fragment>
  );
}

export default function NestedModalEdit({
  itemId,
  itemName,
  itemEmail,
  itemPhone,
  itemRol,
  SendEmployees,
  BannedEmployees,
  EditEmployees,
  ErrorEditEmployees,
}) {
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  const [inputName, setInputName] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [selectEmployees, setSelectEmployees] = useState("");
  const [inputPhone, setInputPhone] = useState("");

  const handleOpen = () => {
    setInputName(itemName);
    setInputEmail(itemEmail);
    setSelectEmployees(itemRol);
    setInputPhone(itemPhone);
    setOpen(true);
  };

  return (
    <div>
      <Button onClick={handleOpen}>...</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: "30%", height: "45%", bgcolor: "#39394b" }}>
          <div>
            <div className="flex flex-col gap-5 my-5">
              <h2 id="parent-modal-title">Edit Employ {inputName}</h2>
            </div>
            <div className="flex flex-col items-center justify-center gap-5">
              <InputNameEdit
                inputName={inputName}
                setInputName={setInputName}
              />
              <InputEmailEdit
                inputEmail={inputEmail}
                setInputEmail={setInputEmail}
              />
              <InputPhoneEdit
                inputPhone={inputPhone}
                setInputPhone={setInputPhone}
              />
              {/* <BasicSelect
                employees={selectEmployees}
                setEmployees={setSelectEmployees}
              /> */}
            </div>
          </div>
          <div className="flex gap-3 justify-center items-center">
            <ChildModal
              inputName={inputName}
              inputEmail={inputEmail}
              selectEmployees={selectEmployees}
              inputPhone={inputPhone}
              itemRol={itemRol}
              itemId={itemId}
              onModalClose={handleClose}
              EditEmployees={EditEmployees}
              ErrorEditEmployees={ErrorEditEmployees}
            />
            {itemRol !== "clevel" && itemRol !== "leader" ? (
              <ChildModalDelete
                inputName={inputName}
                inputEmail={inputEmail}
                itemRol={itemRol}
                itemId={itemId}
                SendEmployees={SendEmployees}
                BannedEmployees={BannedEmployees}
                onModalClose={handleClose}
              />
            ) : null}
          </div>
        </Box>
      </Modal>
    </div>
  );
}
