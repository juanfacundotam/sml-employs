import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

export default function InputNameEdit({ inputName, setInputName }) {
  const handleChange = (event) => {
    setInputName(event.target.value);
  };

  return (
    <Box
      sx={{
        width: "50%",
        maxWidth: "100%",
        color: "white",
      }}
    >
      <TextField
        fullWidth
        label="Name"
        id="Name"
        value={inputName}
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
