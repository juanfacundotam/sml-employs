import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

export default function InputEmailEdit({ inputEmail, setInputEmail }) {
  const handleChange = (event) => {
    setInputEmail(event.target.value);
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
        label="Email"
        id="Email"
        value={inputEmail}
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
