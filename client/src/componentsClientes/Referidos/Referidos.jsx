import { useUser } from "@clerk/clerk-react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getClientByEmail } from "../../redux/actions";
import toast, { Toaster } from "react-hot-toast";
import { IoCloseSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import NavBarDesktop from "../Landing/NavBarDesktop/NavBarDesktop";

export default function Referral({ tamañoPantalla }) {
  const [verificados, setVerificados] = useState([]);
  const [uniqueKey, setUniqueKey] = useState([]);
  const { user } = useUser();
  const userEmail = user.emailAddresses[0].emailAddress;
  const dispatch = useDispatch();
  const { client } = useSelector((state) => state);

  const checkVerifys = async () => {
    const newVerificados = [];
    const newUniqueKey = [];
    for (let i = 0; i < client.referred.length; i++) {
      const item = client.referred[i];
      const response = await axios.get(`/clientes/user?email=${item}`);
      const verify = response.data.verify;
      const uID = response.data._id;
      newVerificados.push(verify);
      newUniqueKey.push(uID);
    }

    setVerificados(newVerificados);
    setUniqueKey(newUniqueKey);
  };
  useEffect(() => {
    dispatch(getClientByEmail(userEmail && userEmail));
    checkVerifys();
  }, [dispatch]);

  const copyRefSuccess = () => {
    toast.success("Codigo de Referido Copiado.", {
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

  const copyRefLink = () => {
    navigator.clipboard.writeText(
      `http://localhost:5173/clientes-home?ref=${userEmail && userEmail}`
    );
    copyRefSuccess();
  };

  return (
    <div
      className={
        tamañoPantalla === "Pequeña"
          ? "flex justify-start items-center flex-col h-screen w-full"
          : "flex justify-start items-center flex-col h-screen w-full"
      }
    >
      {tamañoPantalla === "Pequeña" ? (
        <div className="flex flex-row items-center justify-center text-center w-full mx-4">
          <p className="text-white text-24 mt-4">REFERIDOS</p>
          <Link
            to={"/clientes-home"}
            className="font-bold  md:border-2 md:border-[#211f52] md:rounded-lg hover:bg-[#2a286e] text-24 mt-4 absolute right-3 "
          >
            <IoCloseSharp className="font-bold text-[#fff] text-[2rem]" />
          </Link>
        </div>
      ) : (
        <div className="w-screen">
          <NavBarDesktop />
        </div>
      )}
      <div
        className={
          tamañoPantalla === "Pequeña"
            ? "h-3/6 w-full items-start overflow-auto px-4 mt-6 bg-transparent border-opacity-5 border rounded-lg border-blue-500 bg-[#282828]"
            : "h-3/6 w-full items-start overflow-auto px-4 mt-6 bg-transparent border-opacity-5 border rounded-lg border-blue-500 bg-[#363559]"
        }
      >
        {client && client.referred[0] ? (
          client.referred.map((item, index) => (
            <div className="flex items-center justify-between" key={index}>
              <p className="m-4">{item}</p>
              {verificados[index] && verificados[index] === true ? (
                <p>✅</p>
              ) : null}
            </div>
          ))
        ) : (
          <div>
            <p className="text-center">No tienes referidos!</p>
          </div>
        )}
      </div>
      <p className="text-center mt-4">
        Beneficios: Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Soluta, ullam, voluptatem dolorem iste placeat beatae, blanditiis vel
        debitis veritatis excepturi minus! Odio corporis pariatur, sapiente
        ullam facilis et accusantium ipsum?
      </p>
      <button
        onClick={copyRefLink}
        className="w-11/12 text-center rounded-md mt-6 border border-white h-[40px] px-3 bg-gradient-to-t from-black via-[#020131]  to-blue-600 text-white justify-center items-center flex "
      >
        Copiar Link de Referido!
      </button>
      <Toaster />
    </div>
  );
}
