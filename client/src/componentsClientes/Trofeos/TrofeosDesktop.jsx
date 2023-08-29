import React, { useEffect, useState } from "react";
import trofy1 from "../../Assets/med1.webp";
import trofy2 from "../../Assets/med2.webp";
import trofy3 from "../../Assets/med3.webp";
import trofy4 from "../../Assets/med4.webp";
import NavBarDesktop from "../Landing/NavBarDesktop/NavBarDesktop";
import CustomsIconsDesktop from "./CustomsIconsDesktop/CustomsIconsDesktop";
import "./TrofeosDesktop.module.css";

export default function TrofeosDesktop({ nivelPadre }) {
  const [trofeos, setTrofeos] = useState([
    { imagen: trofy2, isVisible: true },
    { imagen: trofy1, isVisible: false },
    { imagen: trofy3, isVisible: false },
    { imagen: trofy1, isVisible: false },
    { imagen: trofy2, isVisible: false },
    { imagen: trofy1, isVisible: true },
    { imagen: trofy4, isVisible: false },
    { imagen: trofy1, isVisible: false },
    { imagen: trofy2, isVisible: false },
    { imagen: trofy1, isVisible: false },
    { imagen: trofy1, isVisible: true },
    { imagen: trofy3, isVisible: false },
    { imagen: trofy1, isVisible: false },
    { imagen: trofy1, isVisible: false },
    { imagen: trofy2, isVisible: false },
    { imagen: trofy1, isVisible: true },
    { imagen: trofy1, isVisible: false },
    { imagen: trofy1, isVisible: false },
    { imagen: trofy2, isVisible: true },
    { imagen: trofy1, isVisible: false },
    { imagen: trofy1, isVisible: false },
    { imagen: trofy1, isVisible: false },
    { imagen: trofy2, isVisible: false },
    { imagen: trofy1, isVisible: false },
    { imagen: trofy1, isVisible: false },
    { imagen: trofy1, isVisible: false },
    { imagen: trofy1, isVisible: true },
    { imagen: trofy1, isVisible: false },
    { imagen: trofy1, isVisible: false },
    { imagen: trofy1, isVisible: false },
    { imagen: trofy1, isVisible: false },
    { imagen: trofy2, isVisible: false },
    { imagen: trofy1, isVisible: true },
    { imagen: trofy1, isVisible: false },
    { imagen: trofy1, isVisible: false },
    { imagen: trofy2, isVisible: true },
    { imagen: trofy1, isVisible: false },
    { imagen: trofy1, isVisible: false },
    { imagen: trofy1, isVisible: false },
    { imagen: trofy2, isVisible: false },
    { imagen: trofy1, isVisible: false },
    { imagen: trofy1, isVisible: false },
    { imagen: trofy1, isVisible: false },
    { imagen: trofy1, isVisible: true },
    { imagen: trofy1, isVisible: false },
  ]);

  const actualizarTrofeos = (nivel) => {
    const nuevosTrofeos = trofeos.map((trofeo, index) => {
      if (index + 1 <= nivel) {
        return { ...trofeo, isVisible: true };
      } else {
        return { ...trofeo, isVisible: false };
      }
    });

    setTrofeos(nuevosTrofeos);
  };
  useEffect(() => {
    actualizarTrofeos(8);
  }, [nivelPadre]);

  return (
    <div className="flex bg-[#020131] flex-col w-screen h-screen">
      <NavBarDesktop />
      <div className="flex flex-col justify-center items-center">
        <div className="flex w-8/12 mt-4">
          <h1 className="text-white font-semibold text-[2rem]">Trofeos</h1>
        </div>
        <div className="flex bg-[#363559] justify-center items-center rounded-3xl w-8/12 h-[40rem] py-4 pl-20 ">
          <div
            className="flex flex-wrap gap-5"
            style={{
              maxHeight: "100%",
              overflowY: "scroll",
            }}
          >
            {trofeos.map((trofeo, index) => (
              <div key={index}>
                <CustomsIconsDesktop
                  imagen={trofeo.imagen}
                  isVisible={trofeo.isVisible}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
