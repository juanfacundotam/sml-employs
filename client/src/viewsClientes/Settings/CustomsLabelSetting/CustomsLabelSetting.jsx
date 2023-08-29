import React from "react";
import CustomizedSwitches from "./MUI/CustomizedSwitches";

export default function CustomsLabelSetting({
  text,
  switchValue,
  invitar,
  tamañoPantalla,
}) {
  return (
    <div
      className={
        tamañoPantalla === "Pequeña"
          ? "flex justify-center gap-5 items-center rounded-xl py-4 my-2 bg-[#282828]"
          : "flex justify-center gap-5 items-center rounded-xl py-4 my-2 bg-[#363559]"
      }
    >
      <p className="text-[#fff] font-bold">{text}</p>
      {switchValue ? (
        <div>
          <CustomizedSwitches />
        </div>
      ) : null}
      {invitar ? (
        <div className="bg-[#188ffd] hover:bg-[#1263af] text-[#fff] rounded-full px-4">
          <p>Invitar</p>
        </div>
      ) : null}
    </div>
  );
}
