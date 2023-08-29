import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import {
  findVendedoresByNameAllInfo,
  getVendedor,
} from "../../../../redux/actions";
export default function InputName({ name }) {
  const dispatch = useDispatch();
  const [names, setNames] = useState("");
  const [fromDay, setFromDay] = useState("");
  const [toDay, setToDay] = useState("");

  const { allVendedores } = useSelector((state) => state);

  useEffect(() => {
    dispatch(getVendedor());
  }, [dispatch]);

  const handleChange = (event) => {
    let value = event.target.value;
    setNames(value);
  };

  const handleFromDay = (event) => {
    setFromDay(event.target.value);
  };
  const handleToDay = (event) => {
    setToDay(event.target.value);
  };

  const handleFilterClick = () => {
    dispatch(findVendedoresByNameAllInfo(names, fromDay, toDay));
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "10px",
        width: "50%",
        height: "33px",
        color: "gray",
        paddingBottom: "10px",
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
      <div className="flex flex-col">
        <label>Vendedor:</label>
        <Select
          value={names}
          onChange={handleChange}
          label=""
          id="runner"
          size="small"
          variant="outlined"
          displayEmpty
          inputProps={{
            style: {
              color: "white",
            },
          }}
          sx={{
            color: "white",
            "& .MuiOutlinedInput-input": {
              padding: "9.5px 14px",
            },
            "& .MuiSelect-outlined": {
              paddingRight: "28px",
            },
          }}
        >
          <MenuItem value="" disabled>
            Buscar por corredor
          </MenuItem>
          {allVendedores.map((corredor) => (
            <MenuItem key={corredor} value={corredor}>
              {corredor}
            </MenuItem>
          ))}
        </Select>
      </div>

      <div className="flex flex-col">
        <label>Desde:</label>
        <TextField
          type="date"
          value={fromDay}
          onChange={handleFromDay}
          label=""
          size="small"
          variant="outlined"
          inputProps={{
            min: 1,
            max: 31,
            step: 1,
            style: {
              color: "white",
            },
          }}
          sx={{
            width: "150px",
          }}
        />
      </div>

      <div className="flex flex-col">
        <label>Hasta:</label>
        <TextField
          type="date"
          value={toDay}
          onChange={handleToDay}
          label=""
          placeholder="hola"
          size="small"
          variant="outlined"
          inputProps={{
            min: 1,
            max: 31,
            step: 1,
            style: {
              color: "white",
            },
          }}
          sx={{
            width: "150px",
          }}
        />
      </div>

      <Button onClick={handleFilterClick} variant="contained" size="small">
        Filtrar
      </Button>
    </Box>
  );
}
