import style from "./VentasDashboard.module.css";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Modal from "./Modal/Modal";
import ModalIntelligentInfo from "./Modal/ModalIntelligenceInfo";
import ModalObservaciones from "./Modal/ModalObservaciones";
import { IoGrid } from "react-icons/io5";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaHistory, FaWhatsapp } from "react-icons/fa";
import { MdOutlineAttachMoney } from "react-icons/md";
import { useUser } from "@clerk/clerk-react";
import { CiWarning, CiInstagram, CiMail } from "react-icons/ci";
import InputRunner from "./Select/InputRunner";
import PaginationOutlined from "../../../pagination/PaginationOutlined";
import {
  filterLevel,
  getLeadCheckedFreelance,
  getAllProfesionFreelance,
  getAllCountriesFreelance,
} from "../../../../redux/actions";
import Nav from "../../../Nav/Nav";
import { motion } from "framer-motion";
import PagosInfo from "../../../PagosInfo/PagosInfo";
import NavBar from "./NavBar";

const VentasDashboard = () => {
  const [data, setData] = useState([]);
  const { vendedoresDashboard } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [showCopiedMessage, setShowCopiedMessage] = useState(false);
  const [openModalPago, setOpenModalPago] = useState(false);
  const [saveEmailApp, setSaveEmailApp] = useState("");
  const [profesion, setProfesion] = useState("");
  const [country, setCountry] = useState("");
  const [level, setLevel] = useState("");
  const [freelancer, setFreelancer] = useState("");

  const [loader, setLoader] = useState(false);
  const loaderFuncion = (status) => {
    setLoader(status);
  };

  const user = useUser().user;
  const email = user?.emailAddresses[0]?.emailAddress;
  localStorage.setItem("email", email);
  let emailAddress = localStorage.getItem("email");
  let fullName = localStorage.getItem("nameEmploy");

  const body = { name: fullName, email: emailAddress };

  useEffect(() => {
    loaderFuncion(true);
    dispatch(getAllProfesionFreelance(emailAddress));
    dispatch(getAllCountriesFreelance(emailAddress));
    dispatch(
      getLeadCheckedFreelance(body, profesion, country, level, freelancer)
    ).then(() => {
      loaderFuncion(false);
    });
  }, [dispatch, emailAddress]);

  useEffect(() => {
    setData(vendedoresDashboard);
  }, [vendedoresDashboard]);

  const [pageStyle, setPageStyle] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [cardXPage, setCardXpage] = useState(10);
  const indexLastCard = currentPage * cardXPage;
  const indexFirstCard = indexLastCard - cardXPage;
  const currentCard = data.slice(indexFirstCard, indexLastCard);

  const pages = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const cancelModal = () => {
    loaderFuncion(true);
    dispatch(
      getLeadCheckedFreelance(body, profesion, country, level, freelancer)
    ).then(() => {
      loaderFuncion(false);
    });
  };


  //********************************* */

  const handleCopyClick = (copyToProps) => {
    navigator.clipboard
      .writeText(copyToProps)
      .then(() => {
        setShowCopiedMessage(true);
        setTimeout(() => setShowCopiedMessage(false), 2000);
      })
      .catch((err) => alert(`Error al copiar: ${err}`));
  };

  const SendLeadAlert = () => {
    loaderFuncion(true);
    dispatch(
      getLeadCheckedFreelance(body, profesion, country, level, freelancer)
      ).then(() => {
        loaderFuncion(false);
      });
      toast.success("✔ Cliente Actualizado!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
  };
  const SendErrorUpdateAlert = () => {
    toast.error("The lead could not be updated!", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };
  const SendIncidenceAlert = () => {
    loaderFuncion(true);
    dispatch(
      getLeadCheckedFreelance(body, profesion, country, level, freelancer)
      ).then(() => {
        loaderFuncion(false);
      });
      toast.warn("incidence sent!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
  };

  const funcionHorario = (horario) => {
    const fechaHoraISO = horario;

    const fechaHora = new Date(fechaHoraISO);

    const opciones = { hour12: false };

    const fechaHoraLocal = fechaHora.toLocaleString(undefined, opciones);

    return fechaHoraLocal;
  };

  const openModalPagoFunction = () => {
    setOpenModalPago(true);
  };
  const closeModalPago = () => {
    setOpenModalPago(false);
  };

  const saveEmailAppFunction = (email) => {
    setSaveEmailApp(email);
  };

  return (
    <>
      {loader ? (
        <div className="absolute z-50 h-screen w-screen bg-black opacity-95 pb-10 flex justify-center items-center">
          <div className="flex flex-col gap-5 items-center justify-center w-[30rem] p-5 h-fit rounded-xl">
            {/* <h2 className="text-white text-[2rem]">Enviando Leads!</h2> */}

            <div className="flex flex-col gap-2 p-2">
              {/* {promisesNames &&
                promisesNames.map((item) => {
                  return (
                    <h2 key={item._id} className="text-white m-1">
                      {item}
                    </h2>
                  );
                })} */}
            </div>

            <div className="lds-roller">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        </div>
      ) : null}
      
      <Nav />
      <div className="relative flex flex-col justify-between items-center w-screen  z-0">
        <div className="w-full flex flex-col justify-center items-center">
          {showCopiedMessage && (
            <p className="z-10 absolute top-5 w-52 text-[#fff] font-bold flex justify-center gap-5 items-center rounded-xl py-4  bg-[#238d5b] hover:bg-[#3f437a] cursor-pointer">
              Copiado!
            </p>
          )}
          <div className={style.divTitle}>
            <div className="flex w-full h-10">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0 }}
                className="font-bold text-[#e2e2e2] w-28 text-lg mx-5"
              >
                <NavBar />
              </motion.div>
            </div>

            {/* <motion.h1
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0 }}
              className="font-bold text-[#e2e2e2] w-28 text-lg mx-5 mt-2"
            >
              Dashboard
            </motion.h1> */}
            {/* <div className="flex gap-7">
              <Link to={"/ventas-dashboard"}>
                <IoGrid className="text-[2rem] text-[#418df0] hover:text-[#3570bd]" />
              </Link>
              <Link to={"/ventas-agenda"}>
                <MdOutlineAttachMoney className="text-[2rem] text-[#418df0] hover:text-[#3570bd]" />
              </Link>
              <Link className="text-5xl" to={"/ventas-history"}>
                <FaHistory className="text-[2rem] text-[#418df0] hover:text-[#3570bd]" />
              </Link>
            </div> */}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="flex gap-5 justify-center items-center h-fit mb-6"
          >
            <InputRunner
            loaderFuncion={loaderFuncion}
              getLeadCheckedFreelance={getLeadCheckedFreelance}
              body={body}
              emailAddress={emailAddress}
              profesion={profesion}
              setProfesion={setProfesion}
              country={country}
              setCountry={setCountry}
              level={level}
              setLevel={setLevel}
              freelancer={freelancer}
              setFreelancer={setFreelancer}
            />
          </motion.div>

          {!openModalPago ? (
            <>
              {vendedoresDashboard.length ? (
                <motion.div
                  initial={{ opacity: 0, y: "30px" }}
                  whileInView={{ y: "10px", opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0 }}
                  className={style.table}
                >
                  <div className="flex justify-start items-center  mx-6">
                    <label className="text-start w-[15%] px-3">Nombre</label>
                    <label className="text-start w-[15%] px-3">Profesión</label>
                    <label className="text-start w-[10%] px-3">País</label>
                    <label className="text-center w-[5%] ">Email</label>
                    <label className="text-center w-[5%] ">Instagram</label>
                    <label className="text-center w-[15%] ">Teléfono</label>
                    <label className="text-center w-[5%]">Nivel</label>
                    <label className="text-center w-[20%] ">Estado</label>
                    <label className="text-start w-[10%] "></label>
                  </div>

                  <div className="">
                    {currentCard.map((item, index) => (
                      <div
                        key={index}
                        className=" flex items-center justify-start bg-[#39394B] text-sm text-gray-300 p-2 m-3 h-11 rounded-lg"
                      >
                        <div className=" w-[15%] flex justify-start items-center  p-0 ">
                          <p className="w-64 p-1 px-3 rounded-full text-ellipsis text-16 opacity-1 overflow-hidden whitespace-nowrap hover:overflow-visible hover:bg-[#e3e1e1] hover:w-fit hover:text-black z-111 hover:absolute">
                            {item.name}
                          </p>
                        </div>
                        <div className=" w-[15%] flex justify-start items-center p-0 ">
                          <p className="w-40 p-1 px-3 rounded-full text-ellipsis text-16 opacity-1 overflow-hidden whitespace-nowrap hover:overflow-visible hover:bg-[#e3e1e1] hover:w-fit hover:text-black z-111 hover:absolute">
                            {item.profesion}
                          </p>
                        </div>

                        <div className=" w-[10%] flex justify-start items-center p-0">
                          <p className="text-start w-24 p-1 px-3 rounded-full text-ellipsis text-16 opacity-1 overflow-hidden whitespace-nowrap hover:overflow-visible hover:bg-[#e3e1e1] hover:w-fit hover:text-black z-111 hover:absolute">
                            {item.country}
                          </p>
                        </div>

                        <div className=" w-[5%] flex justify-center items-center p-0">
                          {item.email !== "-" ? (
                            <div onClick={() => handleCopyClick(item.email)}>
                              <div className="cursor-pointer">
                                <CiMail className="text-[35px] text-[#418df0] z-0" />
                              </div>
                            </div>
                          ) : (
                            <div>
                              <CiMail className="text-[35px] text-[#9eabbe]" />
                            </div>
                          )}
                        </div>
                        <div className=" w-[5%] flex justify-center items-center p-0">
                          {item.instagram ? (
                            <div>
                              <a
                                href={item.instagram}
                                target="_blank"
                                className="cursor-pointer"
                              >
                                <CiInstagram className="text-[35px] text-[#ff598b]" />
                              </a>
                            </div>
                          ) : (
                            <div>
                              <CiInstagram className="text-[35px] text-[#9eabbe]" />
                            </div>
                          )}
                        </div>
                        <div className=" w-[15%] flex justify-center items-center p-0 ">
                          <div className="flex w-44 justify-start items-center gap-2 relative">
                            <p
                              onClick={() => handleCopyClick(item.telephone)}
                              className="text-start w-44 p-1 cursor-pointer  px-3 rounded-full text-ellipsis text-16 opacity-1 overflow-hidden whitespace-nowrap hover:overflow-visible hover:bg-[#e3e1e1] hover:w-fit hover:text-black z-111 "
                            >
                              {item.telephone}
                            </p>
                          </div>
                          <a
                            href={`http://wa.me/${item.telephone.replace(
                              /\s+/g,
                              ""
                            )}`}
                            target="blanck"
                          >
                            <FaWhatsapp className="text-[30px] block mr-5 text-[#9eabbe] cursor-pointer hover:text-green-500 hover:text-[33px]" />
                          </a>
                        </div>
                        <div className=" w-[5%] flex justify-center items-center p-0">
                          {item.level !== "incidencia" ? (
                            <p className="bg-[#ae2dff] text-[#ffffff] w-[40px] rounded h-10 flex items-center justify-center text-[35px] drop-shadow-xl">
                              {item.level}
                            </p>
                          ) : (
                            <div className="bg-[#6254ff] text-[#e8e8e9] w-[40px] rounded h-10 flex items-center justify-center text-[35px] drop-shadow-xl">
                              <CiWarning className="text-[#fdfa3a] p-0 text-[35px] font-bold" />
                            </div>
                          )}
                        </div>
                        <div className=" w-[20%] flex justify-center items-start p-0">
                          {item.status === "Sin contactar" && (
                            <p className="bg-[#a9b231] w-44 h-11 flex justify-center items-center text-white rounded-3xl text-16">
                              {item.status}
                            </p>
                          )}
                          {item.status === "No responde" && (
                            <div className="bg-[#2148b4] w-44 h-11 flex flex-col justify-center items-center text-white rounded-3xl">
                              <p className="text-16">{item.status}</p>
                              <label className="text-[14px]">
                                {funcionHorario(item.updatedAt)}
                              </label>
                            </div>
                          )}
                        </div>
                        <div className=" w-[10%] flex justify-center items-start p-0  gap-3">
                          <ModalIntelligentInfo item={item} />
                          <ModalObservaciones item={item} />
                          <Modal
                            item={item}
                            SendLeadAlert={SendLeadAlert}
                            SendIncidenceAlert={SendIncidenceAlert}
                            SendErrorUpdateAlert={SendErrorUpdateAlert}
                            emailAddress={body.email}
                            fullName={fullName}
                            cancelModal={cancelModal}
                            saveEmailAppFunction={saveEmailAppFunction}
                            openModalPagoFunction={openModalPagoFunction}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ) : (
                <div className="flex items-center justify-center w-full h-screen">
                  <h1>No hay Leads disponibles</h1>
                </div>
              )}
            </>
          ) : (
            <div className=" flex flex-col justify-center items-center w-44 mt-56 gap-7">
              <button
                className=" -top-3 -right-14 bg-[#485d94] text-white hover:bg-[#294ba7] w-10 h-10 rounded-full text-24 my-5 "
                onClick={closeModalPago}
              >
                x
              </button>
              <p
                onClick={() =>
                  handleCopyClick(
                    `http://localhost:5173/promocion-pagos?emailApp=${saveEmailApp}`
                  )
                }
                className=" w-52 text-[#fff] font-bold flex justify-center gap-5 items-center rounded-xl py-4 my-2 bg-[#474646] hover:bg-[#3f437a] cursor-pointer"
              >
                Link de Pago
              </p>
            </div>
          )}
        </div>
        {data.length > 10 && !openModalPago && (
          <div className="absolute bottom-2 mb-5">
            <PaginationOutlined
              pageStyle={pageStyle}
              setPageStyle={setPageStyle}
              cardXPage={cardXPage}
              data={data}
              pages={pages}
              current={currentPage}
            />
          </div>
        )}
        <ToastContainer />
      </div>
    </>
  );
};

export default VentasDashboard;
