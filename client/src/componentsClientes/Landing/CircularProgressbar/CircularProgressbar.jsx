import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const CircularProgressBar = ({ value, imageSrc }) => {
  const percentage = (value / 10000) * 100;
  const getPathColor = (percentage) => {
    let color;
    if (percentage >= 0 && percentage <= 25) {
      color = "linear-gradient(to right, #570387, red)";
    } else if (percentage > 25 && percentage <= 50) {
      color = "linear-gradient(to right, red, orange)";
    } else if (percentage > 50 && percentage <= 75) {
      color = "linear-gradient(to right, orange, yellow)";
    } else if (percentage > 75 && percentage <= 100) {
      color = "linear-gradient(to right, red, #570387)";
    } else {
      color = "#570387";
    }
    return color;
  };

  const styles = buildStyles({
    pathColor: "#570387",
    trailColor: `transparent`,
    backgroundColor: `linear-gradient(to right, purple, red)`,
  });

  return (
    <div style={{ width: "8.2rem", position: "relative" }}>
      <CircularProgressbar
        value={percentage}
        strokeWidth={10}
        styles={styles}
      />
      <img
        src={imageSrc}
        alt="Imagen"
        className="h-28 w-28 rounded-full border-2 border-gray-500 bg-white"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />
    </div>
  );
};

export default CircularProgressBar;
