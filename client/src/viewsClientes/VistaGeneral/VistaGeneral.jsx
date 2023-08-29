import React from "react";
import Recursos from "../../componentsClientes/Recursos/Recursos";
import { Agendar } from "../../componentsClientes/Agendar/Agendar";
import Avances from "../../componentsClientes/Avances/Avances";
import AvancesDesktop from "../../componentsClientes/Avances/AvancesDesktop";

export const VistaGeneral = ({
  seguidoresIG,
  seguidoresTT,
  seguidoresGanadosIG,
  seguidoresGanadosTT,
  videosPublicados,
  tamañoPantalla,
}) => {
  return (
    <>
      {tamañoPantalla === "Pequeña" ? (
        <div className="flex flex-col md:flex-row justify-center md:gap-9 items-center w-full h-full mt-8">
          <Avances
            seguidoresIG={seguidoresIG}
            seguidoresTT={seguidoresTT}
            seguidoresGanadosIG={seguidoresGanadosIG}
            seguidoresGanadosTT={seguidoresGanadosTT}
            videosPublicados={videosPublicados}
            tamañoPantalla={tamañoPantalla}
          />

          <div className="flex flex-col">
            <Recursos />
            <Agendar />
          </div>
        </div>
      ) : (
        <AvancesDesktop
          seguidoresIG={seguidoresIG}
          seguidoresTT={seguidoresTT}
          seguidoresGanadosIG={seguidoresGanadosIG}
          seguidoresGanadosTT={seguidoresGanadosTT}
          videosPublicados={videosPublicados}
          tamañoPantalla={tamañoPantalla}
        />
      )}
    </>
  );
};
