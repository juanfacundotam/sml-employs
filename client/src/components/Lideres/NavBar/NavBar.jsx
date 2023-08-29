import React, { useState } from "react";
import { CiWarning } from "react-icons/ci";
import {
  IoGrid,
  IoLogoSnapchat,
  IoStatsChart,
  IoRocketOutline,
  IoCashOutline,
  IoTrashOutline,
} from "react-icons/io5";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function NavBar() {
  const path = window.location.pathname;
  const [titles, setTitles] = useState([
    {
      title: "Empleados",
      isHovered: false,
      link: "/lideres",
      icon: IoGrid,
    },
    {
      title: "Seguimiento",
      isHovered: false,
      link: "/contratando/",
      icon: IoCashOutline,
    },
    {
      title: "Freelancers",
      isHovered: false,
      link: "/lideres-freelancer/",
      icon: IoLogoSnapchat,
    },
    {
      title: "Analíticas",
      isHovered: false,
      link: "/lideres-analytics",
      icon: IoStatsChart,
    },
    {
      title: "Promociones",
      isHovered: false,
      link: "/promociones",
      icon: IoRocketOutline,
    },
    {
      title: "Incidencias",
      isHovered: false,
      link: "/lideres-incidences",
      icon: CiWarning,
    },
    {
      title: "Descartados",
      isHovered: false,
      link: "/incidences-history",
      icon: IoTrashOutline,
    },
  ]);

  const handleMouseEnter = (index) => {
    setTitles((prevState) => {
      const updatedTitles = [...prevState]; // Crear una copia del estado
      updatedTitles[index].isHovered = true; // Actualizar el valor de isHovered en el primer objeto
      return updatedTitles;
    });
  };

  const handleMouseLeave = (index) => {
    setTitles((prevState) => {
      const updatedTitles = [...prevState]; // Crear una copia del Estado
      updatedTitles[index].isHovered = false; // Actualizar el valor de isHovered en el primer objeto
      return updatedTitles;
    });
  };
  return (
    <div className="flex gap-2 w-[9rem]">
      {titles.map((encabezado, index) => (
        <Link
          className="flex items-center justify-center gap-2 "
          to={encabezado.link}
          key={index}
        >
          {React.createElement(encabezado.icon, {
            className: `text-[2rem] text-[#ae2dff] ${
              encabezado.isHovered ? "hover:text-[#a020f0]" : ""
            }`,
            onMouseEnter: () => handleMouseEnter(index),
            onMouseLeave: () => handleMouseLeave(index),
          })}
          <motion.div
            className="flex items-center gap-2 text-white h-full "
            style={{
              width: encabezado.isHovered ? "fit-content" : "2rem",
            }}
            initial={{ width: path === encabezado.link ? 100 : 0 }}
            animate={{
              width:
                path === encabezado.link ? 100 : encabezado.isHovered ? 100 : 0,
            }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {encabezado.isHovered ? (
              <motion.p
                className="text-white"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                {encabezado.title}
              </motion.p>
            ) : (
              path === encabezado.link && (
                <motion.p
                  className="text-white"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  {encabezado.title}
                </motion.p>
              )
            )}
          </motion.div>
        </Link>
      ))}
    </div>
  );
}
