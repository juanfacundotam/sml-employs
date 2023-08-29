// Importar las dependencias necesarias desde React y Material-UI
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllCategory,
  getAllCountries,
  getAllProfesion,
  getLeadCorredores,
} from "../../../../redux/actions";
import { Checkbox } from "@mui/material";

// Definir el componente funcional InputRunner
export default function InputRunner({
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
  // Dispatch para acceder a las acciones de Redux
  const dispatch = useDispatch();
  const [check, setCheck] = useState(false);

  // Obtener datos de los estados de Redux mediante useSelector
  const { allProfesion } = useSelector((state) => state);
  const { allCategory } = useSelector((state) => state);
  const { allCountries } = useSelector((state) => state);

  // Cargar las opciones de profesión, categoría y países al montar el componente
  useEffect(() => {
    dispatch(getAllProfesion());
    dispatch(getAllCategory());
    dispatch(getAllCountries());
  }, [dispatch]);

  // Funciones para manejar los cambios en las opciones seleccionadas
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

  // Función para manejar el cambio en la opción "Propio" (Marca personal)
  const handleChangeNombrePropio = (event) => {
    setMarca_personal(event.target.checked ? "SI" : "");
    setCheck(!check);
  };

  // Funciones para manejar los eventos de filtrado y reseteo
  const handleFilterClick = () => {
    dispatch(
      getLeadCorredores(
        email,
        names,
        profesion,
        category,
        country,
        marca_personal
      )
    );
  };

  const handleFilterReset = () => {
    setProfesion("");
    setCategory("");
    setCountry("");
    setMarca_personal("");
    setCheck(false);

    dispatch(
      getLeadCorredores(
        email,
        names,
        profesion,
        category,
        country,
        marca_personal
      )
    );
  };

  return (
    <Box
      sx={{
        // Estilos del contenedor principal
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "10px",
        width: "50%",
        height: "33px",
        color: "white",
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
      <div className="flex items-center justify-center gap-5">
        {/* Select para elegir la profesión */}
        <div className="flex flex-col">
          <label>Profesion:</label>
          <Select
            value={profesion || ""}
            onChange={handleChangeProfesion}
            label=""
            id="profesion"
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
        {/* Select para elegir la categoría */}
        <div className="flex flex-col">
          <label>Categoria:</label>
          <Select
            value={category || ""}
            onChange={handleChangeCategory}
            label=""
            id="categoria"
            name="categoria"
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
        {/* Select para elegir el país */}
        <div className="flex flex-col">
          <label>Paises:</label>
          <Select
            value={country || ""}
            onChange={handleChangeCountries}
            label=""
            id="paises"
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
        {/* Checkbox para seleccionar la opción "Propio" */}
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
        {/* Botones para aplicar filtros y resetear */}
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
