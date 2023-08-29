import React, { useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { styled } from "@mui/material/styles";

const StyledMenuItem = styled(MenuItem)(() => ({
  "&:hover": {
    backgroundColor: "#39394b",
  },
}));

const StyledInputLabel = styled(InputLabel)(() => ({
  color: "#fff",
}));

const StyledSelect = styled(Select)(() => ({
  "& .MuiSelect-icon": { color: "#fff" },
  "& .MuiInputBase-input": { color: "#fff" },
  "& .MuiMenu-paper": {
    backgroundColor: "red", // Cambiar el color de fondo del menú de opciones aquí
  },
}));

const StyledFormControl = styled(FormControl)(() => ({
  "& .MuiInputLabel-formControl": {
    color: "#fff",
  },
  "& .MuiMenu-paper": {
    backgroundColor: "red", // Cambiar el color de fondo del menú de opciones aquí
  },
}));

export default function BasicSelect({ employees, setEmployees }) {
  const handleChange = (event) => {
    setEmployees(event.target.value);
  };

  return (
    <Box sx={{ width: "50%" }}>
      <StyledFormControl fullWidth>
        <StyledInputLabel id="demo-simple-select-label">
          Employees
        </StyledInputLabel>
        <StyledSelect
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={employees}
          label="Employees"
          onChange={handleChange}
        >
          <StyledMenuItem value={"clevel"}>C-Level</StyledMenuItem>
          <StyledMenuItem value={"leader"}>Leader</StyledMenuItem>
          <StyledMenuItem value={"corredor"}>Corredor</StyledMenuItem>
          <StyledMenuItem value={"vendedor"}>Vendedor</StyledMenuItem>
        </StyledSelect>
      </StyledFormControl>
    </Box>
  );
}
