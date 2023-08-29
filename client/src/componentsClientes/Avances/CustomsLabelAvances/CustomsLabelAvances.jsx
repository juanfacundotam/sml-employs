import React from "react";
import igPng from "../../../Assets/instagram.webp";
import tkPng from "../../../Assets/tik-tok.webp";
export default function CustomsLabelAvances({
  text,
  ganadosTT,
  ganadosIG,
  IG,
  TT,
  tamañoPantalla,
}) {
  return (
    <>
      {tamañoPantalla === "Pequeña" ? (
        // Contenedor principal del avance
        <div className="flex justify-between gap-5 items-center rounded-xl py-4 my-2 bg-[#282828]">
          {/* Texto del avance */}
          <div className="w-10">
            <p className="text-[#fff] text-[.7rem] font-bold ml-4">{text}</p>
          </div>
          {/* Contenedor para mostrar las sumas y el valor */}
          <div className="flex flex-col">
            <div className="flex gap-2 justify-end">
              <div className="flex gap-3 justify-center items-center">
                {ganadosTT ? (
                  <p className="text-[#0f0] font-bold">+{ganadosIG}</p>
                ) : null}
                <p className="text-[#fff] text-[1.2rem] font-bold">{IG}</p>
                <img src={igPng} alt="ig" className="w-6 h-6 mr-2" />
              </div>
            </div>
            <div className="flex gap-2 justify-end">
              <div className="flex gap-3 justify-center items-center">
                {ganadosTT ? (
                  <p className="text-[#0f0] font-bold">+{ganadosTT}</p>
                ) : null}
                <p className="text-[#fff] text-[1.2rem] font-bold ">{TT}</p>
                <img src={tkPng} alt="tt" className="w-6 h-6 mr-2" />
              </div>
            </div>
          </div>
        </div>
      ) : (
        // Contenedor principal del avance
        <div className="flex justify-between gap-5 items-center rounded-xl py-1 my-2 bg-[#D9D9D9] bg-opacity-25">
          {/* Texto del avance */}
          <div className="w-96">
            <p className="text-[#fff] text-[20px] font-bold ml-4">{text}</p>
          </div>
          {/* Contenedor para mostrar las sumas y el valor */}
          <div className="flex flex-col">
            <div className="flex gap-x-2 justify-end">
              <div className="flex gap-x-3 justify-center items-center">
                {ganadosTT ? (
                  <p className="text-[#0f0] font-bold">+{ganadosIG}</p>
                ) : null}
                <p className="text-[#fff] text-[1.2rem] font-bold">{IG}</p>
                <img src={igPng} alt="ig" className="w-6 h-6 mr-2" />
              </div>
            </div>
            <div className="flex gap-2 justify-end">
              <div className="flex gap-3 justify-center items-center">
                {ganadosTT ? (
                  <p className="text-[#0f0] font-bold">+{ganadosTT}</p>
                ) : null}
                <p className="text-[#fff] text-[1.2rem] font-bold ">{TT}</p>
                <img src={tkPng} alt="tt" className="w-6 h-6 mr-2" />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
