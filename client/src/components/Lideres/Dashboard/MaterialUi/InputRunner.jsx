import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import {
  findCorredoresByNameAllInfo,
  findFreelancerByNameAllInfo,
  getAllCategory,
  getAllCountries,
  getAllProfesion,
  getCorredor,
  getFreelancers,
  getLeadCheckedFreelancer,
  getVendedor,
} from "../../../../redux/actions";
import { Checkbox } from "@mui/material";
import { AiOutlineQuestionCircle } from "react-icons/ai";

export default function InputName({ setCurrentPage, loaderFuncion }) {
  const dispatch = useDispatch();
  const [freelancer, setFreelancer] = useState("");
  const [fromDay, setFromDay] = useState("");
  const [toDay, setToDay] = useState("");
  const [profesion, setProfesion] = useState("");
  const [category, setCategory] = useState("");
  const [country, setCountry] = useState("");
  const [level, setLevel] = useState("");
  const [status, setStatus] = useState("");
  const [checked, setChecked] = useState("");
  const [descargados, setDescargados] = useState(true);

  const { allFreelancer } = useSelector((state) => state);
  const { allProfesion } = useSelector((state) => state);
  const { allCategory } = useSelector((state) => state);
  const { allCountries } = useSelector((state) => state);

  useEffect(() => {
    loaderFuncion(true);
    dispatch(getFreelancers());
    dispatch(getAllProfesion());
    dispatch(getAllCategory());
    dispatch(getAllCountries());
  }, [dispatch]);

  const handleChangeCorredor = (event) => {
    let value = event.target.value;
    setFreelancer(value);
  };

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

    if (value === "Sin clasificar") {
      setChecked(false);
    } else {
      setChecked(true);
    }
  };

  const handleChangeDescargados = (event) => {
    setDescargados(event.target.checked ? false : true);
  };

  const handleFilterClick = () => {
    loaderFuncion(true);
    dispatch(
      findFreelancerByNameAllInfo(
        freelancer,
        fromDay,
        toDay,
        profesion,
        country,
        category,
        level,
        status,
        checked,
        descargados
      )
    ).then(() => {
      loaderFuncion(false);
    });
    setCurrentPage(1);
  };

  const handleFilterReset = () => {
    setFreelancer("");
    setFromDay("");
    setToDay("");
    setProfesion("");
    setCategory("");
    setCountry("");
    setLevel("");
    setStatus("");
    setChecked("");

    dispatch(getLeadCheckedFreelancer());
    setCurrentPage(1);
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
          <label>Freelancer:</label>
          <Select
            value={freelancer}
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
            <MenuItem value="">Freelancer</MenuItem>
            {allFreelancer.map((corredor) => (
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
            {allProfesion.map((profesion) => (
              <MenuItem key={profesion} value={profesion}>
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
            {allCategory.map((category) => (
              <MenuItem key={category} value={category}>
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
            {allCountries.map((country) => (
              <MenuItem key={country} value={country}>
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
            <MenuItem value="">Level</MenuItem>
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
            <MenuItem value="Sin clasificar">Sin clasificar</MenuItem>
            <MenuItem value="Sin contactar">Sin contactar</MenuItem>
            <MenuItem value="En Proceso">En Proceso</MenuItem>
            <MenuItem value="Contactado">Contactado</MenuItem>
            <MenuItem value="Agenda llamada">Agenda llamada</MenuItem>
            <MenuItem value="Contratado">Contratado</MenuItem>
            <MenuItem value="A Pagar">A Pagar</MenuItem>
            <MenuItem value="Rechazado">Rechazado</MenuItem>
            <MenuItem value="No responde">No responde</MenuItem>
            {/* <MenuItem value="incidencia">incidencia</MenuItem> */}
          </Select>
        </div>
        <div className="flex w-36 items-center justify-center flex-col">
          <label className="mr-1">No descargados:</label>
          <div className="flex  items-center ">
            <Checkbox
              id="descargado"
              onClick={handleChangeDescargados}
              size="medium"
            />
            <div className="relative h-fit w-fit group flex justify-center items-center">
              <p className="w-32 h-fit  p-1 hidden absolute text-black -top-6 group-hover:block bg-white z-10">
                Si marcas este checkbox traera los leads no descargados
              </p>
              <AiOutlineQuestionCircle className="text-white" />
            </div>
          </div>
        </div>
        <div className="flex gap-5 items-end justify-center ">
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
