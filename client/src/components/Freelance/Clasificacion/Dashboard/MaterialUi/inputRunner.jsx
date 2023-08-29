import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { Checkbox } from "@mui/material";
import {
  getAllCategory,
  getAllCountries,
  getAllProfesion,
} from "../../../../../redux/actions";

// Componente funcional InputRunner
export default function InputRunner({
  getLeadClasificacion,
  email,
  names,
  profesion,
  category,
  country,
  marca_personal,
  setProfesion,
  setCategory,
  setCountry,
  setMarca_personal,
}) {
  const dispatch = useDispatch();
  const [check, setCheck] = useState(false);
  const [checkF, setCheckF] = useState(false);
  const [freelancer, setFreelancer] = useState("undefined");

  // Obtener datos de Redux Store mediante useSelector
  const { allProfesion } = useSelector((state) => state);
  const { allCategory } = useSelector((state) => state);
  const { allCountries } = useSelector((state) => state);

  // Efecto para cargar datos iniciales desde Redux Store
  useEffect(() => {
    dispatch(getAllProfesion());
    dispatch(getAllCategory());
    dispatch(getAllCountries());
  }, [dispatch]);

  // Funciones para manejar cambios en los campos de entrada
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

  const handleChangeNombrePropio = (event) => {
    // Cambiar el estado "marca_personal" basado en el valor del checkbox
    setMarca_personal(event.target.checked ? "SI" : "");
    setCheck(!check);
  };

  const handleChangeFreelancer = (event) => {
    // Cambiar el estado "freelancer" basado en el valor del checkbox
    setFreelancer(event.target.checked ? email : "undefined");
    setCheckF(!checkF);
  };

  // Funciones para manejar el filtrado y reseteo de datos
  const handleFilterClick = () => {
    dispatch(
      getLeadClasificacion(
        email,
        names,
        profesion,
        category,
        country,
        marca_personal,
        freelancer
      )
    );
  };

  const handleFilterReset = () => {
    setProfesion("");
    setCategory("");
    setCountry("");
    setCheck(false);
    setCheckF(false);
  };

  return (
    // Contenedor de la interfaz de usuario
    <Box
      sx={{
        // Estilos para el contenedor
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
      {/* Contenido del componente */}
      <div className="flex items-center justify-center gap-5">
        {/* Dropdown para seleccionar profesión */}
        <div className="flex flex-col">
          <label>Profesion:</label>
          <Select
            value={profesion || ""}
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
            {/* Mapear opciones de profesión desde la variable "allProfesion" */}
            {allProfesion.map((profesion) => (
              <MenuItem key={profesion} value={profesion}>
                {profesion}
              </MenuItem>
            ))}
          </Select>
        </div>
        {/* Dropdown para seleccionar categoría */}
        <div className="flex flex-col">
          <label>Categoria:</label>
          <Select
            value={category || ""}
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
            {/* Mapear opciones de categoría desde la variable "allCategory" */}
            {allCategory.map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </Select>
        </div>
        {/* Dropdown para seleccionar país */}
        <div className="flex flex-col">
          <label>Paises:</label>
          <Select
            value={country || ""}
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
            {/* Mapear opciones de país desde la variable "allCountries" */}
            {allCountries.map((country) => (
              <MenuItem key={country} value={country}>
                {country}
              </MenuItem>
            ))}
          </Select>
        </div>
        {/* Checkbox para seleccionar "marca personal" */}
        <div className="flex w-12 items-center justify-center flex-col">
          <div>
            <label>Propio:</label>
          </div>
          <div>
            <Checkbox
              id="propio"
              checked={check}
              onClick={handleChangeNombrePropio}
              size="medium"
              sx={{
                color: "#ae2dff",
                "& .MuiSvgIcon-root": {
                  fill: check && "#ae2dff",
                },
                "&:hover .MuiSvgIcon-root": {
                  fill: "#ae2dff",
                },
              }}
            />
          </div>
        </div>
        {/* Checkbox para seleccionar "freelancer" */}
        <div className="flex w-18 items-center justify-center flex-col">
          <div>
            <label>Freelancer:</label>
          </div>
          <div>
            <Checkbox
              id="freelancer"
              onClick={handleChangeFreelancer}
              size="medium"
              checked={checkF}
              sx={{
                color: "#ae2dff",
                "& .MuiSvgIcon-root": {
                  fill: check && "#ae2dff",
                },
                "&:hover .MuiSvgIcon-root": {
                  fill: "#ae2dff",
                },
              }}
            />
          </div>
        </div>
        {/* Botones para filtrar y resetear */}
        <div className="flex gap-5 items-end justify-center">
          {/* Botón para filtrar */}
          <Button
            onClick={handleFilterClick}
            variant="contained"
            style={{
              color: "white",
              borderColor: "#ae2dff",
              background: "#ae2dff",
            }}
            size="large"
          >
            Filtrar
          </Button>
          {/* Botón para resetear */}
          <Button
            onClick={handleFilterReset}
            variant="outlined"
            style={{ color: "white", borderColor: "#ae2dff" }}
            size="large"
          >
            Reset
          </Button>
        </div>
      </div>
    </Box>
  );
}
