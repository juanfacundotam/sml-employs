import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Name({ name }) {
  const nameIG = localStorage.getItem("instagram");
  return (
    <div className="flex flex-col gap-1 mt-5 justify-center items-center">
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
  );
}
