import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function SelectSmall(props) {
  const handleChange = props.onChange;

  return (
    <FormControl
      sx={{
        m: 1,
        width: "20%",
        height: "33px",
        margin: "0px 0px",
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
        Nivel
      </InputLabel>
      <Select
        labelId="demo-select-small-label"
        id="level"
        value={props.value}
        label="level"
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
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        <MenuItem value="0">0</MenuItem>
        <MenuItem value="1">1</MenuItem>
        <MenuItem value="2">2</MenuItem>
        <MenuItem value="incidencia">Incidencia</MenuItem>
      </Select>
    </FormControl>
  );
}
