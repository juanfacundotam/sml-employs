import React from "react";
import { useSelector } from "react-redux";
import CustomizedButtons from "./Material UI/loginButton";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import axios from "axios"

export default function Login() {
  const navigate = useNavigate();
  const access = useSelector((state) => state.isEmployee);
  const clevelLanding = async () => {
    await axios.put("/lead/limpieza")
    navigate("/register");
  };
  return (
    <div className="flex flex-col gap-5 h-screen w-screen justify-center items-center">
      <motion.img
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
        src="https://i.postimg.cc/yYvQ7m22/logosml.webp"
        className="w-96"
      />

      <a className="" href="/protected">
        <CustomizedButtons />
      </a>

      <Button
        onClick={() => clevelLanding()}
        variant="outlined"
        sx={{
          color: "white",
          borderColor: "#ae2dff",
          "&:hover": {
            borderColor: "#a020f0",
          },
        }}
      >
        Registrate Como Usuario
      </Button>
      <div className="w-96">
        <p>Acceda y regístrese utilizando su cuenta de Google.</p>
        <p>
          Una vez registrado, diríjase a esta pestaña e inicie sesión con dicha
          cuenta para obtener acceso a todas las funcionalidades de la
          aplicación.
        </p>
      </div>
    </div>
  );
}
