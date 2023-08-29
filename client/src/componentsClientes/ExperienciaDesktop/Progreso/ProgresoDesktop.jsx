import React, { useEffect, useState } from "react";
import LinearDeterminateDesktop from "./LinearDeterminateDesktop";

export default function ProgresoDesktop({ goals, progress }) {
  return (
    <div className="flex flex-col justify-center items-center gap-2 bg-[#404062] w-8/12 h-44 rounded-xl">
      {/* Etiquetas para mostrar el progreso */}
      <div className="flex w-full justify-center items-center gap-5">
        <label htmlFor="" className="text-green-400 font-semibold">
          +{100 - progress}
        </label>
        <label htmlFor="" className="font-bold text-24 text-white">
          {progress}
        </label>
        <label htmlFor="" className="font-bold text-24">
          / {goals}
        </label>
        <label htmlFor="" className="text-red-400 font-semibold">
          -{100 - progress}
        </label>
      </div>

      {/* Barra de progreso lineal */}
      <div className="w-full flex justify-center">
        <LinearDeterminateDesktop
          value={progress}
          minValue={0}
          maxValue={100}
        />
      </div>
    </div>
  );
}
