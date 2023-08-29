import style from "./ContratandoLeader.module.css";
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
import Nav from "../../Nav/Nav";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  findCorredoresByNameAllInfoSeguimiento,
  getAllLeadAPagar,
} from "../../../redux/actions";
import Papa from "papaparse";
import Button from "@mui/material/Button";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NavBar from "../NavBar/NavBar";

export const ContratandoLeader = () => {
  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const [active, setActive] = useState("");
  const [corredor, setCorredor] = useState("");
  const [vendedor, setVendedor] = useState("");
  const [freelancer, setFreelancer] = useState("");

  const { leadAPagar } = useSelector((state) => state);

  const dispatch = useDispatch();

  const statusOk = (name) => {
    toast.success(`✔Cambio de estado a Contratado realizado ${name} ! `, {
      position: "top-center",
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });

    updatePage();
    setActive(true);
  };

  useEffect(() => {
    setData(leadAPagar);
  }, [leadAPagar]);

  useEffect(() => {
    dispatch(getAllLeadAPagar());
    setActive(false);
  }, [dispatch, active]);

  const changeStatus = (id, contratado, name) => {
    const newStatus = contratado === "A pagar" ? "Contratado" : "A pagar";
    axios.put(`/lead/${id}`, {
      status: newStatus,
      pagoRecibido: true,
    });

    statusOk(name);
  };

  const updatePage = () => {
    if (corredor === "" && vendedor === "" && freelancer === "") {
      dispatch(getAllLeadAPagar());
    } else {
      dispatch(
        findCorredoresByNameAllInfoSeguimiento(corredor, vendedor, freelancer)
      );
    }
  };

  const normalizeString = (str) => {
    return str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  };

  const [pageStyle, setPageStyle] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [cardXPage, setCardXpage] = useState(8);
  const indexLastCard = currentPage * cardXPage;
  const indexFirstCard = indexLastCard - cardXPage;
  const showData =
    data &&
    data.filter((item) => {
      return (
        item.level !== "-" &&
        item.status !== "" &&
        item.corredor !== "" &&
        item.corredor !== "-" &&
        item.status === "A pagar" &&
        normalizeString(item.name).includes(normalizeString(name))
      );
    });

  const currentCard = showData && showData.slice(indexFirstCard, indexLastCard);
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
    const csv = Papa.unparse(leadAPagar);

    const csvData = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const csvURL = URL.createObjectURL(csvData);
    const tempLink = document.createElement("a");
    tempLink.href = csvURL;
    tempLink.setAttribute("download", "leadAPagar.csv");
    tempLink.click();

    const updateleadAPagar = async () => {
      const promises = leadAPagar.map((lead) =>
        axios.put(`/lead/${lead._id}`, {
          descargadosLeader: true,
        })
      );

      await Promise.all(promises);
    };

    updateleadAPagar();
  };

  return (
    <>
      <Nav />
      <Card className="w-full h-full bg-[#222131] rounded-none p-5">
        <div className="flex justify-between mx-5 mb-10">
          <div className="flex gap-5">
            <NavBar />
          </div>

          <div className="flex gap-5">
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
          <div className="flex gap-5 mt-5 mb-5 justify-center items-center">
            <InputRunner
              name={name}
              setName={setName}
              corredor={corredor}
              setCorredor={setCorredor}
              vendedor={vendedor}
              setVendedor={setVendedor}
              freelancer={freelancer}
              setFreelancer={setFreelancer}
              getAllLeadAPagar={getAllLeadAPagar}
            />
          </div>
        </div>
        <div className="w-full">
          <div className="text-white text-14 font-thin">
            <div className="flex items-center justify-around p-3  ">
              <div className="flex justify-center items-center p-0">
                <Text className="text-start w-28 p-0 text-white">Cliente</Text>
              </div>
              <div className="flex justify-center items-center p-0">
                <Text className="text-start w-28  text-white">Profesión</Text>
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
                <Text className=" w-24 text-center text-white">Chequeado</Text>
              </div>
              <div className="flex justify-center items-center p-0">
                <Text className="text-start w-28 p-0 text-white">Corredor</Text>
              </div>
              <div className="flex justify-center items-center p-0">
                <Text className="text-start w-28 p-0 text-white">Vendedor</Text>
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
            {currentCard && currentCard.length > 0 ? (
              currentCard.map((item, index) => (
                <div
                  key={item._id}
                  className="flex bg-[#39394b] text-gray-400 text-sm p-3 rounded-lg h-11 my-3"
                >
                  <div className="w-full flex justify-around items-center">
                    <div
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
                      <div className="flex justify-center items-center p-0 mr-2">
                        <div className="w-28 text-ellipsis  flex justify-start items-center p-0">
                          <Text className="text-white rounded-full text-ellipsis  opacity-1 overflow-hidden whitespace-nowrap hover:overflow-visible hover:bg-[#e3e1e1] hover:w-fit hover:text-black z-111 hover:absolute">
                            {item.vendedor_name
                              ? item.vendedor_name
                              : "Sin vendedor asignado"}
                          </Text>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-center items-center p-0 mr-6">
                      {item.status === "A pagar" && (
                        <div
                          className="cursor-pointer"
                          onClick={() =>
                            changeStatus(item._id, item.status, item.name)
                          }
                        >
                          <Text className="bg-[#c1c41f]  text-[#1f1e1e]   px-2 py-1.5 rounded-xl text-center w-48">
                            Confirmar Pago
                          </Text>
                        </div>
                      )}
                    </div>
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
        {showData && showData.length > 8 ? (
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
