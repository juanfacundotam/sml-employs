import React, { useEffect, useState } from "react";
import axios from "axios";
import { IoEyeOffSharp, IoEyeSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { getAllClientes } from "../../redux/actions";
import logo from "../../Assets/smllogo.webp";
export default function RegisterDesktop({ handleOpenRegister, refeerred }) {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [referred, setReferred] = useState("");
  const [showView, setShowView] = useState(false);
  const { allClientes } = useSelector((state) => state);
  const [errors, setErrors] = useState({
    username: "",
    name: "",
    password: "",
    email: "",
    validate: false,
  });
  const dispatch = useDispatch();
  const handlePasswordView = () => {
    setShowView(!showView);
  };
  useEffect(() => {
    const fetchData = async () => {
      dispatch(getAllClientes());
    };
    fetchData();
  }, [dispatch]);
  useEffect(() => {
    setReferred(refeerred);
  }, [allClientes]);

  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  };
  const validateEmail = (email) => {
    const clientEmailVerify =
      allClientes && allClientes.some((client) => client.email === email);
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!emailRegex.test(email)) {
      return "Por favor, ingresa un correo electrónico válido";
    }
    if (clientEmailVerify) {
      return "Este usario ya esta registrado, intente con otro!";
    }
    return "";
  };
  const validatePassword = (password) => {
    const uppercaseRegex = /[A-Z]/;
    const numberRegex = /[0-9]/;
    if (!uppercaseRegex.test(password) || !numberRegex.test(password)) {
      return "La contraseña debe contener al menos una letra mayúscula y un número";
    }
    if (password.length < 8 || password.length > 16) {
      return "La contraseña debe tener entre 8 y 16 caracteres";
    }
    return "";
  };
  const validateRegister = () => {
    let updateErrors = { ...errors };
    if (name === "") {
      updateErrors.name = "Por favor, ingresa un nombre";
    }
    if (name !== "") {
      updateErrors.name = "";
    }
    if (username === "") {
      updateErrors.username = "Por favor, ingresa un usuario";
    }
    if (username !== "") {
      updateErrors.username = "";
    }
    if (password === "") {
      updateErrors.password = "Por favor, ingresa una contraseña";
    } else {
      updateErrors.password = validatePassword(password);
    }
    if (email === "") {
      updateErrors.email = "Por favor, ingresa un correo electrónico";
    } else {
      updateErrors.email = validateEmail(email);
    }
    if (
      updateErrors.username === "" &&
      updateErrors.name === "" &&
      updateErrors.password === "" &&
      updateErrors.email === ""
    ) {
      setErrors({ ...updateErrors, validate: true });
    } else {
      setErrors(updateErrors);
    }
  };
  const newClient = async () => {
    await axios.post("/clientes/new", body);
    setUsername("");
    setEmail("");
    setName("");
    setPassword("");
    handleOpenRegister();
  };
  const serRef = async () => {
    try {
      await axios.put("/clientes/referred", body);
    } catch (error) {}
  };
  let body = {};
  const handleSubmit = (e) => {
    e.preventDefault();
    validateRegister();
    if (errors.validate) {
      body = {
        username,
        name,
        password,
        email,
        photo: "",
        rol: "masivo",
        referred: referred ?? "",
      };
      newClient();
      serRef();
    } else {
    }
  };

  return (
    <div className="flex  flex-row justify-evenly items-center w-screen h-screen">
      <form
        className="flex flex-col w-3/12 gap-y-4"
        onSubmit={handleSubmit}
        onChange={validateRegister}
      >
        <div className="flex flex-col">
          <label className="font-bold ml-2 mb-2 text-white" htmlFor="">
            Usuario:
          </label>
          <input
            className="rounded-md bg-[#D9D9D9] bg-opacity-25 h-10 pl-2 text-white text-opacity-100 placeholder:text-white placeholder:text-opacity-75"
            type="text"
            value={username}
            onChange={(event) => {
              setUsername(event.target.value);
            }}
            placeholder="Ingresar Usuario"
          />
          <span className="text-red-400 text-[12px] text-center">
            {errors.username}
          </span>
        </div>
        <div className="flex flex-col">
          <label className="font-bold ml-2 text-white" htmlFor="">
            Nombre:
          </label>
          <input
            className="rounded-md bg-[#D9D9D9] bg-opacity-25 h-10 pl-2 text-white text-opacity-100 placeholder:text-white placeholder:text-opacity-75"
            type="text"
            value={name}
            onChange={(event) => {
              setName(event.target.value);
            }}
            placeholder="Ingresar Nombre"
          />
          <span className="text-red-400 text-[12px] text-center">
            {errors.name}
          </span>
        </div>
        <div className="flex flex-col">
          <label className="font-bold ml-2 text-white">Contraseña:</label>
          <div className="flex flex-row rounded-md bg-[#D9D9D9] h-10 justify-between items-center text-white text-opacity-100 placeholder:text-white placeholder:text-opacity-75 bg-opacity-25">
            <input
              className="rounded-md bg-[#D9D9D9] h-10 pl-2 w-full text-white text-opacity-100 placeholder:text-white placeholder:text-opacity-75 bg-opacity-0"
              type={showView === false ? "password" : "text"}
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
              }}
              placeholder="Ingresar Contraseña"
            />
            {showView === false ? (
              <IoEyeSharp
                className="pr-2 text-[2rem] "
                onClick={handlePasswordView}
              />
            ) : (
              <IoEyeOffSharp
                className="pr-2 text-[2rem] h-10 "
                onClick={handlePasswordView}
              />
            )}
          </div>
          <span className="text-red-400 text-[12px] text-center">
            {errors.password}
          </span>
        </div>
        <div className="flex flex-col">
          <label className="font-bold ml-2 text-white" htmlFor="">
            Correo Electronico:
          </label>
          <input
            className="rounded-md bg-[#D9D9D9] h-10 pl-2 text-white text-opacity-100 placeholder:text-white placeholder:text-opacity-75 bg-opacity-25"
            type="email"
            value={email}
            onChange={handleChangeEmail}
            placeholder="Ingresar Correo"
          />
          <span className="text-red-400 text-[12px] text-center">
            {errors.email}
          </span>
        </div>
        {refeerred ? (
          <div className="flex flex-col">
            <label className="font-bold ml-2 text-white" htmlFor="">
              Referido:
            </label>
            <input
              className="rounded-md bg-[#D9D9D9] h-10 pl-2 text-white text-opacity-100 placeholder:text-white placeholder:text-opacity-75 bg-opacity-25 "
              type="text"
              value={referred}
              onChange={(event) => {
                setReferred(event.target.value);
              }}
              placeholder="Ingresar Nombre"
              readOnly
            />
          </div>
        ) : null}
        <div className="flex flex-col items-center gap-y-4 mt-4">
          <button
            className="bg-[#07a1f8] rounded-2xl px-3 text-black"
            type="submit"
          >
            Registrarse
          </button>
        </div>
      </form>
      <hr className="border-2 border-[#8F00FF] h-4/6 w-0 mx-4 py-52 rounded-2xl" />
      <img src={logo} alt="logo" className="w-[350px] h-[350px]" />
    </div>
  );
}
