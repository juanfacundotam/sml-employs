import React from "react";

export default function CustomsIcons({ imagen, isVisible }) {
  return (
    <div>
      {isVisible ? (
        <div className="w-20 h-20 rounded-full">
          <img src={imagen} />
        </div>
      ) : (
        <div className="w-20 h-20 rounded-full border-2 "></div>
      )}
    </div>
  );
}
