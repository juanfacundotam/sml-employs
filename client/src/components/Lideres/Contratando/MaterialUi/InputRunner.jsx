import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import {
  findCorredoresByNameAllInfoSeguimiento,
  getAllCategory,
  getAllCountries,
  getAllProfesion,
  getCorredor,
  getFreelancers,
  getVendedor,
} from "../../../../redux/actions";

export default function InputName({
  name,
  setName,
  corredor,
  setCorredor,
  vendedor,
  setVendedor,
  freelancer,
  setFreelancer,
  getAllLeadAPagar,
}) {
  const dispatch = useDispatch();

  const { allCorredores } = useSelector((state) => state);
  const { allVendedores } = useSelector((state) => state);
  const { allFreelancer } = useSelector((state) => state);

  useEffect(() => {
    dispatch(getCorredor());
    dispatch(getVendedor());
    dispatch(getAllProfesion());
    dispatch(getAllCategory());
    dispatch(getAllCountries());
    dispatch(getFreelancers());
  }, [dispatch]);

  const handleChangeCorredor = (event) => {
    let value = event.target.value;
    setCorredor(value);
  };

  const handleChangeVendedor = (event) => {
    let value = event.target.value;
    setVendedor(value);
  };

  const handleChangeFreelancer = (event) => {
    let value = event.target.value;
    setFreelancer(value);
  };

  const handleChangeName = (event) => {
    let value = event.target.value;
    setName(value);
  };

  const handleFilterClick = () => {
    dispatch(
      findCorredoresByNameAllInfoSeguimiento(corredor, vendedor, freelancer)
    );
  };

  const handleFilterReset = () => {
    setName("");
    setCorredor("");
    setVendedor("");
    setFreelancer("");

    dispatch(getAllLeadAPagar("", "", ""));
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
      <div className="flex gap-2 p-2">
        <div className="flex flex-col">
          <label>Lead:</label>

          <TextField
            fullWidth
            label="Nombre"
            id="Nombre"
            size="small"
            value={name}
            onChange={handleChangeName}
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
        </div>
        <div className="flex flex-col">
          <label>Corredor:</label>
          <Select
            value={corredor}
            onChange={handleChangeCorredor}
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
            <MenuItem value="">Corredor</MenuItem>
            {allCorredores.map((corredor) => (
              <MenuItem key={corredor} value={corredor}>
                {corredor}
              </MenuItem>
            ))}
          </Select>
        </div>
        <div className="flex flex-col">
          <label>Vendedor:</label>
          <Select
            value={vendedor}
            onChange={handleChangeVendedor}
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
            <MenuItem value="">Vendedor</MenuItem>
            {allVendedores.map((vendedor) => (
              <MenuItem key={vendedor} value={vendedor}>
                {vendedor}
              </MenuItem>
            ))}
          </Select>
        </div>
        <div className="flex flex-col">
          <label>Freelancer:</label>
          <Select
            value={freelancer}
            onChange={handleChangeFreelancer}
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
            <MenuItem value="">Freelancer</MenuItem>
            {allFreelancer.map((freelancer) => (
              <MenuItem key={freelancer} value={freelancer}>
                {freelancer}
              </MenuItem>
            ))}
          </Select>
        </div>
      </div>
      <div className="flex gap-5">
        <div className="flex gap-5 items-end justify-center">
          <Button
            onClick={handleFilterClick}
            variant="contained"
            sx={{
              color: "white",
              bgcolor: "#ae2dff",
              "&:hover": {
                bgcolor: "#a020f0",
              },
            }}
            size="large"
          >
            Filtrar
          </Button>
          <Button
            onClick={handleFilterReset}
            variant="outlined"
            sx={{
              color: "white",
              borderColor: "#ae2dff",
              "&:hover": {
                borderColor: "#a020f0",
              },
            }}
            size="large"
          >
            Reset
          </Button>
        </div>
      </div>
    </Box>
  );
}
