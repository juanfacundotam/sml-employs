import React from "react";
import avatar from "../../Assets/avatar.webp";

// Componente de agendar
export const Agendar = ({ nameAgendar }) => {
  return (
    // Contenedor principal de Agendar
    <div className="flex flex-col justify-center items-center gap-3 w-96 mt-3">
      {/* Título */}
      <h1 className="text-white text-18 w-10/12 md:w-fit">Agendar con</h1>

      {/* Botón de agendar */}
      <button
        value="vistaGeneral"
        className="flex justify-start items-center border-2 border-[#07A1F8] bg-[#07A1F8] text-white px-3 py-0.5 rounded-full text-18 w-10/12 h-12"
      >
        <img
          src={avatar}
          alt="icono de Tiktok"
          className="bg-[#f8cc07] mx-3 w-10 h-10 rounded-full"
        />
        Juan Pedro Gomez
      </button>
    </div>
  );
};
