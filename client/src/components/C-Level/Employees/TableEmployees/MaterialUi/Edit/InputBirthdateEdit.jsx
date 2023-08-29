import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

export default function InputBirthdateEdit({ inputBirthdate, setInputBirthdate }) {
  const handleChange = (event) => {
    setInputBirthdate(event.target.value);
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
        label="Nacimiento"
        id="Nacimiento"
        value={inputBirthdate}
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
