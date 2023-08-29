import React, { useEffect } from "react";
import igPng from "../../Assets/instagram.webp";
import tkPng from "../../Assets/tik-tok.webp";
import gdPng from "../../Assets/googleDrive.webp";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getClientByEmail } from "../../redux/actions";
import { useUser } from "@clerk/clerk-react";

export default function Recursos({ tamañoPantalla }) {
  const { client } = useSelector((state) => state);
  const { user } = useUser();
  const userEmail = user.emailAddresses[0].emailAddress;
  const dispatch = useDispatch();
  const linkVerify = /^(ftp|http|https):\/\/[^ "]+$/;
  useEffect(() => {
    dispatch(getClientByEmail(userEmail && userEmail));
  }, [dispatch]);

  return (
    <div className="flex flex-col justify-center items-center gap-3 w-96 mt-8 ">
      {tamañoPantalla === "Pequeña" ? (
        <h1 className=" text-white text-18 w-10/12 md:w-fit">Recursos</h1>
      ) : null}

      {linkVerify.test(client && client.drive) ? (
        <Link
          to={`${client && client.drive}`}
          target={"_blank"}
          className="flex justify-start items-center  bg-[#CDE1F4] text-[#414142] font-extrabold px-3 py-0.5 rounded-full text-18 w-10/12 h-12"
        >
          <img src={gdPng} alt="icono de Tiktok" className="mx-3 w-8 h-8" />
          Mi Carpeta Drive
        </Link>
      ) : (
        <Link className="flex justify-start items-center   bg-[#E4C9F0] text-[#414142] font-extrabold px-3 py-0.5 rounded-full text-18 w-10/12 h-12">
          <img src={gdPng} alt="icono de Tiktok" className="mx-3 w-8 h-8" />
          Mi Carpeta Drive
        </Link>
      )}
      {linkVerify.test(client && client.instagram) ? (
        <Link
          to={`${client && client.instagram}`}
          target={"_blank"}
          className="flex justify-start items-center   bg-[#CDE1F4] text-[#414142] font-extrabold px-3 py-0.5 rounded-full text-18 w-10/12 h-12"
        >
          <img src={igPng} alt="icono de Tiktok" className="mx-3 w-8 h-8" />
          Mi Instagram
        </Link>
      ) : (
        <Link className="flex justify-start items-center  bg-[#E4C9F0] text-[#414142]  font-extrabold px-3 py-0.5 rounded-full text-18 w-10/12 h-12">
          <img src={igPng} alt="icono de Tiktok" className="mx-3 w-8 h-8" />
          Mi Instagram
        </Link>
      )}
      {linkVerify.test(client && client.tiktok) ? (
        <Link
          to={`${client && client.tiktok}`}
          target={"_blank"}
          className="flex justify-start items-center   bg-[#CDE1F4] text-[#414142] font-extrabold  px-3 py-0.5 rounded-full text-18 w-10/12 h-12"
        >
          <img src={tkPng} alt="icono de Tiktok" className="mx-3 w-8 h-8" />
          Mi Tiktok
        </Link>
      ) : (
        <Link className="flex justify-start items-center   bg-[#E4C9F0] text-[#414142] font-extrabold px-3 py-0.5 rounded-full text-18 w-10/12 h-12">
          <img src={tkPng} alt="icono de Tiktok" className="mx-3 w-8 h-8" />
          Mi Tiktok
        </Link>
      )}
    </div>
  );
}
