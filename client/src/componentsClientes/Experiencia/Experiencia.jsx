import React, { useEffect, useState } from "react";
import Nivel from "./Nivel/Nivel";
import Progreso from "./Progreso/Progreso";

export default function Experiencia({ nivelPadre, setNivelPadre }) {
  const [progress, setProgress] = useState(0); // Estado para almacenar el progreso actual
  const [goals, setGoals] = useState(100); // Estado para almacenar los objetivos
  const [nivel, setNivel] = useState(0); // Estado para almacenar el nivel actual

  const subirXp = () => {
    setProgress(progress + 99); // Incrementar el progreso actual al subir la experiencia
  };

  useEffect(() => {
    if (progress >= goals) {
      // Si el progreso alcanza o supera los objetivos
      setProgress(0); // Reiniciar el progreso a cero
      setNivel(nivel + 1); // Incrementar el nivel actual en uno
      setNivelPadre(nivel + 1); // Actualizar el nivel en el componente padre
    }
  }, [subirXp, setNivelPadre]);

  return (
    <div className="flex flex-col justify-center items-center gap-3 w-96">
      {/* Título del componente */}
      <h1 className="text-white text-18 w-10/12 md:w-fit">Experiencia</h1>

      {/* Botón para subir la experiencia */}
      <button onClick={subirXp}>SubirXP</button>

      {/* Componente de Nivel */}
      <Nivel nivel={nivel} />

      {/* Componente de Progreso */}
      <Progreso goals={goals} progress={progress} />
    </div>
  );
}
