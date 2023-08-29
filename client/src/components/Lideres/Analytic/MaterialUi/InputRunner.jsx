import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

export default function InputName({ name, setName }) {
  const handleChange = (event) => {
    setName(event.target.value);
  };

  return (
    <Box
      sx={{
        width: "20%",
        maxWidth: "40%",
        height: "33px",
        color: "gray",
        margin: "0px 10px",
        "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
          borderColor: "white",
        },
        "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
          borderColor: "white",
        },
        "&.focused .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
          borderColor: "green",
        },
      }}
    >
      <TextField
        fullWidth
        label="Buscar por corredor"
        id="runner"
        value={name}
        onChange={handleChange}
        size="small"
        InputProps={{
          style: {
            color: "white",
          },
        }}
        InputLabelProps={{
          style: {
            color: "gray",
          },
        }}
      />
    </Box>
  );
}
