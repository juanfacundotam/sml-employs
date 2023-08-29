import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

export default function LeadAsigned({ leadAsigned, setLeadAsigned }) {
  const handleChange = (event) => {
    setLeadAsigned(event.target.value);
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
        label='Asignar Leads'
        id='Asignar Leads'
        type="number"
        value={leadAsigned}
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
