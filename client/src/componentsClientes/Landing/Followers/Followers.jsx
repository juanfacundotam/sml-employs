import React, { useEffect, useState } from "react";
import igPng from "../../../Assets/instagram.webp";
import tkPng from "../../../Assets/tik-tok.webp";

export default function Followers({
  numberInstagram,
  numberTiktok,
  maxNumber,
}) {
  const [loading, setLoading] = useState(true);

  const formatearNumeroConPuntos = (numero) => {
    let numeroFormateado = numero.toString();

    if (numeroFormateado.includes("M")) {
      numeroFormateado = numeroFormateado.replace("M", "000000");
      return numeroFormateado.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    } else if (numeroFormateado.includes("k")) {
      numeroFormateado = numeroFormateado.replace("k", "000");
      return numeroFormateado.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }

    return numeroFormateado.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  useEffect(() => {
    if (numberInstagram !== 0 || numberTiktok !== 0) {
      setLoading(false);
    }
  }, [numberInstagram]);

  return (
    <div className="flex flex-col justify-center items-center w-screen h-fit relative mt-3">
      <div className="flex items-center">
        <p
          className="text-[45px] font-semibold text-white text-end px-2"
          id="total-redes"
        >
          {formatearNumeroConPuntos(
            parseInt(numberInstagram) + parseInt(numberTiktok)
          )}
        </p>

        <p className="text-[.7rem] " id="max-redes">
          / {maxNumber}{" "}
        </p>
      </div>
      <div className="flex ">
        <p className="font-bold " id="followers">
          SEGUIDORES
        </p>
      </div>
      <div className="flex justify-center items-center w-fit h-fit gap-4 mt-6">
        <img src={igPng} alt="icono de Instagram" className="w-8 h-8" />
        <p
          className="text-[27px] text-white font-semibold  px-2 pb-1"
          id="instagram"
        >
          {formatearNumeroConPuntos(numberInstagram)}
        </p>
        <p className=" border-white bg-white w-[0.5px] h-5  text-white text-18"></p>
        <p
          className="text-[27px] text-white font-semibold px-2 pb-1"
          id="tiktok"
        >
          {formatearNumeroConPuntos(numberTiktok)}
        </p>
        <img src={tkPng} alt="icono de Tiktok" className="w-8 h-8" />
      </div>
    </div>
  );
}
