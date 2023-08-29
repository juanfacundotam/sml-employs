import React from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { IoSettingsOutline } from "react-icons/io5";
import { AiOutlineVideoCameraAdd } from "react-icons/ai";
import logo from "../../../Assets/smllogo.svg";

export default function NavBarDesktop() {
  const nameIG = localStorage.getItem("instagram");

  const location = useLocation();

  return (
    <div className="flex justify-center items-center ">
      <div className="flex items-center justify-around w-10/12 mt-4 rounded-lg bg-[#D9D9D9] bg-opacity-25">
        <Link to="/clientes-home" className="relative">
          <div className="relative w-[5rem] h-[5rem] rounded-full overflow-hidden">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `url(${logo})`,
                backgroundSize: "cover",
              }}
            ></div>
          </div>
        </Link>

        <Link
          to="/clientes-home"
          className={`font-bold  hover:text-white ${
            location.pathname === "/clientes-home"
              ? "text-black shadow-2xl"
              : "text-white"
          }`}
          style={
            location.pathname === "/clientes-home"
              ? { textShadow: "0 0 10px rgba(255, 255, 255, 1)" }
              : null
          }
        >
          Vista General
        </Link>
        <Link
          to="/clientes-trofeos"
          className={`font-bold  hover:text-white ${
            location.pathname === "/clientes-trofeos"
              ? "text-black"
              : "text-white"
          }`}
          style={
            location.pathname === "/clientes-trofeos"
              ? { textShadow: "0 0 10px rgba(255, 255, 255, 1)" }
              : null
          }
        >
          Trofeos
        </Link>
        <Link
          to="/clientes-recursos"
          className={`font-bold  hover:text-white ${
            location.pathname === "/clientes-recursos"
              ? "text-black"
              : "text-white"
          }`}
          style={
            location.pathname === "/clientes-recursos"
              ? { textShadow: "0 0 10px rgba(255, 255, 255, 1)" }
              : null
          }
        >
          Recursos
        </Link>
        <Link
          to="/clientes-experiencia"
          className={`font-bold  hover:text-white ${
            location.pathname === "/clientes-experiencia"
              ? "text-black"
              : "text-white"
          }`}
          style={
            location.pathname === "/clientes-experiencia"
              ? { textShadow: "0 0 10px rgba(255, 255, 255, 1)" }
              : null
          }
        >
          Experiencia
        </Link>
        <Link
          to="/clientes-home"
          className={`font-bold  hover:text-white ${
            location.pathname === "/clientes-contactenos"
              ? "text-black"
              : "text-white"
          }`}
          style={
            location.pathname === "/clientes-contactenos"
              ? { textShadow: "0 0 10px rgba(255, 255, 255, 1)" }
              : null
          }
        >
          Contactenos
        </Link>

        {nameIG !== "" ? (
          <span className="text-xl">@{nameIG}</span>
        ) : (
          <Link to="/clientes-settings">
            <button className="border-2 border-[#07A1F8] bg-[#07A1F8] text-white px-6 py-2  rounded-full">
              Agregar Instagram
            </button>
          </Link>
        )}

        <Link
          to="/clientes-guiones"
          className="font-bold  md:border-2 md:border-[#211f52] md:rounded-lg hover:bg-[#2a286e] "
        >
          <AiOutlineVideoCameraAdd
            className="font-bold"
            color="#fff"
            size={24}
          />
        </Link>
        <Link
          to="/clientes-addvideos"
          className="font-bold hover:bg-[#2a286e] "
        >
          <AiOutlineVideoCameraAdd
            className="font-bold"
            color="#fff"
            size={30}
          />
        </Link>
        <Link
          to="/clientes-settings"
          className="flex justify-center items-center font-bold"
        >
          <IoSettingsOutline className="font-bold" color="#fff" size={26} />
        </Link>
      </div>
    </div>
  );
}
