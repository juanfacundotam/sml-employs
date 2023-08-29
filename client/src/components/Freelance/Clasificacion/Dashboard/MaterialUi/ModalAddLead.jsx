import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import React, { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import {
  getAllCategory,
  getAllFreelancer,
  getAllProfesion,
} from "../../../../../redux/actions";
import axios from "axios";
import { red } from "@mui/material/colors";

// Estilos personalizados para el modal
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  boxShadow: 24,
  textAlign: "center",
  color: "white",
  pt: 2,
  px: 4,
  pb: 3,
  borderRadius: "20px",
};

// Componente funcional ChildModal
export default function ChildModal({
  email,
  AddLeadError,
  AddLeads,
  AddLeadsIncomplete,
}) {
  const { freelancer, allCategory, allProfesion } = useSelector(
    (state) => state
  );
  const [OneFreelancer, setOneFreelancer] = useState("");
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  const [countries, setCountries] = useState([]);
  const [errors, setErrors] = useState({
    nombre: "",
    pais: "",
    ciudad: "",
    web: "",
    email: "",
    telefono: "",
    categoria: "",
    profesion: "",
  });
  const [values, setValues] = useState({
    nombre: "",
    pais: "",
    ciudad: "",
    web: "",
    email: "",
    telefono: "",
    categoria: "",
    profesion: "",
  });

  // Efecto para obtener datos iniciales desde Redux Store y la API de países
  useEffect(() => {
    dispatch(getAllFreelancer());
    dispatch(getAllCategory());
    dispatch(getAllProfesion());
    fetch("https://restcountries.com/v3.1/all")
      .then((response) => response.json())
      .then((data) => {
        const countryNames = data.map((country) => country.name.common);
        const sortedCountries = countryNames.sort();
        setCountries(sortedCountries);
      })
      .catch();
  }, [dispatch]);

  // Efecto para obtener el objeto de freelancer que coincide con el email proporcionado
  useEffect(() => {
    const free =
      freelancer && freelancer.filter((free) => free.email === email);
    setOneFreelancer(free);
  }, [freelancer, email]);

  // Funciones para abrir y cerrar el modal
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  // Funciones de validación para email y URL
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };
  const validateURL = (url) => {
    const regex = /^(ftp|http|https):\/\/[^ "]+$/;
    return regex.test(url);
  };

  // Validaciones para campos de entrada de email y URL
  const validaciones = () => {
    if (values.email !== "") {
      setErrors((prevErrors) => {
        const updatedErrors = { ...prevErrors };
        if (!validateEmail(values.email)) {
          updatedErrors.email = "Ingrese un email válido";
        } else {
          updatedErrors.email = "";
        }
        return updatedErrors;
      });
    }
    if (values.web !== "") {
      setErrors((prevErrors) => {
        const updatedErrors = { ...prevErrors };
        if (!validateURL(values.web)) {
          updatedErrors.web = "Ingrese una URL válida";
        } else {
          updatedErrors.web = "";
        }
        return updatedErrors;
      });
    }
  };

  // Efecto para realizar validaciones cuando cambia el valor de los campos de entrada
  useEffect(() => {
    validaciones();
  }, [values]);

  // Función para manejar cambios en los campos de entrada
  const handleChange = (event) => {
    const { id, value } = event.target;
    setValues((prevValues) => ({
      ...prevValues,
      [id]: value,
    }));
  };

  // Función para manejar el envío del formulario para agregar un nuevo cliente
  const handleSubmitAdd = async (event) => {
    event.preventDefault();
    const body = {
      name: values.nombre,
      category: values.categoria,
      province: values.pais,
      country: values.pais,
      city: values.ciudad,
      email: values.email,
      url: values.web,
      telephone: values.telefono,
      checked: false,
      view: false,
      profesion: values.profesion,
      corredor: OneFreelancer && OneFreelancer[0].email,
      corredor_name: OneFreelancer && OneFreelancer[0].name,
      instagra: "",
      level: "",
      freelancer: true,
      vendedor: OneFreelancer && OneFreelancer[0].email,
      vendedor_name: OneFreelancer && OneFreelancer[0].name,
      from: OneFreelancer && OneFreelancer[0].email,
      status: "Sin contactar",
      marca_personal: "No",
    };

    if (
      values.nombre === "" ||
      values.pais === "" ||
      values.web === "" ||
      values.email === "" ||
      values.telefono === "" ||
      values.profesion === "" ||
      values.categoria === ""
    ) {
      AddLeadsIncomplete();
    } else {
      if (
        errors.nombre !== "" ||
        errors.pais !== "" ||
        errors.ciudad !== "" ||
        errors.web !== "" ||
        errors.email !== "" ||
        errors.telefono !== "" ||
        errors.profesion !== "" ||
        errors.categoria !== ""
      ) {
        AddLeadError();
      } else {
        try {
          await axios.post("/lead/new", body);
          setValues({
            nombre: "",
            pais: "",
            ciudad: "",
            web: "",
            email: "",
            telefono: "",
            categoria: "",
            profesion: "",
          });
          setOpen(false);
          AddLeads();
        } catch (error) {
          AddLeadError();
        }
      }
    }
  };

  // Función para limpiar los campos del formulario
  const handleClean = () => {
    setValues({
      nombre: "",
      pais: "",
      ciudad: "",
      web: "",
      email: "",
      telefono: "",
      categoria: "",
      profesion: "",
    });
  };

  return (
    <React.Fragment>
      <ToastContainer />
      <Button
        variant="contained"
        style={{
          color: "white",
          borderColor: "#ae2dff",
          background: "#ae2dff",
        }}
        onClick={handleOpen}
      >
        NUEVO CLIENTE
      </Button>
      {/* Modal para agregar nuevo cliente */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
        BackdropProps={{
          sx: {
            backgroundColor: "rgba(00, 00, 00, 0.9)",
          },
        }}
      >
        <Box
          sx={{
            ...style,
            width: "30%",
            backgroundColor: "#39394b",
            height: "800px",
          }}
        >
          <div className="flex flex-col gap-5 px-1 py-8 h-full w-full justify-center items-center">
            <h2 className="font-extrabold text-white text-24 mb-8">
              Añadir clientes!
            </h2>
            {/* Formulario para agregar nuevo cliente */}
            <form className="flex flex-col " onSubmit={handleSubmitAdd}>
              <div className="flex flex-col gap-3">
                <p>(*)Campos obligatorios</p>
                {/* Campos de entrada */}
                <div className="flex  h-10  items-center  px-3 gap-x-2">
                  <label className="w-24 text-left">*Nombre: </label>
                  <input
                    type="text"
                    id="nombre"
                    placeholder="Ingrese el nombre del nuevo cliente"
                    className=" bg-transparent w-full rounded-lg pl-3 h-full border border-white "
                    value={values.nombre}
                    onChange={(event) => handleChange(event)}
                  />
                </div>
                <div className="flex  h-10  items-center  px-3 gap-x-2">
                  <label className="w-24 text-left">*Profesion: </label>
                  <select
                    type="text"
                    id="profesion"
                    className={
                      values.profesion !== ""
                        ? "bg-transparent w-full rounded-lg pl-3 h-full border border-white "
                        : "bg-transparent w-full rounded-lg pl-3 h-full border border-white text-gray-400"
                    }
                    value={values.profesion}
                    onChange={(event) => handleChange(event)}
                  >
                    <option value="" disabled>
                      Seleccione una Profesion del cliente
                    </option>
                    {allProfesion &&
                      allProfesion.map((profesion) => (
                        <option
                          value={profesion}
                          key={profesion}
                          className="text-black"
                        >
                          {profesion}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="flex  h-10  items-center  px-3 gap-x-2">
                  <label className="w-24 text-left">*Categoría: </label>
                  <select
                    type="text"
                    id="categoria"
                    className={
                      values.categoria !== ""
                        ? "bg-transparent w-full rounded-lg pl-3 h-full border border-white "
                        : "bg-transparent w-full rounded-lg pl-3 h-full border border-white text-gray-400"
                    }
                    value={values.categoria}
                    onChange={(event) => handleChange(event)}
                  >
                    <option value="" disabled>
                      Seleccione una categoría del cliente
                    </option>
                    {allCategory &&
                      allCategory.map((category) => (
                        <option
                          value={category}
                          key={category}
                          className="text-black"
                        >
                          {category}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="flex  h-10  items-center  px-3 gap-x-2">
                  <label className="w-24 text-left">*Pais: </label>
                  <select
                    id="pais"
                    className={
                      values.pais !== ""
                        ? "bg-transparent w-full rounded-lg pl-3 h-full border border-white "
                        : "bg-transparent w-full rounded-lg pl-3 h-full border border-white text-gray-400"
                    }
                    value={values.pais}
                    onChange={(event) => handleChange(event)}
                  >
                    <option value="" disabled>
                      Seleccione el país del cliente
                    </option>
                    {countries.map((country) => (
                      <option
                        value={country}
                        key={country}
                        className="text-black"
                      >
                        {country}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex  h-10  items-center  px-3 gap-x-2">
                  <label className="w-24 text-left">Ciudad: </label>
                  <input
                    id="ciudad"
                    type="text"
                    placeholder="Ingrese la ciudad de el cliente"
                    className=" bg-transparent w-full rounded-lg pl-3 h-full border border-white "
                    value={values.ciudad}
                    onChange={(event) => handleChange(event)}
                  />
                </div>
                <div className="flex  h-10  items-center  px-3 gap-x-2">
                  <label className="w-24 text-left">*Web: </label>
                  <input
                    id="web"
                    type="text"
                    placeholder="Ingrese el sitio web"
                    className=" bg-transparent w-full rounded-lg pl-3 h-full border border-white "
                    value={values.web}
                    onChange={(event) => handleChange(event)}
                  />
                </div>
                {errors.web !== "" && <span>{errors.web}</span>}
                <div className="flex  h-10  items-center  px-3 gap-x-2">
                  <label className="w-24 text-left">*Email: </label>
                  <input
                    id="email"
                    type="text"
                    placeholder="Ingrese el email del cliente"
                    className=" bg-transparent w-full rounded-lg pl-3 h-full border border-white "
                    value={values.email}
                    onChange={(event) => handleChange(event)}
                  />
                </div>
                {errors.email !== "" && <span>{errors.email}</span>}
                <div className="flex h-10  items-center  px-3 gap-x-2">
                  <label className="w-24 text-left">*Telefono: </label>
                  <input
                    id="telefono"
                    type="number"
                    placeholder="Ingrese numero de Telefono del cliente"
                    className=" bg-transparent w-full rounded-lg pl-3 h-full border border-white text-white"
                    value={values.telefono}
                    onChange={(event) => handleChange(event)}
                  />
                </div>
              </div>
              <div className="flex justify-around mt-10">
                <Button variant="contained" type="submit" sx={{}}>
                  AGREGAR
                </Button>
              </div>
            </form>
            {/* Botón para limpiar los campos del formulario */}
            <Button
              variant="contained"
              onClick={handleClean}
              sx={{
                backgroundColor: "red",
                width: "fit-content",
                opacity: 0.7,
                "&:hover": {
                  backgroundColor: "red",
                  opacity: 1,
                },
              }}
            >
              LIMPIAR
            </Button>
          </div>
        </Box>
      </Modal>
    </React.Fragment>
  );
}
