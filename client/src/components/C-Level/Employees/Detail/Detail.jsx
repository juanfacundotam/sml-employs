import React, { useState } from "react";
import LeadAsigned from "../TableEmployees/MaterialUi/LeadAsigned";
import { Button } from "@mui/material";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Profesion from "./MUI/Profesion";

function Detail({ cardEmail }) {
  const [loading, setLoading] = useState(false);
  const [leadAsigned, setLeadAsigned] = useState(0);
  const [profesion, setProfesion] = useState("");
  const [country, setCountry] = useState("");

  const okLeads = (message) => {
    toast.success(`${message}`, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };
  const almostLeads = (message) => {
    toast.warning(`${message}`, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };
  const errorLeads = (message) => {
    toast.error(`${message}`, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  const asignar = async () => {
    setLoading(true);

    const startTime = performance.now();

    if (axios.defaults.baseURL === "https://sml-app.com/api") {
      const response = await axios.get(
        `https://apisml.onrender.com/freelance?freelance=${cardEmail.name}&email=${cardEmail.email}&num_leads=${leadAsigned}&profesion=${profesion}&country=${country}`
      );
      if (response.data.message === "Carga completa de leads") {
        okLeads(response.data.message);
      } else if (
        response.data.message === "No hay leads con la profesion solicitada"
      ) {
        errorLeads(response.data.message);
      } else {
        almostLeads(response.data.message);
      }
    } else if (
      axios.defaults.baseURL === "http://localhost:3001/api" ||
      axios.defaults.baseURL === "https://smlapp.onrender.com/api"
    ) {
      const response = await axios.get(
        `https://apisml.onrender.com/freelance_desarrollo?freelance=${cardEmail.name}&email=${cardEmail.email}&num_leads=${leadAsigned}&profesion=${profesion}&country=${country}`
      );
      if (response.data.message === "Carga completa de leads") {
        okLeads(response.data.message);
      } else if (
        response.data.message === "No hay leads con la profesion solicitada"
      ) {
        errorLeads(response.data.message);
      } else {
        almostLeads(response.data.message);
      }
    }

    const endTime = performance.now();
    const duration = endTime - startTime;


    setLoading(false);
  };

  return (
    <div className="flex bg-slate-700 justify-start items-center w-4/12 flex-col">
      {cardEmail ? (
        <div className="w-10/12">
          <div className="h-1/4 justify-center items-center text-center flex flex-col w-full gap-2 relative">
            <div className="bg-emerald-700 w-20 h-20 rounded-full flex">
              <img
                src={cardEmail && cardEmail.photo}
                alt="avatar"
                className="rounded-full"
              />
            </div>
          </div>
          <div className="h-1/4 flex flex-col gap-4">
            <div className="flex justify-center">
              <h1 className="text-24 text-gray-200">
                Información del empleado
              </h1>
            </div>
            <div className="flex gap-2 text-left items-center">
              <h2 className="text-white text-18">Nombre: </h2>
              <p className="font-normal text-14 text-white pt-0">
                {cardEmail && cardEmail.name}
              </p>
            </div>
            <div className="flex gap-2 text-left items-center">
              <h2 className="text-white text-18">País: </h2>
              <p className="font-normal text-14 text-white pt-0">
                {cardEmail && cardEmail.country}
              </p>
            </div>
            <div className="flex gap-2 text-left items-center">
              <h2 className="text-white text-18">Nacimiento: </h2>
              <p className="font-normal text-14 text-white pt-0">
                {cardEmail && cardEmail.birthdate}
              </p>
            </div>
            <div className="flex gap-2 text-left items-center">
              <h2 className="text-white text-18">Teléfono: </h2>
              <p className="font-normal text-14 pt-0 text-white">
                {cardEmail && cardEmail.contactNumber}
              </p>
            </div>
            <div className="flex gap-2 text-left items-center">
              <h2 className="text-white text-18">Email: </h2>
              <p className="font-normal text-14 text-white pt-0">
                {cardEmail && cardEmail.email}
              </p>
            </div>
            <div className="flex gap-2 text-left flex-col">
              <h2 className="text-white text-18">Sobre él: </h2>
              <div className="flex items-center justify-center">
                <p className="font-normal text-14 text-white pt-0">
                  {cardEmail && cardEmail.description}
                </p>
              </div>
            </div>

            {cardEmail.rol === "freelancer" ? (
              <div className="flex flex-col gap-5 items-center justify-center">
                <h2>Asignacion de Leads</h2>
                <div className="flex flex-col gap-10 mb-5 justify-center items-center w-fit">
                  <LeadAsigned
                    leadAsigned={leadAsigned}
                    setLeadAsigned={setLeadAsigned}
                  />
                  <Profesion
                    profesion={profesion}
                    setProfesion={setProfesion}
                    country={country}
                    setCountry={setCountry}
                  />
                </div>
                <div onClick={asignar}>
                  <Button size="large" variant="outlined">
                    Asignar
                  </Button>
                </div>
              </div>
            ) : null}

            {loading ? (
              <div className="flex items-center justify-center">
                <div className="flex flex-col items-center justify-center gap-2">
                  <h2 id="child-modal-description">
                    Asignado Leads a Freelancer{" "}
                  </h2>
                  <div className="lds-roller">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      ) : (
        <div className="flex h-screen justify-center items-center">
          <h1 className="text-white">Selecciona un empleado</h1>
        </div>
      )}
    </div>
  );
}

export default Detail;
// {"props.performance" ? <Performance /> : <About />}
