import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import { Checkbox } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllCountriesFreelance,
  getAllProfesionFreelance,
} from "../../../../../redux/actions";

export default function InputName({
  body,
  getLeadCheckedFreelance,
  emailAddress,
  profesion,
  setProfesion,
  country,
  setCountry,
  level,
  setLevel,
  freelancer,
  setFreelancer,
  loaderFuncion,
}) {
  const dispatch = useDispatch();

  const [checkFreelancer, setCheckFreelancer] = useState(true);

  const { allProfesionFreelance } = useSelector((state) => state);
  const { allCountriesFreelance } = useSelector((state) => state);

  useEffect(() => {
    loaderFuncion(true)
    dispatch(getAllCountriesFreelance(emailAddress));
    dispatch(getAllProfesionFreelance(emailAddress)).then(() => {
      loaderFuncion(false)
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

  const handleChangeFreelancer = (event) => {
    setFreelancer(event.target.checked ? emailAddress : "");
    setCheckFreelancer(!checkFreelancer);
  };

  const handleFilterClick = () => {
    loaderFuncion(true)
    dispatch(
      getLeadCheckedFreelance(body, profesion, country, level, freelancer)
    ).then(() => {
      loaderFuncion(false)
    });
  };

  const handleFilterReset = () => {
    loaderFuncion(true)
    dispatch(getLeadCheckedFreelance(body, "", "")).then(() => {
      loaderFuncion(false)
    });
    setCountry("");
    setProfesion("");
    setLevel("");
    setFreelancer("");
    setCheckFreelancer(false);
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
        <div className="flex flex-col w-56">
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
            {/* <MenuItem value="">Profesión</MenuItem> */}
            {allProfesionFreelance.map((profesion, index) => (
              <MenuItem key={index} value={profesion}>
                {profesion}
              </MenuItem>
            ))}
          </Select>
        </div>

        <div className="flex flex-col w-36">
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
            {allCountriesFreelance.map((country, index) => (
              <MenuItem key={index} value={country}>
                {country}
              </MenuItem>
            ))}
          </Select>
        </div>

        <div className="flex flex-col w-36">
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
              <em></em>
            </MenuItem>
            <MenuItem value="0">0</MenuItem>
            <MenuItem value="1">1</MenuItem>
            <MenuItem value="2">2</MenuItem>
            <MenuItem value="aleatorio">Aleatorio</MenuItem>
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
