import React, { useEffect, useState } from "react";
import NivelDesktop from "./Nivel/NivelDesktop";
import ProgresoDesktop from "./Progreso/ProgresoDesktop";
import NavBarDesktop from "../Landing/NavBarDesktop/NavBarDesktop";

export default function ExperienciaDesktop({ nivelPadre, setNivelPadre }) {
  const [progress, setProgress] = useState(0); // Estado para almacenar el progreso actual
  const [goals, setGoals] = useState(100); // Estado para almacenar los objetivos
  const [nivel, setNivel] = useState(0); // Estado para almacenar el nivel actual

  const subirXp = () => {
    setProgress(progress + 99); // Incrementar el progreso actual al subir la experiencia
  };

  return (
    <div className="flex bg-[#020131] flex-col w-screen h-screen">
      <NavBarDesktop />
      <div className="flex justify-center items-center">
        <div className="flex flex-col justify-center  w-8/12 items-center gap-3">
          {/* Título del componente */}
          <h1 className="text-white text-18 w-10/12 md:w-fit">Experiencia</h1>

          {/* Botón para subir la experiencia */}
          <button onClick={subirXp}>SubirXP</button>

          {/* Componente de Nivel */}
          <NivelDesktop nivel={nivel} />

          {/* Componente de Progreso */}
          <ProgresoDesktop goals={goals} progress={progress} />
        </div>
      </div>
    </div>
  );
}
