import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function SelectStatus(props) {
  const handleChange = props.onChange;

  return (
    <FormControl
      sx={{
        m: 1,
        width: "230px",
        height: "33px",
        margin: "0px 50px",
        color: "white",
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
      size="small"
    >
      <InputLabel id="demo-select-small-label" style={{ color: "gray" }}>
        Status
      </InputLabel>
      <Select
        labelId="demo-select-small-label"
        id="status"
        value={props.value}
        label="status"
        onChange={(event) => {
          handleChange(event.target.value);
        }}
        sx={{
          color: "white",
          "& .MuiSelect-icon": {
            color: "white",
          },
        }}
      >
        <MenuItem value="s">
          <em>None</em>
        </MenuItem>

        <MenuItem value="No responde">No responde</MenuItem>
        <MenuItem value="Contratado">Contratado</MenuItem>
        <MenuItem value="Rechazado">Rechazado</MenuItem>
        <MenuItem value="Agenda llamada">Agenda llamada</MenuItem>

      </Select>
    </FormControl>
  );
}
