import React, { useEffect, useState } from "react";
import CustomsIcons from "./CustomsIcons/CustomsIcons";
import trofy1 from "../../Assets/med1.webp";
import trofy2 from "../../Assets/med2.webp";
import trofy3 from "../../Assets/med3.webp";
import trofy4 from "../../Assets/med4.webp";

export default function Trofeos({ nivelPadre }) {
  const [trofeos, setTrofeos] = useState([
    { imagen: trofy2, isVisible: false },
    { imagen: trofy1, isVisible: false },
    { imagen: trofy1, isVisible: false },
    { imagen: trofy1, isVisible: false },
    { imagen: trofy4, isVisible: false },
    { imagen: trofy1, isVisible: false },
    { imagen: trofy1, isVisible: false },
    { imagen: trofy1, isVisible: false },
    { imagen: trofy3, isVisible: false },
    { imagen: trofy1, isVisible: false },
    { imagen: trofy1, isVisible: false },
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
    actualizarTrofeos(nivelPadre);
  }, [nivelPadre]);

  return (
    <div className="flex flex-col justify-center items-center gap-3 w-[330px] md:w-[430px]">
      <h1 className="text-white text-18 w-10/12 md:w-fit">Trofeos</h1>

      <div className="flex justify-center items-center gap-3 w-full flex-wrap">
        {trofeos.map((trofeo, index) => (
          <div key={index}>
            <CustomsIcons imagen={trofeo.imagen} isVisible={trofeo.isVisible} />
          </div>
        ))}
      </div>
    </div>
  );
}
