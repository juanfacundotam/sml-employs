import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import { Checkbox } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getAllCountries, getAllProfesion } from "../../../../../redux/actions";

export default function InputName({
  body,
  getLeadCheckedInactive5,
  emailAddress,
  profesion,
  setProfesion,
  country,
  setCountry,
  level,
  setLevel,
  status,
  setStatus,
  freelancer,
  setFreelancer,
  onChangeName,
  filterName,
  loaderFuncion,
}) {
  const dispatch = useDispatch();
  const [checkFreelancer, setCheckFreelancer] = useState(false);

  const { allProfesion } = useSelector((state) => state);
  const { allCountries } = useSelector((state) => state);

  useEffect(() => {
    loaderFuncion(true);
    dispatch(getAllProfesion());
    dispatch(getAllCountries()).then(() => {
      loaderFuncion(false);
    });
  }, [dispatch]);

  const handleChangeProfesion = (event) => {
    let value = event.target.value;
    setProfesion(value);
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

  //AGREGADO
  const handleChangeFreelancer = (event) => {
    setFreelancer(event.target.checked ? emailAddress : "");
    setCheckFreelancer(!checkFreelancer);
  };

  const handleFilterClick = () => {
    loaderFuncion(true);
    dispatch(
      getLeadCheckedInactive5(
        body,
        profesion,
        country,
        status,
        level,
        freelancer
      )
    ).then(() => {
      loaderFuncion(false);
    });
  };

  const handleFilterReset = () => {
    loaderFuncion(true);
    setCountry("");
    setProfesion("");
    setLevel("");
    setStatus("");
    setFreelancer("");
    setCheckFreelancer(false);
    dispatch(getLeadCheckedInactive5(body, "", "", "", "", "")).then(() => {
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
      <div className="flex gap-5">
      <div className="flex flex-col w-52 mr-5">
        <label>Nombre:</label>
                  <input
                    onChange={onChangeName}
                    value={filterName}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md  focus:ring-blue-500 focus:border-blue-500 block w-56 h-10 p-1 dark:bg-[#222131] dark:border-[#fafafa] dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Nombre"
                  />
                </div>
        <div className="flex flex-col w-28">
          <label>Profesión:</label>
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
            <MenuItem value="">Profesión</MenuItem>
            {allProfesion.map((profesion, index) => (
              <MenuItem key={index} value={profesion}>
                {profesion}
              </MenuItem>
            ))}
          </Select>
        </div>

        <div className="flex flex-col w-28">
          <label>Países:</label>
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
            <MenuItem value=""></MenuItem>
            {allCountries.map((country, index) => (
              <MenuItem key={index} value={country}>
                {country}
              </MenuItem>
            ))}
          </Select>
        </div>

        <div className="flex flex-col w-28">
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
            <MenuItem value="s">
              <em>None</em>
            </MenuItem>
            <MenuItem value="1">1</MenuItem>
            <MenuItem value="2">2</MenuItem>
            <MenuItem value="aleatorio">Aleatorio</MenuItem>
          </Select>
        </div>

        <div className="flex flex-col w-28">
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
            <MenuItem value="Contactado">Contactado</MenuItem>
            <MenuItem value="En proceso">En proceso</MenuItem>
            <MenuItem value="Agenda llamada">Agenda llamada</MenuItem>
            <MenuItem value="En proceso">En proceso</MenuItem>
            <MenuItem value="No responde">Sin contestar</MenuItem>
          </Select>
        </div>

        <div className="flex w-18 items-center justify-center flex-col">
          <div>
            <label>Freelancer:</label>
          </div>
          <div>
            <Checkbox
              id="freelancer"
              checked={checkFreelancer}
              onClick={handleChangeFreelancer}
              size="medium"
              sx={{
                color: "#ae2dff",
                "& .MuiSvgIcon-root": {
                  fill: checkFreelancer && "#ae2dff",
                },
                "&:hover .MuiSvgIcon-root": {
                  fill: "#ae2dff",
                },
              }}
            />
          </div>
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
