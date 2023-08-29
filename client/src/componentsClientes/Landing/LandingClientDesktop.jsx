import React from "react";
import FollowersDesktop from "./FollowersDesktop/FollowersDesktop";

export default function LandingClientDesktop({
  imgInstagram,
  numberTotal,
  name,
  setName,
  numberInstagram,
  numberTiktok,
  maxNumber,
}) {
  return (
    <div>
      <FollowersDesktop
        name={name}
        setName={setName}
        numberTotal={numberTotal}
        imgInstagram={imgInstagram}
        numberInstagram={numberInstagram}
        numberTiktok={numberTiktok}
        maxNumber={maxNumber}
      />
    </div>
  );
}
