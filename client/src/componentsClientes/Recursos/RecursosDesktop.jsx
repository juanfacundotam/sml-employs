import React from "react";
import NavBarDesktop from "../Landing/NavBarDesktop/NavBarDesktop";
import Recursos from "./Recursos";
import background from "../../Assets/borde1.webp";

export default function RecursosDesktop({ tamañoPantalla }) {
  return (
    <div
      className="w-full h-screen bg-[#020131] flex flex-col"
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "auto 100%",
        backgroundPosition: "left top",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="z-0 ">
        <NavBarDesktop />
      </div>
      <div className="h-5/6 flex items-center justify-end w-10/12 ">
        <div className=" bg-[#D9D9D9] bg-opacity-25 h-3/6  flex rounded-2xl w-[350px]">
          <Recursos tamañoPantalla={tamañoPantalla} />
        </div>
      </div>
    </div>
  );
}
{
  /* <img src={background} alt="fondo" className="absolute h-screen z-0" /> */
}
