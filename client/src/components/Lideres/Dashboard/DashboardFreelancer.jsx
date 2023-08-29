import style from "./DashboardLeader.module.css";
import PaginationOutlined from "../../pagination/PaginationOutlined";
import { Card, Text } from "@tremor/react";
import {
  CiMail,
  CiInstagram,
  CiPhone,
  CiWarning,
  CiGlobe,
} from "react-icons/ci";
import InputRunner from "./MaterialUi/InputRunner";
import ModalCient from "./MaterialUi/ModalClient";
import AddLead from "./MaterialUi/ModalAddLead";
import Ranking from "./MaterialUi/ModalRanking";
import Nav from "../../Nav/Nav";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLeadCheckedFreelancer } from "../../../redux/actions";
import Papa from "papaparse";
import Button from "@mui/material/Button";
import axios from "axios";
import NavBar from "../NavBar/NavBar";

export const DashboardFreelancer = () => {
  // const [data, setData] = useState([]);
  const [loader, setLoader] = useState(false);
  const { leaderFreelancer } = useSelector((state) => state);
  const dispatch = useDispatch();

  const loaderFuncion = (status) => {
    setLoader(status);
  };

  useEffect(() => {
    loaderFuncion(true);
    dispatch(getLeadCheckedFreelancer()).then(() => {
      loaderFuncion(false);
    });
  }, [dispatch]);

  // useEffect(() => {
  //   setData(leaderFreelancer);
  // }, [leaderFreelancer]);

  const [pageStyle, setPageStyle] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [cardXPage, setCardXpage] = useState(8);
  const indexLastCard = currentPage * cardXPage;
  const indexFirstCard = indexLastCard - cardXPage;
  const showData = leaderFreelancer.filter((item) => {
    return (
      item.level !== "-" &&
      item.status !== "" &&
      item.corredor !== "" &&
      item.corredor !== "-" &&
      item.status !== "discard"
    );
  });
  const currentCard = showData.slice(indexFirstCard, indexLastCard);
  const pages = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const [open, setOpen] = useState(false);
  const [modalItems, setModalItems] = useState([]);
  const handleOpen = (item, index) => {
    setOpen(true);
    setModalItems(item);
  };
  const handleClose = () => setOpen(false);

  const downloadCSV = () => {
    const csv = Papa.unparse(leaderFreelancer);

    const csvData = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const csvURL = URL.createObjectURL(csvData);
    const tempLink = document.createElement("a");
    tempLink.href = csvURL;
    tempLink.setAttribute("download", "leaderFreelancer.csv");
    tempLink.click();

    const updateLeaderDashboard = async () => {
      const promises = leaderFreelancer.map((lead) =>
        axios.put(`/lead/${lead._id}`, {
          descargadosLeader: true,
        })
      );

      await Promise.all(promises);
    };

    updateLeaderDashboard();
  };

  return (
    <>
      {loader ? (
        <div className="absolute z-50 h-screen w-screen bg-black opacity-95 pb-10 flex justify-center items-center">
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
      ) : null}
      <Nav />
      <Card className="w-full h-full bg-[#222131] rounded-none p-5">
        <div className="flex justify-between mx-5 mb-10 ">
          <div className="flex gap-5">
            <NavBar />
          </div>

          <label>Leads chequeados: {showData.length}</label>

          <div className="flex gap-5">
            <Ranking />
            <Button
              variant="outlined"
              sx={{
                color: "white",
                borderColor: "#ae2dff",
                "&:hover": {
                  borderColor: "#a020f0",
                },
              }}
              onClick={downloadCSV}
            >
              Descargar CSV
            </Button>
            <AddLead />
          </div>
        </div>
        <div>
          <div className="flex gap-5 mt-5 mb-5 justify-around items-center">
            <InputRunner
              setCurrentPage={setCurrentPage}
              loaderFuncion={loaderFuncion}
            />
          </div>
        </div>
        <div className="w-full">
          <div className="text-white text-14 font-thin">
            <div className="flex items-center justify-around p-3  ">
              <div className="flex justify-center items-center p-0">
                <Text className="text-start w-28  text-white">Cliente</Text>
              </div>
              <div className="flex justify-center items-center p-0">
                <Text className="text-start w-28 text-white">Profesión</Text>
              </div>
              <div className="flex justify-center items-center p-0">
                <Text className="text-center w-6 p-0 text-white">LVL</Text>
              </div>
              <div className="flex justify-center items-center p-0">
                <Text className="text-center w-6 p-0 text-white">Web</Text>
              </div>
              <div className="flex justify-center items-center p-0">
                <Text className="text-center w-6 p-0 text-white">Mail</Text>
              </div>
              <div className="flex justify-center items-center p-0">
                <Text className="text-center w-6 p-0 text-white">IG</Text>
              </div>
              <div className="flex justify-center items-center p-0">
                <Text className="text-center w-6 p-0 text-white">Tel</Text>
              </div>
              <div className="flex justify-center items-center p-0">
                <Text className="pr-3 text-center text-white">Chequeado</Text>
              </div>
              <div className="flex justify-center items-center p-0">
                <Text className="text-start w-28  text-white">Freelancer</Text>
              </div>
              <div className="flex justify-center items-center p-0">
                <Text className="text-center w-48 p-0 text-white">Estado</Text>
              </div>
            </div>
          </div>

          <div>
            <ModalCient
              open={open}
              handleClose={handleClose}
              modalItems={modalItems}
            />
            {currentCard.length > 0 ? (
              currentCard.map((item, index) => (
                <div
                  key={item._id}
                  className="flex bg-[#39394b] text-gray-400 text-sm p-3 rounded-lg h-11 my-3"
                >
                  <div className="w-full flex justify-around items-center">
                    <button
                      className="w-full flex justify-around items-center"
                      onClick={(index) => handleOpen(item, index)}
                    >
                      <div className="flex justify-center items-center p-0 ">
                        <div className="w-28 text-ellipsis  flex justify-start items-center p-0">
                          <Text className=" text-white rounded-full text-ellipsis  opacity-1 overflow-hidden whitespace-nowrap hover:overflow-visible hover:bg-[#e3e1e1] hover:w-fit hover:text-black z-111 hover:absolute">
                            {item.name}
                          </Text>
                        </div>
                      </div>
                      <div className="flex justify-center items-center p-0">
                        <div className="w-28 text-ellipsis  flex justify-start items-center p-0 ">
                          <Text className="text-white rounded-full text-ellipsis  opacity-1 overflow-hidden whitespace-nowrap hover:overflow-visible hover:bg-[#e3e1e1] hover:w-fit hover:text-black z-111 hover:absolute">
                            {item.profesion}
                          </Text>
                        </div>
                      </div>
                      <div className="flex justify-center items-center p-0 ">
                        {item.level !== "incidencia" ? (
                          <div className="flex w-6 text-ellipsis justify-start items-center p-0">
                            <p className="bg-[#ae2dff] text-[#ffffff] w-6 rounded flex items-center justify-center  ">
                              {item.level}
                            </p>
                          </div>
                        ) : (
                          <div className="bg-[#ae2dff] text-[#e8e8e9] w-6 rounded  flex items-center justify-center text-24  ">
                            <CiWarning className="text-[#fdfa3a] p-0  font-bold" />
                          </div>
                        )}
                      </div>
                      <div className="flex justify-center items-center p-0 ">
                        <div className="flex w-6 text-ellipsis justify-start items-center p-0 ">
                          {item.url !== "-" ? (
                            <div className=" flex opacity-1 overflow-hidden whitespace-nowrap hover:overflow-visible hover:bg-[#ffffff] hover:w-fit hover:text-black z-111 hover:absolute">
                              <div>
                                <CiGlobe className={style.mail} />
                              </div>
                              <Text>{item.url}</Text>
                            </div>
                          ) : (
                            <div>
                              <CiGlobe className={style.notMail} />
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex justify-center items-center p-0 ">
                        <div className="flex w-6 text-ellipsis justify-start items-center p-0 ">
                          {item.email !== "-" ? (
                            <div className=" flex opacity-1 overflow-hidden whitespace-nowrap hover:overflow-visible hover:bg-[#ffffff] hover:w-fit hover:text-black z-111 hover:absolute">
                              <div>
                                <CiMail className={style.mail} />
                              </div>
                              <Text>{item.email}</Text>
                            </div>
                          ) : (
                            <div>
                              <CiMail className={style.notMail} />
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex justify-center items-center p-0 ">
                        <div className="flex w-6 text-ellipsis justify-start items-center p-0 ">
                          {item.instagram !== "" ? (
                            <div className=" flex opacity-1 overflow-hidden whitespace-nowrap hover:overflow-visible hover:bg-[#ffffff] hover:w-fit hover:text-black z-111 hover:absolute">
                              <div>
                                <CiInstagram className={style.ig} />
                              </div>
                              <Text>{item.instagram}</Text>
                            </div>
                          ) : (
                            <div>
                              <CiInstagram className={style.notIg} />
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex justify-center items-center p-0 ">
                        <div className="flex w-6 text-ellipsis justify-start items-center p-0 ">
                          {item.telephone !== "" ? (
                            <div className=" flex opacity-1 overflow-hidden whitespace-nowrap hover:overflow-visible hover:bg-[#ffffff] hover:w-fit hover:text-black z-111 hover:absolute">
                              <div>
                                <CiPhone className={style.mail} />
                              </div>
                              <p className="">{item.telephone}</p>
                            </div>
                          ) : (
                            <div>
                              <CiPhone className={style.notMail} />
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex justify-center items-center p-0">
                        <div className="w-24 text-ellipsis flex justify-start items-center p-0">
                          <Text className="text-white rounded-full text-ellipsis opacity-1 overflow-hidden whitespace-nowrap hover:overflow-visible hover:bg-[#e3e1e1] hover:w-fit hover:text-black z-111 hover:absolute">
                            {item.updatedAt ? item.updatedAt.slice(0, 10) : "-"}
                          </Text>
                        </div>
                      </div>

                      <div className="flex justify-center items-center p-0 ">
                        <div className="w-28 text-ellipsis  flex justify-start items-center p-0">
                          <Text className="text-white rounded-full text-ellipsis  opacity-1 overflow-hidden whitespace-nowrap hover:overflow-visible hover:bg-[#e3e1e1] hover:w-fit hover:text-black z-111 hover:absolute">
                            {item.corredor_name ? item.corredor_name : "-"}
                          </Text>
                        </div>
                      </div>

                      <div className="flex justify-center items-center p-0">
                        {item.status === "Contratado" ? (
                          <Text className="bg-[#26af7f]  text-[#1f1e1e]   px-2 py-1.5 rounded-xl text-center w-48">
                            Contratado
                          </Text>
                        ) : (
                          ""
                        )}
                        {item.checked === true &&
                        item.status === "Sin contactar" ? (
                          <Text className="bg-[#d0da3d]  text-black  px-2 py-1.5 rounded-xl text-center w-48">
                            Sin Contactar
                          </Text>
                        ) : (
                          ""
                        )}
                        {item.checked === false &&
                        item.status === "Sin contactar" ? (
                          <Text className="bg-[#666666]  text-white  px-2 py-1.5 rounded-xl text-center w-48">
                            Sin Clasficar
                          </Text>
                        ) : (
                          ""
                        )}
                        {item.status === "Agenda llamada" ? (
                          <Text className="bg-[#483dda]  text-black  px-2 py-1.5 rounded-xl text-center w-48">
                            Agenda llamada
                          </Text>
                        ) : (
                          ""
                        )}

                        {item.status === "Rechazado" ? (
                          <Text className="bg-[#ac4242] text-[#e0dfdf] px-2 py-1.5 rounded-xl text-center w-48">
                            Rechazado
                          </Text>
                        ) : (
                          ""
                        )}
                        {item.status === "incidencia" ? (
                          <Text className="bg-[#e5fc18] text-[#e0dfdf] px-2 py-1.5 rounded-xl text-center w-48">
                            Incidencia
                          </Text>
                        ) : (
                          ""
                        )}
                        {item.status === "Contactado" ? (
                          <Text className="bg-violet-950 text-[#e0dfdf] px-2 py-1.5 rounded-xl text-center w-48">
                            Contactado
                          </Text>
                        ) : (
                          ""
                        )}
                        {item.status === "A pagar" ? (
                          <Text className="bg-pink-500 text-[#e0dfdf] px-2 py-1.5 rounded-xl text-center w-48">
                            Pendiente de pago
                          </Text>
                        ) : (
                          ""
                        )}
                        {item.status === "No responde" ? (
                          <Text className="bg-[#2148b4] text-[#e0dfdf] px-2 py-1.5 rounded-xl text-center w-48">
                            No responde
                          </Text>
                        ) : (
                          ""
                        )}
                        {item.status === "En proceso" ? (
                          <Text className="bg-[#fffc32] text-black px-2 py-1.5 rounded-xl text-center w-48">
                            En proceso
                          </Text>
                        ) : (
                          ""
                        )}
                      </div>
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex text- justify-center items-center h-screen">
                <h1>No se encuentran Leads con este filtro...</h1>
              </div>
            )}
          </div>
        </div>
        {showData.length > 8 ? (
          <PaginationOutlined
            pageStyle={pageStyle}
            setPageStyle={setPageStyle}
            cardXPage={cardXPage}
            data={showData}
            pages={pages}
            current={currentPage}
          />
        ) : null}
      </Card>
    </>
  );
};
