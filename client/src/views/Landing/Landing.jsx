import React from "react";
import style from "./Landing.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Nav from "../../components/Nav/Nav";
import {
  getEmployees,
  setRol,
  setAccess,
  getAllCorredores,
  getAllVendedores,
  getAllClevel,
  getAllLeader,
  getAllFreelancer,
  getAllCorredoresByEmail,
} from "../../redux/actions";
import { useUser } from "@clerk/clerk-react";
import axios from "axios";
import { motion } from "framer-motion";

function Landing() {
  const user = useUser().user;
  const userEmail = user.emailAddresses[0].emailAddress;
  const employees = useSelector((state) => state.employees);
  const dispatch = useDispatch();
  const role = useSelector((state) => state.rol);
  const access = useSelector((state) => state.isEmployee);
  const userImageUrl = user?.imageUrl;
  const corredores = useSelector((state) => state.corredores);
  const vendedores = useSelector((state) => state.vendedores);
  const leader = useSelector((state) => state.leader);
  const clevel = useSelector((state) => state.clevel);
  const freelancer = useSelector((state) => state.freelancer);
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
  const isEmployeeReady = localStorage.getItem("isEmployeeReady");
  const roleReady = localStorage.getItem("roleReady");
  const isEmployee = () => {
    return employees.some((employees) => employees.email === userEmail);
  };

  const { corredor } = useSelector((state) => state);

  const photo = selectedEmployee && selectedEmployee.photo;
  const nameEmploy = selectedEmployee && selectedEmployee.name;

  localStorage.setItem("photo", photo);

  localStorage.setItem("nameEmploy", nameEmploy);

  localStorage.setItem("email", userEmail);

  let email = localStorage.getItem("email");

  const username = corredor && corredor.name;

  useEffect(() => {
    if (userEmail !== undefined) {
      dispatch(getAllCorredoresByEmail(userEmail));
    }
  }, [dispatch, userEmail]);

  useEffect(() => {
    localStorage.setItem("corredorName", username);
  }, [corredor]);

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
        const employee = employeesData.find(
          (employees) => employees.email === userEmail
        );
        if (employee) {
          dispatch(setRol(employee.rol));
          dispatch(setAccess(isEmployee()));
        }
      } catch (error) {
        console.error("Error al obtener los empleados:", error);
      }
    };

    fetchEmployees();
  }, [dispatch, isEmployee()]);

  return (
    <>
      <Nav />
      <div className={style.container}>
        <div className="flex flex-col gap-5">
          {isEmployeeReady ? (
            <div className={style.containerWellcome}>
              {selectedEmployee?.photo ? (
                <img
                  className={style.imagen}
                  src={selectedEmployee.photo}
                  alt=""
                />
              ) : (
                <img className={style.imagen} src={userImageUrl} alt="" />
              )}
              <h1 className={style.wellcome}>Bienvenido {username} </h1>
              <h3 className={style.role}>Rol: {roleReady} </h3>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 7 }}
              className="flex flex-col gap-2 items-center justify-center bg-[#7B0BC0] px-10 py-2 rounded-lg"
            >
              <h2 className="text-white text-[2rem]">Usuario no autorizado</h2>
              <p className="text-white">Solicité acceso al líder</p>
            </motion.div>
          )}
        </div>
      </div>
    </>
  );
}

export default Landing;
