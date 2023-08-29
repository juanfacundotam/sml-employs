import React, { useEffect, useState } from "react";
import Name from "./Name/Name";
import Header from "./Header/Header";
import Followers from "./Followers/Followers";

export default function LandingClient({
  imgInstagram,
  setMaxNumber,
  numberTotal,
  name,
  setName,
  numberInstagram,
  numberTiktok,
  maxNumber,
}) {
  return (
    <div>
      <Header
        numberTotal={numberTotal}
        setMaxNumber={setMaxNumber}
        imgInstagram={imgInstagram}
      />
      <Name name={name} setName={setName} />
      <Followers
        numberInstagram={numberInstagram}
        numberTiktok={numberTiktok}
        maxNumber={maxNumber}
      />
    </div>
  );
}
