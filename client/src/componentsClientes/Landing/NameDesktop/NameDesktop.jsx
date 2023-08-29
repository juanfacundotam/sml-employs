import React from "react";
import { Link } from "react-router-dom";
import CircularProgressBar from "../CircularProgressbar/CircularProgressbar";

export default function NameDesktop({ name, numberTotal, imgInstagram }) {
  const nameIG = localStorage.getItem("instagram");
  return (
    <div className="flex gap-1 mt-5 justify-center items-center">
      <div className=" pt-10 justify-center items-center relative">
        <CircularProgressBar value={numberTotal} imageSrc={imgInstagram} />
        <p className="font-bold bottom-0 -right-7 absolute">
          {(numberTotal / 10000) * 100}%
        </p>
      </div>
      <div className="flex flex-col">
        <span className="text-white font-bold text-3xl">{name}</span>
        {nameIG !== "" ? (
          <span className="text-xl">@{nameIG}</span>
        ) : (
          <Link to="/clientes-settings">
            <button className="border-2 border-[#07A1F8] bg-[#07A1F8] text-white px-6 py-2  rounded-full">
              Agregar Instagram
            </button>
          </Link>
        )}
      </div>
    </div>
  );
}
