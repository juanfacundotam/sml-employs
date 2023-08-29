import React, { useState } from "react";
import background from "../../Assets/borde1.webp";
import background2 from "../../Assets/borde2.webp";
import AI22 from "../../Assets/AI22.webp";
import next1 from "../../Assets/next1.webp";
import IA21 from "../../Assets/IA21.webp";
import user1 from "../../Assets/user1.webp";
import SMLlogo from "../../Assets/smllogo.webp";
import { Link } from "react-router-dom";
import ProgressBar from "./ProgressBar/ProgressBar";
import HandleGuion from "./MUI/HandleGuion";
import HandleParametros from "./MUI/HandleParametros";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
export default function Guiones({ tamañoPantalla }) {
  const [progress, setProgress] = useState(0);

  const nextProgress = () => {
    setProgress(progress + 1);
  };
  const previousProgress = () => {
    if (progress > 0) {
      setProgress(progress - 1);
    }
  };

  const styles = () => {
    if (tamañoPantalla === "Pequeña" && progress === 0) {
      return {
        backgroundImage: `url(${background2})`,
        backgroundSize: "auto 100%",
        backgroundPosition: "left top",
        backgroundRepeat: "no-repeat",
      };
    } else {
      null;
    }
    if (tamañoPantalla === "Grande") {
      return {
        backgroundImage: `url(${background})`,
        backgroundSize: "auto 100%",
        backgroundPosition: "left top",
        backgroundRepeat: "no-repeat",
      };
    } else {
      null;
    }
  };

  return (
    <div
      className="bg-[#1a1a1a] flex flex-col justify-between items-center h-screen w-screen"
      style={styles()}
    >
      <div className="flex w-4/6 justify-between items-center mt-20">
        <div className="">
          <img src={SMLlogo} alt="" />
        </div>
      </div>

      {/* Nivel 0 */}
      {progress === 0 ? (
        <div className="flex flex-col">
          <Link to={"/clientes-estadisticas"}>
            <div
              className="flex justify-center 
         items-center gap-8"
            >
              <p className="text-white font-semibold">Estadisticas</p>
              <div className="mb-4">
                <img src={user1} alt="" />
              </div>
            </div>
          </Link>
          <div
            onClick={() => nextProgress()}
            className="flex justify-center mb-[7rem] items-center gap-8"
          >
            <p className="text-white font-semibold">Guiones</p>
            <div>
              <img src={IA21} alt="" />
            </div>
          </div>
        </div>
      ) : null}

      {/* Nivel 1 */}
      {progress === 1 ? (
        <div className="flex flex-col justify-start h-full items-center">
          <div className="flex flex-col items-center justify-center mt-5">
            <p className="text-white font-semibold text-[1.5rem]">
              Información Básica
            </p>
            <ProgressBar valor={progress} />
          </div>
          <div className="flex flex-col mt-4">
            <div className="flex flex-col gap-4 mb-4">
              <p className="text-white font-semibold">Nombre</p>
              <input
                className="w-[18rem] p-2 bg-[#282828] rounded-lg"
                type="text"
                placeholder="Nombre"
              />
            </div>
            <div className="flex flex-col gap-4">
              <p className="text-white font-semibold">
                Sector al que perteneces:
              </p>
              <div>
                <input
                  className="w-[18rem] p-2 bg-[#282828] rounded-lg"
                  type="text"
                  placeholder="Ingrese su Sector"
                  pa
                />
              </div>
            </div>
          </div>
        </div>
      ) : null}
      {/* Nivel 2 */}
      {progress === 2 ? (
        <div className="flex flex-col justify-start h-full items-center">
          <div className="flex flex-col items-center justify-center mt-5">
            <p className="text-white font-semibold text-[1.5rem]">
              Información Básica
            </p>
            <ProgressBar valor={progress} />
          </div>
          <div className="flex flex-col mt-4 h-full">
            <div className="flex flex-col gap-4 mb-4 h-full">
              <p className="text-white text-center font-semibold">
                ¿Cómo ayudas a las personas?
              </p>
              <textarea
                className="w-[18rem] h-full p-2 text-white bg-[#282828] rounded-lg"
                type="text"
                placeholder="Describe como ayudas a las personas..."
              />
            </div>
          </div>
        </div>
      ) : null}
      {/* Nivel 3 */}
      {progress === 3 ? (
        <div className="flex flex-col justify-start h-full items-center">
          <div className="flex flex-col items-center justify-center mt-5">
            <p className="text-white font-semibold text-[1.5rem]">
              Información Avanzada
            </p>
            <ProgressBar valor={progress} />
          </div>
          <div className="flex flex-col mt-4 h-full">
            <div className="flex flex-col gap-4 mb-4 h-full">
              <p className="text-white text-center font-semibold">
                ¿Qué problema tienes?
              </p>
              <textarea
                className="w-[18rem] h-full p-2 text-white bg-[#282828] rounded-lg"
                type="text"
                placeholder="Describe que problemas tienes..."
              />
            </div>
          </div>
        </div>
      ) : null}
      {/* Nivel 4 */}
      {progress === 4 ? (
        <div className="flex flex-col justify-start h-full items-center">
          <div className="flex flex-col items-center justify-center mt-5">
            <p className="text-white font-semibold text-[1.5rem]">
              Información Avanzada
            </p>
            <ProgressBar valor={progress} />
          </div>
          <div className="flex flex-col mt-4 h-full">
            <div className="flex flex-col gap-4 mb-4 h-full">
              <p className="text-white text-center font-semibold">
                ¿Qué deseas conseguir?
              </p>
              <textarea
                className="w-[18rem] h-full p-2 text-white bg-[#282828] rounded-lg"
                type="text"
                placeholder="Describe que deseas conseguir..."
              />
            </div>
          </div>
        </div>
      ) : null}
      {/* Nivel 5 */}
      {progress === 5 ? (
        <div className="flex flex-col justify-start w-10/12 h-full items-center">
          <div className="flex flex-col items-center justify-center mt-5">
            <p className="text-white font-semibold text-[1.5rem]">
              Información Avanzada
            </p>
            <ProgressBar valor={progress} />
          </div>
          <div className="flex flex-col items-center justify-center mt-4 h-full">
            <div className="flex flex-col items-center justify-center gap-4 mb-4 h-full">
              <p className="text-white text-center font-semibold">
                ¿Qué vas a conseguir gracias a tu contenido?
              </p>
              <textarea
                className="w-[18rem] h-full p-2 text-white bg-[#282828] rounded-lg"
                type="text"
                placeholder="Describe que deseas conseguir..."
              />
            </div>
          </div>
        </div>
      ) : null}
      {/* Nivel 6 */}
      {progress === 6 ? (
        <div className="flex flex-col justify-start mt-10  w-10/12 h-full">
          <div className="flex flex-col items-center justify-center">
            <p className="text-white font-semibold text-[1.5rem]">
              Crear Guión
            </p>
          </div>
          <div className="flex flex-col items-center justify-center">
            <div className="flex mt-5 flex-col gap-3 items-center justify-center">
              <div className="flex flex-col gap-2">
                <p className="text-white mt-5 font-semibold">Tipo de guión</p>
                <HandleGuion />
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-white mt-5 font-semibold">Parámetros</p>
                <HandleParametros />
              </div>
            </div>
          </div>
        </div>
      ) : null}
      {/* Nivel 7 */}
      {progress === 7 ? (
        <div className="flex justify-center items-center">
          <ProgressBar valor={progress} />
        </div>
      ) : null}
      {/* Nivel 8 */}
      {progress === 8 ? (
        <div className="flex justify-center items-center">
          <ProgressBar valor={progress} />
        </div>
      ) : null}
      {/* Nivel 9 */}
      {progress === 9 ? (
        <div className="flex justify-center items-center">
          <ProgressBar valor={progress} />
        </div>
      ) : null}
      {/* Nivel 10 */}
      {progress === 10 ? (
        <div className="flex justify-center items-center">
          <ProgressBar valor={progress} />
        </div>
      ) : null}

      <div className="flex justify-between w-10/12 mb-4">
        <div>
          <img src={AI22} alt="" />
        </div>
        <div className="flex items-center justify-center gap-5">
          {progress === 0 ? null : (
            <div onClick={() => previousProgress()}>
              <AiOutlineLeft className="text-[2rem] text-white font-semibold" />
            </div>
          )}

          {progress === 10 || progress === 0 ? null : (
            <div onClick={() => nextProgress()}>
              <AiOutlineRight className="text-[2rem] text-white font-semibold" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
