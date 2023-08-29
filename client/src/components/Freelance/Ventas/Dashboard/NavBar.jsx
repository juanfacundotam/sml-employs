import React, { useState } from "react";

import {
  IoGrid,
} from "react-icons/io5";
import { MdOutlineAttachMoney } from "react-icons/md";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaHistory, FaWhatsapp } from "react-icons/fa";

export default function NavBar() {
  const path = window.location.pathname;
  const [titles, setTitles] = useState([
    {
      title: "Dashboard",
      isHovered: false,
      link: "/ventas-dashboard",
      icon: IoGrid,
    },
    {
      title: "Seguimiento",
      isHovered: false,
      link: "/ventas-agenda",
      icon: MdOutlineAttachMoney,
    },
    {
      title: "History",
      isHovered: false,
      link: "/ventas-history",
      icon: FaHistory,
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
      const updatedTitles = [...prevState]; // Crear una copia del estado
      updatedTitles[index].isHovered = false; // Actualizar el valor de isHovered en el primer objeto
      return updatedTitles;
    });
  };
  return (
    <div className=" flex gap-5 w-1">
      {titles.map((encabezado, index) => (
        <Link
          className="flex items-center justify-center gap-2 "
          to={encabezado.link}
          key={index}
        >
          {React.createElement(encabezado.icon, {
            className: `text-[2rem] text-[#ae2dff] ${
              encabezado.isHovered ? "hover:text-[#aa2afa]" : ""
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
