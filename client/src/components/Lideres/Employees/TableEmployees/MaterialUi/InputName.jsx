import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

export default function InputName({ name, setName, itemName }) {
  const handleChange = (event) => {
    setName(event.target.value);
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
        label='Name'
        id='Name'
        value={name}
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
