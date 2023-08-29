import style from "./VentasHistory.module.css";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { IoGrid, IoStatsChart } from "react-icons/io5";
import { FaHistory, FaWhatsapp } from "react-icons/fa";
import { CiWarning, CiInstagram, CiMail } from "react-icons/ci";
import { useUser } from "@clerk/clerk-react";
import { MdOutlineAttachMoney } from "react-icons/md";
import SelectLevel from "../Dashboard/Select/SelectLevel";
import SelectStatus from "../Dashboard/Select/SelectStatus";
import ModalHistory from "./Modal/ModalHistory";
import ModalObservaciones from "../Dashboard/Modal/ModalObservaciones";
import { ToastContainer, toast } from "react-toastify";

import PaginationOutlined from "../../../pagination/PaginationOutlined";
import {
  filterLevel,
  findVendedoresByNameAllInfo,
  getVendedorAllLeads,
} from "../../../../redux/actions";
import InputRunner from "./MUI/InputRunner";
import Nav from "../../../Nav/Nav";
import { motion } from "framer-motion";
import NavBar from "../Dashboard/NavBar";

const VentasHistory = () => {
  const [data, setData] = useState([]);
  const { vendedorAllLeadsHistory } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [showCopiedMessage, setShowCopiedMessage] = useState(false);
  const user = useUser().user;
  const email = user?.emailAddresses[0].emailAddress;
  const [openFilterName, setOpenFilterName] = useState(false);
  const [openFilterSector, setOpenFilterSector] = useState(false);
  const [openFilterPais, setOpenFilterPais] = useState(false);
  const [openFilterStatus, setOpenFilterStatus] = useState(false);
  const [filterName, setFilterName] = useState("");
  const [filterSector, setFilterSector] = useState("");
  const [filterPais, setFilterPais] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  const [fromDay, setFromDay] = useState("");
  const [toDay, setToDay] = useState("");
  const [profesion, setProfesion] = useState("");
  const [category, setCategory] = useState("");
  const [country, setCountry] = useState("");
  const [level, setLevel] = useState("");
  const [status, setStatus] = useState("");

  const [loader, setLoader] = useState(true);
  const loaderFuncion = (status) => {
    setLoader(status);
  };
  //copia para ver que onda
  localStorage.setItem("email", email);
  let emailAddress = localStorage.getItem("email");
  //-------------
  //COSAS COPIADAS
  const SendLeadAlertBaja = () => {
    toast.info("Lead dado de baja!", {
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

  const SendErrorUpdateAlertBaja = () => {
    toast.error("El lead no pudo darse de baja!", {
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
      findVendedoresByNameAllInfo(
        email,
        fromDay,
        toDay,
        profesion,
        country,
        category,
        level,
        status
      )
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
  const cancelModal = () => {
        loaderFuncion(true);
    dispatch(
      findVendedoresByNameAllInfo(
        email,
        fromDay,
        toDay,
        profesion,
        country,
        category,
        level,
        status
      )
    ).then(() => {
      loaderFuncion(false);
    });
  };
  //----------------------------------

  useEffect(() => {
            loaderFuncion(true)
    dispatch(
      getVendedorAllLeads(
        email,
        fromDay,
        toDay,
        profesion,
        country,
        category,
        level,
        status
      )
    ).then(() => {
      loaderFuncion(false)
    });
  }, [dispatch, email]);
  useEffect(() => {
    vendedorAllLeadsHistory && setData(vendedorAllLeadsHistory);
  }, [vendedorAllLeadsHistory]);

  const [pageStyle, setPageStyle] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [cardXPage, setCardXpage] = useState(10);
  const indexLastCard = currentPage * cardXPage;
  const indexFirstCard = indexLastCard - cardXPage;
  const currentCard = data && data.slice(indexFirstCard, indexLastCard);
  const pages = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const [edit, setEdit] = useState(false);
  const [editIndex, setEditIndex] = useState("");

  //FILTER********
  const [filters, setFilters] = useState({
    level: false,
    runner: false,
    sellers: false,
    status: false,
  });

  const [levelValue, setLevelValue] = useState("");
  const [statusValue, setStatusValue] = useState("");

  const onChangeLevel = (value) => {
    setLevelValue(value);
    dispatch(filterLevel(value));
    setData(vendedorAllLeadsHistory);
    setCurrentPage(1);
    if (!value) {
      setFilters({ ...filters, level: !filters.level });
    }
  };

  const onChangeName = (event) => {
    setFilters({ level: false, runner: false, sellers: false, status: false });
    setFilterName(event.target.value);
    const normalizeString = (str) =>
      str
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-zA-Z0-9]/g, "");

    const leadsFilteredName = vendedorAllLeadsHistory.filter((item) =>
      normalizeString(item.name.toLowerCase()).includes(
        normalizeString(event.target.value.toLowerCase())
      )
    );

    setData(leadsFilteredName);

    if (event.target.value === "") {
           loaderFuncion(true)
      dispatch(
        getVendedorAllLeads(
          email,
          fromDay,
          toDay,
          profesion,
          country,
          category,
          level,
          status
        )
      ).then(() => {
      loaderFuncion(false)
    });
    }
  };

  const onChangeSector = (event) => {
    setFilters({ level: false, runner: false, sellers: false, status: false });
    setFilterSector(event.target.value);

    const normalizeString = (str) =>
      str
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-zA-Z0-9]/g, "");

    const leadsFilteredSector = vendedorAllLeadsHistory.filter((item) =>
      normalizeString(item.category.toLowerCase()).includes(
        normalizeString(event.target.value.toLowerCase())
      )
    );

    setData(leadsFilteredSector);
    if (event.target.value === "") {
                 loaderFuncion(true)
      dispatch(getVendedorAllLeads(email)).then(() => {
      loaderFuncion(false)
    });
    }
  };
  const onChangePais = (event) => {
    setFilters({ level: false, runner: false, sellers: false, status: false });
    setFilterPais(event.target.value);

    const normalizeString = (str) =>
      str
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-zA-Z0-9]/g, "");

    const leadsFilteredPais = vendedorAllLeadsHistory.filter((item) =>
      normalizeString(item.province.toLowerCase()).includes(
        normalizeString(event.target.value.toLowerCase())
      )
    );

    setData(leadsFilteredPais);
    if (event.target.value === "") {
                 loaderFuncion(true)
      dispatch(getVendedorAllLeads(email)).then(() => {
      loaderFuncion(false)
    });
    }
  };

  const onChangeStatus = (value) => {
    setFilters({ level: false, runner: false, sellers: false, status: false });
    setStatusValue(value);

    const leadsFilteredStatus = vendedorAllLeadsHistory.filter(
      (item) => item.status === value
    );

    setData(leadsFilteredStatus);
    if (value === "s") {
       loaderFuncion(true)
      setOpenFilterStatus(false);
      dispatch(getVendedorAllLeads(email)).then(() => {
      loaderFuncion(false)
    });
    }
  };

  //*********** */
  const handleCopyClick = (copyToProps) => {
    navigator.clipboard
      .writeText(copyToProps)
      .then(() => {
        setShowCopiedMessage(true);
        setTimeout(() => setShowCopiedMessage(false), 2000);
      })
      .catch((err) => alert(`Error al copiar: ${err}`));
  };

  const updateLeads = () => {
     loaderFuncion(true)
    dispatch(getVendedorAllLeads(email)).then(() => {
      loaderFuncion(false)
    });
    setData(vendedorAllLeadsHistory);
  };

  const handlerOpenFilterName = () => {
      loaderFuncion(true)
    setFilters({ level: false, runner: false, sellers: false, status: false });
    setOpenFilterSector(false);
    setOpenFilterPais(false);
    setOpenFilterStatus(false);
    setOpenFilterName(!openFilterName);
    setFilterSector("");
    setFilterPais("");
    dispatch(getVendedorAllLeads(email)).then(() => {
      loaderFuncion(false)
    });
  };
  const handlerOpenFilterSector = () => {
      loaderFuncion(true)
    setFilters({ level: false, runner: false, sellers: false, status: false });
    setOpenFilterName(false);
    setOpenFilterPais(false);
    setOpenFilterStatus(false);
    setOpenFilterSector(!openFilterSector);
    setFilterName("");
    setFilterPais("");
    dispatch(getVendedorAllLeads(email)).then(() => {
      loaderFuncion(false)
    });
  };
  const handlerOpenFilterPais = () => {
      loaderFuncion(true)
    setFilters({ level: false, runner: false, sellers: false, status: false });
    setOpenFilterName(false);
    setOpenFilterSector(false);
    setOpenFilterStatus(false);
    setOpenFilterPais(!openFilterPais);
    setFilterName("");
    setFilterSector("");
    dispatch(getVendedorAllLeads(email)).then(() => {
      loaderFuncion(false)
    });
  };
  const handlerOpenStatus = () => {
      loaderFuncion(true)
    setFilters({ level: false, runner: false, sellers: false, status: false });
    setOpenFilterName(false);
    setOpenFilterSector(false);
    setOpenFilterPais(false);
    setFilterPais("");
    setFilterName("");
    setFilterSector("");
    setOpenFilterStatus(!openFilterStatus);
    dispatch(getVendedorAllLeads(email)).then(() => {
      loaderFuncion(false)
    });
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

      <div className="flex flex-col justify-between items-center w-screen  z-0">
        {showCopiedMessage && (
          <p className="z-10 absolute top-5 w-52 text-[#fff] font-bold flex justify-center gap-5 items-center rounded-xl py-4  bg-[#238d5b] hover:bg-[#3f437a] cursor-pointer">
            Copiado!
          </p>
        )}

        <div className="w-full flex flex-col justify-center items-center">
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
              Historial
            </motion.h1> */}
            <div className="flex gap-7 ">
              {/* <Link to={"/ventas-dashboard"}>
                <IoGrid className="text-[2rem] text-[#418df0] hover:text-[#3570bd]" />
              </Link>
              <Link to={"/ventas-agenda"}>
                <MdOutlineAttachMoney className="text-[2rem] text-[#418df0] hover:text-[#3570bd]" />
              </Link>
              <Link className="text-5xl" to={"/ventas-history"}>
                <FaHistory className="text-[2rem] text-[#418df0] hover:text-[#3570bd]" />
              </Link> */}
              {/* <Link className="text-5xl" to={"/vendedores-analytics"}>
                <IoStatsChart className="text-[2rem] text-[#418df0] hover:text-[#3570bd]" />
              </Link> */}

              {filters.level === true ? (
                <div className=" flex justify-center items-center w-80">
                  <SelectLevel
                    onChange={onChangeLevel}
                    value={levelValue}
                    className="border-2 w-64"
                  />
                </div>
              ) : (
                ""
              )}
              {openFilterName === true ? (
                <div className=" flex justify-center items-center w-80">
                  <input
                    onChange={onChangeName}
                    value={filterName}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md  focus:ring-blue-500 focus:border-blue-500 block w-56 h-10 p-1 dark:bg-[#222131] dark:border-[#fafafa] dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Nombre"
                  />
                </div>
              ) : (
                ""
              )}
              {openFilterSector === true ? (
                <div className=" flex justify-center items-center w-80">
                  <input
                    onChange={onChangeSector}
                    value={filterSector}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md  focus:ring-blue-500 focus:border-blue-500 block w-56 h-10 p-1 dark:bg-[#222131] dark:border-[#fafafa] dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Profesión"
                  />
                </div>
              ) : (
                ""
              )}
              {openFilterPais === true ? (
                <div className=" flex justify-center items-center w-80">
                  <input
                    onChange={onChangePais}
                    value={filterPais}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md  focus:ring-blue-500 focus:border-blue-500 block w-56 h-10 p-1 dark:bg-[#222131] dark:border-[#fafafa] dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Pais"
                  />
                </div>
              ) : (
                ""
              )}
              {openFilterStatus === true ? (
                <div className=" flex justify-center items-center w-80">
                  <SelectStatus
                    onChange={onChangeStatus}
                    value={statusValue}
                    className="border-2 w-64"
                  />
                </div>
              ) : (
                ""
              )}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="flex gap-5 justify-center items-center ml-16 mt-2 mb-5"
          >
            <InputRunner
                     loaderFuncion={loaderFuncion}
              onChangeName={onChangeName}
              filterName={filterName}
              getVendedorAllLeads={getVendedorAllLeads}
              emailUser={email}
              fromDay={fromDay}
              setFromDay={setFromDay}
              toDay={toDay}
              setToDay={setToDay}
              profesion={profesion}
              setProfesion={setProfesion}
              category={category}
              setCategory={setCategory}
              country={country}
              setCountry={setCountry}
              level={level}
              setLevel={setLevel}
              status={status}
              setStatus={setStatus}
            />
          </motion.div>

          {currentCard && currentCard.length ? (
            <motion.div
              initial={{ opacity: 0, y: "30px" }}
              whileInView={{ y: "10px", opacity: 1 }}
              transition={{ duration: 0.6, delay: 0 }}
              className={style.table}
            >
              <div className="flex justify-start items-center  mx-6">
                <label
                  className="text-start w-[20%] px-3"
                  // onClick={handlerOpenFilterName}
                >
                  Nombre
                </label>
                <label className="text-start w-[15%] px-3">Profesión</label>
                <label className="text-start w-[10%] px-3">País</label>
                <label className="text-center w-[5%] ">Email</label>
                <label className="text-center w-[5%] ">Instagram</label>
                <label className="text-center w-[15%] ">Teléfono</label>
                <label className="  w-[10%] text-center">Nivel</label>
                <label className="text-center w-[12%]">Estado</label>
                <label className="text-center w-[8%]"></label>
              </div>

              <div className="">
                {currentCard &&
                  currentCard.map((item, index) => (
                    <div
                      key={item._id}
                      className=" flex items-center justify-start bg-[#39394B] text-sm text-gray-300 p-2 m-3 h-11 rounded-lg"
                    >
                      <div className=" w-[20%] flex justify-start items-center  p-0 ">
                        <p className="w-64 p-1 px-3 rounded-full text-ellipsis text-16 opacity-1 overflow-hidden whitespace-nowrap hover:overflow-visible hover:bg-[#e3e1e1] hover:w-fit hover:text-black z-111 hover:absolute">
                          {item.name}
                        </p>
                      </div>
                      <div className=" w-[15%] flex justify-start items-center p-0 ">
                        <p className="w-40 p-1 px-3 rounded-full text-ellipsis text-16 opacity-1 overflow-hidden whitespace-nowrap hover:overflow-visible hover:bg-[#e3e1e1] hover:w-fit hover:text-black z-111 hover:absolute">
                          {item.category}
                        </p>
                      </div>

                      <div className=" w-[10%] flex justify-start items-center p-0">
                        <p className="text-start w-24 p-1 px-3 rounded-full text-ellipsis text-16 opacity-1 overflow-hidden whitespace-nowrap hover:overflow-visible hover:bg-[#e3e1e1] hover:w-fit hover:text-black z-111 hover:absolute">
                          {item.province}
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
                          <div onClick={() => handleCopyClick(item.instagram)}>
                            <div className="cursor-pointer">
                              <CiInstagram className="text-[35px]  text-[#ff598b]" />
                            </div>
                          </div>
                        ) : (
                          <div>
                            <CiInstagram className="text-[35px] text-[#9eabbe]" />
                          </div>
                        )}
                      </div>
                      <div className=" w-[15%] flex justify-center items-center p-0 ">
                        <div className="flex w-40 justify-start items-center gap-2 relative">
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
                      <div className=" w-[10%] flex justify-center items-center p-0">
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
                      <div className=" w-[12%] flex justify-center items-start p-0">
                        {item.status === "Contratado" && (
                          <p className="bg-[#26af7f] w-44 h-11 flex justify-center items-center text-white rounded-3xl text-16">
                            Contratado
                          </p>
                        )}
                        {item.status === "No responde" && (
                          <p className="bg-[#2148b4] w-44 h-11 flex justify-center items-center text-white rounded-3xl text-16">
                            Sin contestar
                          </p>
                        )}
                        {item.status === "Rechazado" && (
                          <p className="bg-[#ac4242] w-44 h-11 flex justify-center items-center text-white rounded-3xl text-16">
                            Rechazado
                          </p>
                        )}
                        {item.status === "Agenda llamada" && (
                          <div className="bg-[#5bac42] w-44 h-11 flex flex-col justify-center items-center text-white rounded-3xl text-16">
                            <p>Agenda llamada</p>
                          </div>
                        )}
                        {item.status === "Contactado" && (
                          <div className="bg-[#219bac] w-44 h-11 flex flex-col justify-center items-center text-white rounded-3xl text-16">
                            <p>Contactado</p>
                          </div>
                        )}
                        {item.status === "A pagar" && (
                          <div className="bg-[#972892] w-44 h-11 flex flex-col justify-center items-center text-white rounded-3xl text-16">
                            <p>A pagar</p>
                          </div>
                        )}
                        {item.status === "En proceso" && (
                          <div className="bg-[#d87e17] w-44 h-11 flex flex-col justify-center items-center text-white rounded-3xl text-16">
                            <p>En proceso</p>
                          </div>
                        )}
                        {item.level === "incidencia" && (
                          <p className="bg-[#e5fc18] w-44 h-11 flex justify-center items-center text-black rounded-3xl text-16">
                            Incidencia
                          </p>
                        )}
                      </div>
                      <div className=" w-[8%] flex justify-end items-center p-0 gap-3">
                        {(item.status === "Contratado" ||
                          item.status === "A pagar") && (
                          <ModalHistory
                            item={item}
                            SendLeadAlertBaja={SendLeadAlertBaja}
                            SendIncidenceAlert={SendIncidenceAlert}
                            SendErrorUpdateAlertBaja={SendErrorUpdateAlertBaja}
                            emailAddress={emailAddress}
                            cancelModal={cancelModal}
                          />
                        )}
                        <ModalObservaciones item={item} />
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
        </div>
        {data && data.length > 10 && (
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

export default VentasHistory;
