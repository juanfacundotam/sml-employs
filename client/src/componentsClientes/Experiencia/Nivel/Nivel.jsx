import React from "react";
import medImage from "../../../Assets/med1.webp";

export default function Nivel({ nivel }) {
  return (
    // Contenedor principal del componente Nivel
    <div className="flex justify-center items-center gap-6 bg-[#404062] w-10/12 h-28 rounded-xl">
      {/* Contenedor para el nivel */}
      <div className="flex flex-col justify-start items-center relative h-24 w-20">
        {/* Etiqueta para el texto "Nivel" */}
        <p className="text-18 text-white font-medium">Nivel</p>
        {/* Etiqueta para mostrar el nivel */}
        <p className="text-[65px] absolute top-3">
          {/* Span con estilo de gradiente para el valor del nivel */}
          <span className="bg-gradient-to-t from-blue-500 to-purple-500 text-transparent bg-clip-text font-extrabold">
            {nivel}
          </span>
        </p>
      </div>
      {/* Contenedor para la imagen del trofeo */}
      <div className="rounded-full flex flex-col justify-center items-center w-24 h-24">
        <img src={medImage} alt="imagen de trofeo" />
      </div>
      {/* Contenedor para el ranking */}
      <div className="flex flex-col justify-start items-center relative h-24 w-20 mt-4">
        {/* Etiqueta para el texto "Ranking" */}
        <p className="text-18 text-white font-medium">Ranking</p>
        {/* Etiqueta para mostrar el valor del ranking */}
        <p className="text-[40px] text-white absolute top-5">2</p>
      </div>
    </div>
  );
}
