import React from "react";
import Referral from "../../componentsClientes/Referidos/Referidos";

export default function Referidos({ tamañoPantalla }) {
  return (
    <div
      className={
        tamañoPantalla === "Pequeña"
          ? " bg-[#1A1A1A] flex  gap-5  flex-col justify-start items-center h-screen w-screen"
          : " bg-[#020131] flex  gap-5  flex-col justify-start items-center h-screen w-screen"
      }
    >
      <div className=" w-96">
        <Referral tamañoPantalla={tamañoPantalla} />
      </div>
    </div>
  );
}
