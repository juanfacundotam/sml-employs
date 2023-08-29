import { Box, Modal } from "@mui/material";
import React from "react";

const style = {
  position: "absolute",
  top: "40%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "rgb(55 65 81)",
  boxShadow: 24,
  p: 4,
  textColor: "white",
  color: "white",
  height: 150,
  borderRadius: "20px",
};

export default function ModalDescartado({ open, close, DiscardLead, client }) {
  return (
    <div>
      <Modal
        open={open}
        onClose={close}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        BackdropProps={{
          sx: {
            backgroundColor: "rgba(00, 00, 00, 0.9)",
          },
        }}
      >
        <Box sx={style}>
          <div className="flex flex-col justify-between h-full w-full text-center text-18 ">
            <p>¿Descartar por completo el lead?</p>
            <div className="flex justify-around w-full">
              <button className="bg-red-500 w-2/6  rounded-md" onClick={close}>
                NO
              </button>
              <button
                className="bg-[#a020f0] w-2/6  rounded-md"
                onClick={() => {
                  DiscardLead(client);
                }}
              >
                SI
              </button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
