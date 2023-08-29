import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function HandleParametros() {
  const [categoria, setCategoria] = React.useState("");

  const handleChange = (event) => {
    setCategoria(event.target.value);
  };

  return (
    <Box sx={{ width: 280, bgcolor: "#282828", borderRadius: ".4rem" }}>
      <FormControl fullWidth>
        <InputLabel sx={{ color: "white" }} id="demo-simple-select-label">
          Parámetros
        </InputLabel>
        <Select
          sx={{ color: "white" }}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={categoria}
          label="Categoria"
          onChange={handleChange}
        >
          <MenuItem value={1}>1</MenuItem>
          <MenuItem value={2}>2</MenuItem>
          <MenuItem value={3}>3</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
