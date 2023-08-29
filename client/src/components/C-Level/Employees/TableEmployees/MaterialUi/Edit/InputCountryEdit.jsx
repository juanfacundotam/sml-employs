import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

export default function InputCountryEdit({ inputCountry, setInputCountry }) {
  const handleChange = (event) => {
    setInputCountry(event.target.value);
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
        label="Pais"
        id="Pais"
        value={inputCountry}
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
