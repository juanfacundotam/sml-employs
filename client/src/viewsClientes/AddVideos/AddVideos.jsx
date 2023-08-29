import { useUser } from "@clerk/clerk-react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import HistoryVideos from "../../componentsClientes/HistoryVideos/HistoryVideos";
import { getClientByEmail } from "../../redux/actions";
import toast, { Toaster } from "react-hot-toast";
import NavBarDesktop from "../../componentsClientes/Landing/NavBarDesktop/NavBarDesktop";
import background from "../../Assets/borde1.webp";

export default function AddVideos() {
  const [link, setLink] = useState("");
  const [linkError, setLinkError] = useState("");
  const { user } = useUser();
  const userEmail = user?.emailAddresses[0].emailAddress;
  const dispatch = useDispatch();
  const { client } = useSelector((state) => state);

  const [tamañoPantalla, setTamañoPantalla] = useState("");

  useEffect(() => {
    dispatch(getClientByEmail(userEmail && userEmail));
  }, [dispatch, userEmail]);

  useEffect(() => {}, [client]);

  // Para obtener el tamaño de la pantalla en cada renderizado
  useEffect(() => {
    const { innerWidth } = window;
    if (innerWidth < 768) {
      setTamañoPantalla("Pequeña");
    } else {
      setTamañoPantalla("Grande");
    }
  }, []);

  const newLinkVideo = async () => {
    if (isInstagramPost(link) || isTikTokPost(link)) {
      const currentDate = new Date(Date.now());
      const social = link.slice(12, 13) === "i" ? "Instagram" : "Tiktok";
      const body = {
        videosPublicados: { link: link, date: currentDate, social: social },
      };
      try {
        await axios.put(`/clientes/addvideo?email=${userEmail}`, body);
        setLinkError("");
        setLink("");
        sendLinkSuccess();
        dispatch(getClientByEmail(userEmail && userEmail));
      } catch (error) {}
    } else {
      setLinkError("El link no corresponde a una publicacion");
    }
  };

  // Verificar si son links de publicaciones de tiktok o instagram ***********************************************
  const instagramPostRegex =
    /^https?:\/\/(www\.)?instagram\.com\/p\/([a-zA-Z0-9_\-]+)\/?$/;
  function isInstagramPost(link) {
    return instagramPostRegex.test(link);
  }
  const tiktokPostRegex =
    /^https?:\/\/(www\.)?tiktok\.com\/(v|@[\w.-]+\/video\/\d+)\/?$/;
  function isTikTokPost(link) {
    return tiktokPostRegex.test(link);
  }

  const sendLinkSuccess = () => {
    toast.success("Publicacion enviada!", {
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
          ? "flex bg-[#1A1A1A]  flex-col gap-2 justify-start items-center h-screen w-screen pt-10"
          : "flex bg-[#020131]  flex-col gap-2 justify-start items-center h-screen w-screen "
      }
      style={styles()}
    >
      {tamañoPantalla === "Pequeña" ? (
        <div className="flex ">
          <p className="text-24 font-extrabold text-white">Videos</p>
          <Link to={"/clientes-home"}>
            <p className="text-24 text-center font-extrabold text-white absolute right-4">
              x
            </p>
          </Link>
        </div>
      ) : (
        <div className="w-screen">
          <NavBarDesktop />
        </div>
      )}
      <div className=" mx-10 mt-4">
        <h2
          className={
            tamañoPantalla === "Pequeña"
              ? "font-medium text-neutral-100 text-center text-14"
              : "font-medium text-neutral-100 text-center text-24"
          }
        >
          Copia y pega el link de tu nuevo video para añadirlo
        </h2>
      </div>
      <div className="w-[390px] flex justify-center items-center flex-row mt-5 text-[22px] h-[33px] px-6">
        <input
          className="text-black   rounded-lg  text-center text-[16px] rounded-l-full h-[33px] w-11/12"
          type="text"
          value={link}
          onChange={(event) => setLink(event.target.value)}
          placeholder="Ingrese su link..."
        />
        <div
          className="text-white px-2 rounded-r-full  bg-[#07a1f8] hover:bg-[#127fbe] h-[33px]"
          onClick={newLinkVideo}
        >
          <p className="text-[22px] text-center">Añadir</p>
        </div>
      </div>
      {linkError ? <span className="text-yellow-500">{linkError}</span> : null}
      <HistoryVideos
        tamañoPantalla={tamañoPantalla}
        videosPublicados={client?.videosPublicados}
        fechaVideo={client?.createdAt}
      />
      <Toaster />
    </div>
  );
}
