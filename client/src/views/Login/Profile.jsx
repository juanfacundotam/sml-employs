import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import styles from "./Profile.module.css";

function Profile() {
  const { user, isAuthenticated } = useAuth0();
  return (
    <>
      {user && (
        <div className="flex flex-col justify-center items-center w-12">
          <img className="w-12 h-12 rounded-full" src={user.picture} alt={user.name} />
          <h2 className="text-[18px] min-w-[180px] mt-2 text-center">{user.name}</h2>
        </div>
      )}
    </>
  );
}

export default Profile;
