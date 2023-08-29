import { useClerk, useUser } from "@clerk/clerk-react";
import React, { useEffect, useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import ProfileSetting from "../../componentsClientes/ProfileSetting/ProfileSetting";
import CustomsLabelSetting from "./CustomsLabelSetting/CustomsLabelSetting";
import NavBarDesktop from "../../componentsClientes/Landing/NavBarDesktop/NavBarDesktop";
import background from "../../Assets/borde1.webp";

export default function ClientesSettings({ tamañoPantalla }) {
  const [profileSetting, setProfileSetting] = useState(false);
  const [urlPago, setUrlPago] = useState("");
  const navigate = useNavigate();
  const texto = "Ajustes de perfil";
  const texto1 = "Notificaciones";
  const switchs1 = true;
  const texto2 = "Mis pagos";
  const texto3 = "Invitar a un amigo";
  const invitar3 = true;
  const { user } = useUser();
  const userEmail =
    user && user.emailAddresses && user.emailAddresses[0].emailAddress;

  const { signOut } = useClerk();

  const tokenAccess = localStorage.getItem("access");
  const handleLogout = async () => {
    await signOut();
    localStorage.removeItem("access");
    navigate("/clientes-home");
  };
  //*************** */

  const handleProfileSetting = () => {
    setProfileSetting(!profileSetting);
  };
  const styles = () => {
    if (tamañoPantalla === "Grande") {
      return {
        backgroundImage: `url(${background})`,
        backgroundSize: "auto 100%",
        backgroundPosition: "left top",
        backgroundRepeat: "no-repeat",
      };
    } else {
      return null;
    }
  };

  return (
    <div
      className={
        tamañoPantalla === "Pequeña"
          ? " bg-[#1A1A1A] w-screen h-screen"
          : " bg-[#020131] w-screen h-screen"
      }
      style={styles()}
    >
      {tamañoPantalla === "Grande" ? (
        <div className="w-full h-1/6">
          <NavBarDesktop />
        </div>
      ) : null}

      <div className="flex flex-col justify-center items-center h-5/6">
        <div className="w-96">
          {!profileSetting ? (
            <>
              {tamañoPantalla === "Pequeña" ? (
                <div className=" flex mb-4 items-end justify-between pt-4">
                  <h2 className="font-bold">Personal</h2>
                  <Link
                    to={"/clientes-home"}
                    className="font-bold  md:border-2 md:border-[#211f52] md:rounded-lg hover:bg-[#2a286e] "
                  >
                    <IoCloseSharp className="font-bold text-[#fff] text-[2rem]" />
                  </Link>
                </div>
              ) : null}

              <div className="flex flex-col">
                <button
                  onClick={handleProfileSetting}
                  className="w-full m-0 p-0 "
                >
                  <CustomsLabelSetting
                    text={texto}
                    tamañoPantalla={tamañoPantalla}
                  />
                </button>

                <CustomsLabelSetting
                  text={texto1}
                  switchValue={switchs1}
                  tamañoPantalla={tamañoPantalla}
                />

                <Link to={"/clientes-pagos"}>
                  <div
                    className={
                      tamañoPantalla === "Pequeña"
                        ? "text-[#fff] font-bold flex justify-center gap-5 items-center rounded-xl py-4 my-2 bg-[#282828] hover:bg-[#3f437a] cursor-pointer"
                        : "text-[#fff] font-bold flex justify-center gap-5 items-center rounded-xl py-4 my-2 bg-[#363559] hover:bg-[#3f437a] cursor-pointer"
                    }
                  >
                    Mis Pagos
                  </div>
                </Link>
              </div>
              <Link to={"/clientes-referidos"}>
                <div
                  className={
                    tamañoPantalla === "Grande"
                      ? "w-full text-center rounded-md mt-6 border border-white h-[40px] px-3 bg-gradient-to-t from-black via-[#020131]  to-blue-600 text-white justify-center items-center flex "
                      : "w-full text-center rounded-md mt-6 border border-white h-[40px] px-3 bg-gradient-to-t from-[#282828] via-black  to-[#282828] text-white justify-center items-center flex "
                  }
                >
                  Invitar a un amigo!
                </div>
              </Link>
            </>
          ) : (
            <ProfileSetting
              handleProfileSetting={handleProfileSetting}
              tamañoPantalla={tamañoPantalla}
            />
          )}
        </div>
        <div className="flex justify-center items-center mt-10">
          <button
            onClick={handleLogout}
            className="rounded-full px-6 py-2  text-gray-900 focus:outline-none bg-white  border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200
         dark:focus:ring-gray-700 dark:bg-transparent dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          >
            Cerrar Sesión
          </button>
        </div>
      </div>
    </div>
  );
}
