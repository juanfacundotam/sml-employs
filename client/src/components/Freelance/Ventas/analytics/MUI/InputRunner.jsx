import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { useUser } from "@clerk/clerk-react";
import {
  getAllProfesion,
  getAllCountries,
  getAllCategory,
  findVendedoresByNameAllInfo,
} from "../../../../../redux/actions";

export default function InputRunner({
  getVendedorAllLeads,
  emailUser,
  fromDay,
  setFromDay,
  toDay,
  setToDay,
  profesion,
  setProfesion,
  category,
  setCategory,
  country,
  setCountry,
  level,
  setLevel,
  status,
  setStatus,
  onChangeName,
  filterName,
  loaderFuncion,
}) {
  const dispatch = useDispatch();

  const user = useUser().user;
  const mail = user?.emailAddresses[0]?.emailAddress;

  localStorage.setItem("email", mail);
  let email = localStorage.getItem("email");

  const { allProfesion } = useSelector((state) => state);
  const { allCategory } = useSelector((state) => state);
  const { allCountries } = useSelector((state) => state);

  useEffect(() => {
    loaderFuncion(true);
    dispatch(getAllProfesion());
    dispatch(getAllCategory());
    dispatch(getAllCountries()).then(() => {
      loaderFuncion(false);
    });
  }, [dispatch]);

  const handleFromDay = (event) => {
    setFromDay(event.target.value);
  };
  const handleToDay = (event) => {
    setToDay(event.target.value);
  };

  const handleChangeProfesion = (event) => {
    let value = event.target.value;
    setProfesion(value);
  };

  const handleChangeCategory = (event) => {
    let value = event.target.value;
    setCategory(value);
  };

  const handleChangeCountries = (event) => {
    let value = event.target.value;
    setCountry(value);
  };

  const handleChangeLevel = (event) => {
    let value = event.target.value;
    setLevel(value);
  };

  const handleChangeStatus = (event) => {
    let value = event.target.value;
    setStatus(value);
  };

  const handleFilterClick = () => {
    loaderFuncion(true);
    dispatch(
      findVendedoresByNameAllInfo(
        email,
        fromDay,
        toDay,
        profesion,
        country,
        category,
        level,
        status
      )
    ).then(() => {
      loaderFuncion(false);
    });
  };

  const handleFilterReset = () => {
    loaderFuncion(true);
    setFromDay("");
    setToDay("");
    setProfesion("");
    setCategory("");
    setCountry("");
    setLevel("");
    setStatus("");
    dispatch(getVendedorAllLeads(emailUser, "", "", "", "", "", "", "")).then(() => {
      loaderFuncion(false);
    });
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
      <div className="flex flex-col w-52 mr-5">
        <label>Nombre:</label>
                  <input
                    onChange={onChangeName}
                    value={filterName}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md  focus:ring-blue-500 focus:border-blue-500 block w-56 h-10 p-1 dark:bg-[#222131] dark:border-[#fafafa] dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Nombre"
                  />
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
      </div>

      <div className="flex gap-5">
        <div className="flex flex-col">
          <label>Profesion:</label>
          <Select
            value={profesion}
            onChange={handleChangeProfesion}
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
            <MenuItem value="">Profesion</MenuItem>
            {allProfesion.map((profesion, index) => (
              <MenuItem key={index} value={profesion}>
                {profesion}
              </MenuItem>
            ))}
          </Select>
        </div>

        <div className="flex flex-col">
          <label>Categoria:</label>
          <Select
            value={category}
            onChange={handleChangeCategory}
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
            <MenuItem value="">Categoria</MenuItem>
            {allCategory.map((category, index) => (
              <MenuItem key={index} value={category}>
                {category}
              </MenuItem>
            ))}
          </Select>
        </div>

        <div className="flex flex-col">
          <label>Paises:</label>
          <Select
            value={country}
            onChange={handleChangeCountries}
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
            <MenuItem value="">Pais</MenuItem>
            {allCountries.map((country, index) => (
              <MenuItem key={index} value={country}>
                {country}
              </MenuItem>
            ))}
          </Select>
        </div>

        <div className="flex flex-col">
          <label>Nivel:</label>
          <Select
            value={level}
            onChange={handleChangeLevel}
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
            <MenuItem value="">Nivel</MenuItem>
            <MenuItem value="0">0</MenuItem>
            <MenuItem value="1">1</MenuItem>
            <MenuItem value="2">2</MenuItem>
            <MenuItem value="incidencia">Incidencia</MenuItem>
          </Select>
        </div>

        <div className="flex flex-col">
          <label>Estado:</label>
          <Select
            value={status}
            onChange={handleChangeStatus}
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
            <MenuItem value="">Estado</MenuItem>
            <MenuItem value="Contactado">Contactado</MenuItem>
            <MenuItem value="En proceso">En proceso</MenuItem>
            <MenuItem value="Agenda llamada">Agenda llamada</MenuItem>
            <MenuItem value="Contratado">Contratado</MenuItem>
            <MenuItem value="A pagar">A pagar</MenuItem>
            <MenuItem value="Rechazado">Rechazado</MenuItem>
            <MenuItem value="No responde">Sin contestar</MenuItem>
          </Select>
        </div>

        <div className="flex gap-5 items-end justify-center">
          <Button
            onClick={handleFilterClick}
            style={{
              color: "white",
              borderColor: "#ae2dff",
              background: "#ae2dff",
            }}
            variant="contained"
            size="large"
          >
            Filtrar
          </Button>
          <Button
            onClick={handleFilterReset}
            style={{ color: "white", borderColor: "#ae2dff" }}
            variant="outlined"
            size="large"
          >
            Reset
          </Button>
        </div>
      </div>
    </Box>
  );
}
