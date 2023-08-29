import { useUser } from "@clerk/clerk-react";
import React, { useEffect, useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { getClientByEmail, updateClientProfile } from "../../redux/actions";
import toast, { Toaster } from "react-hot-toast";
import igPng from "../../Assets/instagram.webp";
import tkPng from "../../Assets/tik-tok.webp";
import gdPng from "../../Assets/googleDrive.webp";
import avatarPng from "../../Assets/avatar.webp";

export default function ProfileSetting({
  handleProfileSetting,
  tamañoPantalla,
}) {
  const [username, setUsername] = useState("");
  const [photo, setPhoto] = useState("");
  const [instagram, setInstagram] = useState("");
  const [tiktok, setTiktok] = useState("");
  const [drive, setDrive] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [save, setSave] = useState(false);
  const { client } = useSelector((state) => state);
  const dispatch = useDispatch();
  const { user } = useUser();
  const userEmail = user.emailAddresses[0].emailAddress;
  const userFullName = user.fullName;
  const userPhoto = user.imageUrl;

  useEffect(() => {
    dispatch(getClientByEmail(userEmail && userEmail));
  }, [dispatch]);
  useEffect(() => {
    setUsername(client?.username || "");
    setInstagram(client?.instagram || "");
    setTiktok(client?.tiktok || "");
    setDrive(client?.drive || "");
    setPhone(client?.phone || "");
    setCountry(client?.country || "");
  }, [client]);

  const saveSuccess = () => {
    toast.success("Cambios guardados.", {
      duration: 2000,
      position: "top-center",
      style: {
        background: "#020131",
        color: "white",
        border: "1px solid",
        borderColor: "white",
      },
    });
  };

  const handleSaveChanges = async () => {
    const body = {
      username: username === "" ? userFullName : username,
      photo: photo === "" ? userPhoto : photo,
      instagram,
      tiktok,
      drive,
      phone,
      country,
    };
    dispatch(updateClientProfile(userEmail, body));
    saveSuccess();
    setSave(false);
  };

  return (
    <>
      <div className=" flex mb-4 items-center justify-center pt-4">
        <h2 className="font-extrabold text-white">Ajustes de Perfil</h2>
        {tamañoPantalla === "Pequeña" ? (
          <button
            onClick={handleProfileSetting}
            className="font-bold  md:border-[#211f52] md:rounded-lg hover:bg-[#2a286e] absolute right-4"
          >
            <IoCloseSharp className="font-bold text-[#fff] text-[2rem]" />
          </button>
        ) : null}
      </div>
      <div className="w-full flex flex-col gap-4 items-center">
        <div
          className={
            tamañoPantalla === "Grande"
              ? " p-0 m-0 flex  w-11/12 justify-start items-center border rounded-md bg-gradient-to-br from-black via-[#020131]  to-blue-950 "
              : " p-0 m-0 flex  w-11/12 justify-start items-center border rounded-md bg-gradient-to-br from-black via-[#282828]  to-black "
          }
        >
          <img
            src={avatarPng}
            alt="icono de Avatar"
            className="ml-2 mr-1 w-6 h-6"
          />
          <input
            type="text"
            id="username"
            autoComplete="off"
            value={username}
            onChange={(event) => {
              setUsername(event.target.value);
              setSave(true);
            }}
            placeholder="Cambiar Nombre de Usuario"
            className="w-10/12 text-center h-[40px]  bg-transparent placeholder:text-gray-500 text-white focus:border-none focus:outline-none"
          />
        </div>
        <div
          className={
            tamañoPantalla === "Grande"
              ? " p-0 m-0 flex  w-11/12 justify-start items-center border rounded-md bg-gradient-to-br from-black via-[#020131]  to-blue-950 "
              : " p-0 m-0 flex  w-11/12 justify-start items-center border rounded-md bg-gradient-to-br from-black via-[#282828]  to-black "
          }
        >
          <img
            src={igPng}
            alt="icono de Instagram"
            className="ml-2 mr-1 w-6 h-6"
          />
          <input
            type="text"
            id="instagram"
            value={instagram}
            onChange={(event) => {
              setInstagram(event.target.value);
              setSave(true);
            }}
            placeholder="Ingresar Link de Instagram"
            className="w-10/12 text-start h-[40px]  bg-transparent placeholder:text-gray-500 placeholder:text-center text-white focus:border-none focus:outline-none"
          />
        </div>
        <div
          className={
            tamañoPantalla === "Grande"
              ? " p-0 m-0 flex  w-11/12 justify-start items-center border rounded-md bg-gradient-to-br from-black via-[#020131]  to-blue-950 "
              : " p-0 m-0 flex  w-11/12 justify-start items-center border rounded-md bg-gradient-to-br from-black via-[#282828]  to-black "
          }
        >
          <img
            src={tkPng}
            alt="icono de Tiktok"
            className="ml-2 mr-1 w-6 h-6"
          />
          <input
            type="text"
            id="tiktok"
            value={tiktok}
            onChange={(event) => {
              setTiktok(event.target.value);
              setSave(true);
            }}
            placeholder="Ingresar Link de TikTok"
            className="w-10/12 text-start h-[40px]  bg-transparent placeholder:text-gray-500 placeholder:text-center text-white focus:border-none focus:outline-none "
          />
        </div>
        <div
          className={
            tamañoPantalla === "Grande"
              ? " p-0 m-0 flex  w-11/12 justify-start items-center border rounded-md bg-gradient-to-br from-black via-[#020131]  to-blue-950"
              : " p-0 m-0 flex  w-11/12 justify-start items-center border rounded-md bg-gradient-to-br from-black via-[#282828]  to-black "
          }
        >
          <img
            src={gdPng}
            alt="icono de Google Drive"
            className="ml-2 mr-1 w-6 h-6"
          />
          <input
            type="text"
            id="drive"
            value={drive}
            onChange={(event) => {
              setDrive(event.target.value);
              setSave(true);
            }}
            placeholder="Ingresar Link de Google Drive"
            className="w-10/12 text-start h-[40px]  bg-transparent placeholder:text-gray-500 placeholder:text-center text-white focus:border-none focus:outline-none"
          />
        </div>
        <div
          className={
            tamañoPantalla === "Grande"
              ? " p-0 m-0 flex  w-11/12 justify-start items-center border rounded-md bg-gradient-to-br from-black via-[#020131]  to-blue-950 "
              : " p-0 m-0 flex  w-11/12 justify-start items-center border rounded-md bg-gradient-to-br from-black via-[#282828]  to-black "
          }
        >
          <p className="ml-1 mr-1 w-[24px] text-24 h-[24px]">📞</p>
          <input
            type="text"
            id="phone"
            autoComplete="off"
            value={phone}
            onChange={(event) => {
              setPhone(event.target.value);
              setSave(true);
            }}
            placeholder="Ingresar Teléfono"
            className="w-10/12 text-center h-[40px]  bg-transparent placeholder:text-gray-500 text-white focus:border-none focus:outline-none"
          />
        </div>
        <div
          className={
            tamañoPantalla === "Grande"
              ? " p-0 m-0 flex  w-11/12 justify-start items-center border rounded-md bg-gradient-to-br from-black via-[#020131]  to-blue-950 "
              : " p-0 m-0 flex  w-11/12 justify-start items-center border rounded-md bg-gradient-to-br from-black via-[#282828]  to-black "
          }
        >
          <p className="ml-1 mr-1 w-[24px] text-24 h-[24px]">🌍</p>
          <input
            type="text"
            id="country"
            autoComplete="off"
            value={country}
            onChange={(event) => {
              setCountry(event.target.value);
              setSave(true);
            }}
            placeholder="Ingresar País"
            className="w-10/12 text-center h-[40px]  bg-transparent placeholder:text-gray-500 text-white focus:border-none focus:outline-none"
          />
        </div>

        {save ? (
          <button
            className={
              tamañoPantalla === "Grande"
                ? "w-5/12 text-center rounded-md mt-6 border border-white h-[40px] px-3 bg-gradient-to-t from-black via-[#020131]  to-blue-600 text-white "
                : "w-5/12 text-center rounded-md mt-6 border border-white h-[40px] px-3 bg-gradient-to-t from-black via-[#282828]  to-black text-white "
            }
            onClick={handleSaveChanges}
          >
            Guardar
          </button>
        ) : (
          <button
            className={
              tamañoPantalla === "Grande"
                ? "w-5/12 text-center rounded-md mt-6 border border-gray-500 h-[40px] px-3 bg-gradient-to-t from-black via-[#020131]  to-blue-600 text-gray-500"
                : "w-5/12 text-center rounded-md mt-6 border border-gray-500 h-[40px] px-3 bg-gradient-to-t from-black via-[#282828]  to-black text-gray-500"
            }
          >
            Guardar
          </button>
        )}
      </div>
      <Toaster />
    </>
  );
}
