import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

export default function InputPhoneEdit({ inputPhone, setInputPhone }) {
  const handleChange = (event) => {
    setInputPhone(event.target.value);
  };

  return (
    <Box
      sx={{
        width: "80%",
        maxWidth: "100%",
        color: "white",
      }}
    >
      <TextField
        fullWidth
        label="Telefono"
        id="Telefono"
        value={inputPhone}
        onChange={handleChange}
        InputProps={{
          style: {
            color: "white",
          },
        }}
        InputLabelProps={{
          style: {
            color: "white",
          },
        }}
      />
    </Box>
  );
}
