import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import React, { useRef, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AddLeads } from "../../../../redux/actions";
import { ToastContainer, toast } from "react-toastify";

const style = {
  position: "absolute",
  top: "30%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  boxShadow: 24,
  textAlign: "center",
  color: "white",
  pt: 2,
  px: 4,
  pb: 3,
  borderRadius: "20px",
};

export default function ChildModal() {
  const containerRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current && containerRef.current) {
      inputRef.current.addEventListener("input", handleInput);
    }

    return () => {
      if (inputRef.current && containerRef.current) {
        inputRef.current.removeEventListener("input", handleInput);
      }
    };
  }, []);

  const handleInput = () => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [body, setBody] = useState([]);
  const dispatch = useDispatch();
  const onClickAdd = () => {
    if (body[0]) {
      SendAddLeads();
      dispatch(AddLeads(body));


      if (inputRef.current) {
        inputRef.current.value = null;
        setBody([]);
      }
    } else {
      SendAddLeadsError();
    }
  };

  const [selectedFile, setSelectedFile] = useState(null);
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);

    const reader = new FileReader();
    reader.onload = handleFileRead;
    reader.readAsText(file);
  };

  const handleFileRead = (event) => {
    const content = event.target.result;
    const jsonData = JSON.parse(content);
    setBody(jsonData);
  };

  const SendAddLeads = () => {
    toast.info(`✔ ADD LEADS! `, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  const SendAddLeadsError = () => {
    toast.error(`❌ SELECCIONA UN ARCHIVO!`, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  return (
    <React.Fragment>
      <ToastContainer />
      <Button variant="contained" sx={{}} onClick={handleOpen}>
        Add Leads
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box
          sx={{
            ...style,
            width: "40%",
            backgroundColor: "#39394b",
            height: "300px",
          }}
        >
          <div className="flex flex-col gap-5 p-8 h-full ">
            <h2>Añadir Clientes</h2>
            <label>json</label>
            <div>
              <input
                type="file"
                accept=".json"
                onChange={handleFileChange}
                ref={inputRef}
              />
            </div>
            <div>
              <Button
                variant="contained"
                sx={{
                  width: "50px",
                }}
                onClick={() => onClickAdd()}
              >
                Add
              </Button>
            </div>
          </div>
        </Box>
      </Modal>
    </React.Fragment>
  );
}
