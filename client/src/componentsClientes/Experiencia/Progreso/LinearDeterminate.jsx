import React, { useState, useEffect } from "react";

export default function LinearDeterminate({
  value,
  minValue = 0,
  maxValue = 100,
}) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Asegurarse de que el valor de progreso esté dentro del rango mínimo y máximo
    const clampedValue = Math.min(Math.max(value, minValue), maxValue);

    // Actualizar el progreso con una animación suave durante 500 milisegundos
    const animationDuration = 500;
    const animationSteps = 60;
    const stepIncrement = (clampedValue - progress) / animationSteps;

    let currentProgress = progress;
    const interval = setInterval(() => {
      currentProgress += stepIncrement;
      setProgress(currentProgress);

      // Comprobar si se alcanzó el valor de progreso clampedValue
      if (
        (stepIncrement > 0 && currentProgress >= clampedValue) ||
        (stepIncrement < 0 && currentProgress <= clampedValue)
      ) {
        // Establecer el progreso en el valor clampedValue y detener la animación
        setProgress(clampedValue);
        clearInterval(interval);
      }
    }, animationDuration / animationSteps);

    // Limpiar el intervalo al desmontar el componente
    return () => {
      clearInterval(interval);
    };
  }, [value, minValue, maxValue]);

  const progressBarStyles = {
    width: "85%",
    height: "15px",
    backgroundColor: "#e0e0e0",
    borderRadius: "10px",
  };

  const progressBarFillStyles = {
    height: "100%",
    backgroundColor: "#570387",
    borderRadius: "10px",
    width: `${progress}%`,
    transition: "width 1s linear",
  };

  return (
    <div className="progress-bar" style={progressBarStyles}>
      <div className="progress-bar__fill" style={progressBarFillStyles}></div>
    </div>
  );
}
