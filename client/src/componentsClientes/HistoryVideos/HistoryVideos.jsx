import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import igPng from "../../Assets/instagram.webp";
import tkPng from "../../Assets/tik-tok.webp";

export default function HistoryVideos({ videosPublicados, tamañoPantalla }) {
  const [reverse, setReverse] = useState([]);

  useEffect(() => {
    setReverse(videosPublicados && videosPublicados.reverse());
  }, [videosPublicados]);

  const formatDateTime = (dateTime) => {
    const videoDate = new Date(dateTime);
    const formattedDate = `${videoDate
      .getDate()
      .toString()
      .padStart(2, "0")}/${(videoDate.getMonth() + 1)
      .toString()
      .padStart(2, "0")}/${videoDate.getFullYear().toString().slice(-2)}`;
    const formattedTime = `${videoDate
      .getHours()
      .toString()
      .padStart(2, "0")}:${videoDate.getMinutes().toString().padStart(2, "0")}`;
    return `${formattedDate} ${formattedTime}`;
  };

  return (
    <div
      className={
        tamañoPantalla === "Pequeña"
          ? "w-96 bg-[#2c2c2c] mt-4 rounded-lg px-4 mx-4 flex flex-col items-center"
          : "w-8/12  mt-4 rounded-lg px-4 mx-4 flex flex-col items-center justify-center"
      }
    >
      <p className="text-24 font-extrabold text-white  text-center w-full">
        Historial
      </p>
      <div className="flex w-full justify-center items-center">
        {videosPublicados && videosPublicados[0] ? (
          <div className="  overflow-auto h-[500px]">
            {reverse &&
              reverse.map((video, index) => (
                <div
                  key={index}
                  className={
                    tamañoPantalla === "Pequeña"
                      ? "my-2 text-ellipsis w-96 px-4 flex justify-between items-center"
                      : "my-2 text-ellipsis w-96 px-4 flex justify-between bg-[#D9D9D9] bg-opacity-25   h-20 items-center rounded-md"
                  }
                >
                  <p className="w-32">{formatDateTime(video.date)}</p>
                  <Link to={video.link} target="_blank">
                    <img
                      src={video.social === "Instagram" ? igPng : tkPng}
                      alt="tt"
                      className="w-6 h-6 mr-2"
                    />
                  </Link>
                  {tamañoPantalla === "Pequeña" ? (
                    <Link
                      to={video.link}
                      target="_blank"
                      className=" text-center"
                    >
                      <p className="text-center">
                        -{video.social === "Instagram" ? "Instagram" : "Tiktok"}
                        -
                      </p>
                    </Link>
                  ) : null}
                </div>
              ))}
          </div>
        ) : (
          <p className="text-center">No se han cargado videos</p>
        )}
      </div>
    </div>
  );
}
