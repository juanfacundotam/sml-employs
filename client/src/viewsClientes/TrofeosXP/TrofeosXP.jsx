import React, { useState } from "react";
import Experiencia from "../../componentsClientes/Experiencia/Experiencia";
import Trofeos from "../../componentsClientes/Trofeos/Trofeos";

export const TrofeosXP = () => {
  const [nivelPadre, setNivelPadre] = useState(0);

  return (
    <div className=" flex flex-col md:flex-row justify-center md:gap-9 items-center  mt-12 md:mt-5">

      <Experiencia nivelPadre={nivelPadre} setNivelPadre={setNivelPadre} />

      <div className="flex flex-col mt-14 md:mt-0">
        <Trofeos nivelPadre={nivelPadre}/>
      </div>
    </div>
  );
};
