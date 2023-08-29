import React, { useEffect, useState } from "react";
import igPng from "../../../Assets/instagram.webp";
import tkPng from "../../../Assets/tik-tok.webp";
import CircularProgressBar from "../CircularProgressbar/CircularProgressbar";

export default function FollowersDesktop({
  name,
  numberTotal,
  imgInstagram,
  numberInstagram,
  numberTiktok,
  maxNumber,
}) {
  const nameIG = localStorage.getItem("instagram");
  const [loading, setLoading] = useState(true);

  const formatearNumeroConPuntos = (numero) => {
    let numeroFormateado = numero.toString();

    if (numeroFormateado.includes("M")) {
      if (numeroFormateado.includes(".")) {
        numeroFormateado = numeroFormateado.replace("M", "00000");
        numeroFormateado = numeroFormateado.replace(".", "");
      } else {
        numeroFormateado = numeroFormateado.replace("M", "000000");
      }
      return numeroFormateado.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    } else if (numeroFormateado.includes("k")) {
      if (numeroFormateado.includes(".")) {
        numeroFormateado = numeroFormateado.replace("k", "00");
        numeroFormateado = numeroFormateado.replace(".", "");
      } else {
        numeroFormateado = numeroFormateado.replace("k", "000");
      }

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
      <div className="flex w-full justify-center items-center">
        <span className="text-white font-bold text-[2rem]">{name}</span>
      </div>
      <div className="flex justify-between w-7/12">
        <div className=" pt-10 justify-center items-center relative">
          <CircularProgressBar value={numberTotal} imageSrc={imgInstagram} />
          <p className="font-bold bottom-0 -right-7 absolute">
            {(numberTotal / 10000) * 100}%
          </p>
        </div>
        <div className="">
          <div className="flex flex-col justify-center items-center">
            <div className="flex items-center">
              <p className="text-[45px] font-semibold text-white  px-2">
                {formatearNumeroConPuntos(
                  parseInt(numberInstagram) + parseInt(numberTiktok)
                )}
              </p>

              <p className="text-[1rem] top-20 ">/ {maxNumber}</p>
            </div>
            <div>
              <p className="font-thin ">followers</p>
            </div>
            <div className="flex justify-center items-center w-fit h-fit gap-4 mt-6">
              <img src={igPng} alt="icono de Instagram" className="w-8 h-8" />
              <p className="text-[27px] text-white font-semibold  px-2 pb-1">
                {formatearNumeroConPuntos(numberInstagram)}
              </p>
              <p className=" border-white bg-white w-[0.5px] h-5  text-white text-18"></p>
              <p className="text-[27px] text-white font-semibold px-2 pb-1">
                {formatearNumeroConPuntos(numberTiktok)}
              </p>
              <img src={tkPng} alt="icono de Tiktok" className="w-8 h-8" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
