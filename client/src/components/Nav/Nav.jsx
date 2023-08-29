import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./Nav.module.css";
import { useClerk, useUser } from "@clerk/clerk-react";
import logo from "../../Assets/smllogo.webp";
import {
  IoStatsChart,
  IoSettingsSharp,
  IoGrid,
  IoPeople,
  IoExitOutline,
  IoLogoSnapchat,
} from "react-icons/io5";
import { motion } from "framer-motion";
import {
  getAllClevel,
  getAllCorredores,
  getAllFreelancer,
  getAllLeader,
  getAllVendedores,
  getEmployees,
} from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

function Nav() {
  const dispatch = useDispatch();
  const { signOut } = useClerk();
  const { employees } = useSelector((state) => state);
  const corredores = useSelector((state) => state.corredores);
  const vendedores = useSelector((state) => state.vendedores);
  const leader = useSelector((state) => state.leader);
  const clevel = useSelector((state) => state.clevel);
  const freelancer = useSelector((state) => state.freelancer);

  const roleReady = localStorage.getItem("roleReady");
  const isEmployee = localStorage.getItem("isEmployeeReady");
  const email = localStorage.getItem("email");
  const photo = localStorage.getItem("photo");
  const nameEmploy = localStorage.getItem("nameEmploy");

  const user = useUser().user;
  const userEmail = email;
  const fullName = nameEmploy;
  const imageUrl = photo || user.imageUrl;

  const handleLogout = async () => {
    await signOut();
    localStorage.clear();
  };

  const allEmployees = [
    ...corredores,
    ...vendedores,
    ...clevel,
    ...leader,
    ...freelancer,
  ];

  const selectedEmployee = allEmployees.find(
    (employee) => employee.email === userEmail
  );

  useEffect(() => {
    dispatch(getAllCorredores());
    dispatch(getAllVendedores());
    dispatch(getAllLeader());
    dispatch(getAllClevel());
    dispatch(getAllFreelancer());
    const fetchEmployees = async () => {
      try {
        const response = await axios.get("/employees");
        const employeesData = response.data;

        dispatch(getEmployees(employeesData));
      } catch (error) {
        console.error("Error al obtener los empleados:", error);
      }
    };

    fetchEmployees();
  }, [dispatch]);

  return (
    <div className="bg-[#39394B] flex flex-col justify-between items-center h-screen min-w-[190px]">
      <div className="flex flex-col items-center justify-center mt-4">
        <div className="flex flex-col items-center justify-center">
          <Link to={"/protected"}>
            <img
              className="opacity-80 w-44"
              src={logo}
              // src="https://i.postimg.cc/Kvj4Yr5X/White-Logo-Social-Media-Lab.webp"
            />
          </Link>
        </div>

        {!isEmployee || !roleReady ? (
          <div className={styles.loader}></div>
        ) : (
          <div className=" flex  w-fit mt-4 ">
            {roleReady === "clevel" || roleReady === "leader" ? (
              <ul className="flex flex-col gap-2">
                <div className="flex flex-col gap-20">
                  <div>
                    <li className="flex gap-2 items-center text-[18px]">
                      <span className=" text-lg">
                        <IoPeople className="text-[#e0dddd]" />
                      </span>
                      <span>
                        <Link
                          to="/clevel"
                          className=" text-[#e0dddd] hover:text-white"
                        >
                          Empleados
                        </Link>
                      </span>
                    </li>
                    <li className="flex gap-2 items-center text-[18px]">
                      <span className=" text-lg">
                        <IoGrid className="text-[#e0dddd]" />
                      </span>
                      <span>
                        <Link
                          to="/lideres"
                          className=" text-[#e0dddd] hover:text-white"
                        >
                          Dashboard
                        </Link>
                      </span>
                    </li>

                    <li className="flex gap-2 items-center text-[18px] text-white">
                      <span className="text-[1.5rem]">
                        <IoStatsChart className="w-4 text-[#e0dddd]" />
                      </span>
                      <span>
                        <Link
                          to="/analytics"
                          className="text-[#e0dddd] hover:text-white"
                        >
                          Estadísticas
                        </Link>
                      </span>
                    </li>
                    <li className="flex gap-2 items-center text-[18px]">
                      <span className=" text-lg">
                        <IoGrid className="text-[#e0dddd]" />
                      </span>
                      <span>
                        <Link
                          to="/corredores"
                          className=" text-[#e0dddd] hover:text-white"
                        >
                          Corredores
                        </Link>
                      </span>
                    </li>
                    <li className="flex gap-2 items-center text-[18px]">
                      <span className=" text-lg">
                        <IoGrid className="text-[#e0dddd]" />
                      </span>
                      <span>
                        <Link
                          to="/vendedores"
                          className=" text-[#e0dddd] hover:text-white"
                        >
                          Vendedores
                        </Link>
                      </span>
                    </li>

                    <li className="flex gap-2 items-center text-[18px]">
                      <span className=" text-lg">
                        <IoSettingsSharp className="text-[#e0dddd]" />
                      </span>
                      <span>
                        <Link
                          to="/settings"
                          className=" text-[#e0dddd] hover:text-white"
                        >
                          Configuración
                        </Link>
                      </span>
                    </li>
                  </div>
                </div>
              </ul>
            ) : roleReady === "vendedor" ? (
              <ul className="flex flex-col gap-2">
                <li className="flex gap-2 items-center text-[18px]">
                  <span className=" text-lg">
                    <IoGrid className="text-[#e0dddd]" />
                  </span>
                  <span>
                    <Link
                      to="/vendedores"
                      className=" text-[#e0dddd] hover:text-white"
                    >
                      Dashboard
                    </Link>
                  </span>
                </li>
                <li className="flex gap-2 items-center text-[18px]">
                  <span className=" text-lg">
                    <IoStatsChart className="text-[#e0dddd]" />
                  </span>
                  <span>
                    <Link
                      to="/vendedores-history"
                      className=" text-[#e0dddd] hover:text-white"
                    >
                      Estadísticas
                    </Link>
                  </span>
                </li>
                <li className="flex gap-2 items-center text-[18px]">
                  <span className=" text-lg">
                    <IoSettingsSharp className="text-[#e0dddd]" />
                  </span>
                  <span>
                    <Link
                      to="/settings"
                      className=" text-[#e0dddd] hover:text-white"
                    >
                      Configuración
                    </Link>
                  </span>
                </li>
              </ul>
            ) : roleReady === "corredor" ? (
              <ul className="flex flex-col gap-2">
                <li className="flex gap-2 items-center text-[18px]">
                  <span className=" text-lg">
                    <IoGrid className="text-[#e0dddd]" />
                  </span>
                  <span>
                    <Link
                      to="/corredores"
                      className=" text-[#e0dddd] hover:text-white"
                    >
                      Dashboard
                    </Link>
                  </span>
                </li>
                <li className="flex gap-2 items-center text-[18px] text-white">
                  <span className="text-[1.5rem]">
                    <IoStatsChart className="w-4 text-[#e0dddd]" />
                  </span>
                  <span>
                    <Link
                      to="/corredores-history"
                      className="text-[#e0dddd] hover:text-white"
                    >
                      Estadísticas
                    </Link>
                  </span>
                </li>
                <li className="flex gap-2 items-center text-[18px]">
                  <span className=" text-lg">
                    <IoSettingsSharp className="text-[#e0dddd]" />
                  </span>
                  <span>
                    <Link
                      to="/settings"
                      className=" text-[#e0dddd] hover:text-white"
                    >
                      Configuración
                    </Link>
                  </span>
                </li>
              </ul>
            ) : (
              <ul>
                <li className="flex gap-2 items-center text-[18px]">
                  <span className=" text-lg">
                    <IoGrid className="text-[#e0dddd]" />
                  </span>
                  <span>
                    <Link
                      to="/clasificacion"
                      className=" text-[#e0dddd] hover:text-white"
                    >
                      Clasificación
                    </Link>
                  </span>
                </li>
                <li className="flex gap-2 items-center text-[18px]">
                  <span className=" text-lg">
                    <IoGrid className="text-[#e0dddd]" />
                  </span>
                  <span>
                    <Link
                      to="/ventas-dashboard"
                      className=" text-[#e0dddd] hover:text-white"
                    >
                      Ventas
                    </Link>
                  </span>
                </li>
                <li className="flex gap-2 items-center text-[18px]">
                  <span className=" text-lg">
                    <IoSettingsSharp className="text-[#e0dddd]" />
                  </span>
                  <span>
                    <Link
                      to="/settings"
                      className=" text-[#e0dddd] hover:text-white"
                    >
                      Configuración
                    </Link>
                  </span>
                </li>
              </ul>
            )}
          </div>
        )}
      </div>

      <div className="flex flex-col justify-center w-full items-center mb-5">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3 }}
          className="flex flex-col gap-5 items-center justify-center"
        >
          <div className="w-16 h-16">
            <img
              className="rounded-full"
              src={selectedEmployee && selectedEmployee.photo}
              alt="avatar"
            />
          </div>
          <div className="flex flex-col gap-1 mb-2">
            <p className="text-[.7rem] text-white">
              {selectedEmployee && selectedEmployee.email}
            </p>
            <p className="text-[.7rem] text-white text-center">
              {selectedEmployee && selectedEmployee.name}
            </p>
          </div>
        </motion.div>
        <Link to="/">
          <button
            onClick={handleLogout}
            className={`flex items-center justify-center gap-2 mt-3 ${styles.boton}`}
          >
            <IoExitOutline className={styles.icono} /> <p>Salir</p>
          </button>
        </Link>
        <p className="text-[0.7rem] mt-2">Version 0.0.58</p>
      </div>
    </div>
  );
}

export default Nav;
