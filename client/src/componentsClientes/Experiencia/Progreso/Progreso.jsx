import React, { useEffect, useState } from "react";
import LinearDeterminate from "./LinearDeterminate";

export default function Progreso({ goals, progress }) {
  return (
    <div className="flex flex-col justify-center items-center gap-2 bg-[#404062] w-10/12 h-20 rounded-xl">
      {/* Etiquetas para mostrar el progreso */}
      <div className="flex w-full justify-center items-center gap-5">
        <p className="text-green-400 font-semibold">+{100 - progress}</p>
        <p className="font-bold text-24 text-white">{progress}</p>
        <p className="font-bold text-24">/ {goals}</p>
        <p className="text-red-400 font-semibold">-{100 - progress}</p>
      </div>

      {/* Barra de progreso lineal */}
      <div className="w-full flex justify-center">
        <LinearDeterminate value={progress} minValue={0} maxValue={100} />
      </div>
    </div>
  );
}
