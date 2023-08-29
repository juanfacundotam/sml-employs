import React from "react";

export default function CustomsIconsDesktop({ imagen, isVisible }) {
  return (
    <div>
      {isVisible ? (
        <div className="flex items-center justify-center mt-2 w-36 h-36 rounded-full">
          <img src={imagen} />
        </div>
      ) : (
        <div className="flex justify-center items-center w-36 h-36 mt-2 bg-[#39385B] rounded-full border-2 border-gray-400"></div>
      )}
    </div>
  );
}
