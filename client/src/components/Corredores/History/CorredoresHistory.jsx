import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import style from "./CorredoresHistory.module.css";
import PaginationOutlined from "../../pagination/PaginationOutlined";
import { useDispatch, useSelector } from "react-redux";
import Nav from "../../Nav/Nav";

import { CiGlobe, CiWarning, CiInstagram } from "react-icons/ci";
import {
  getLeadCorredoresChecked,
  getLeadCorredoresCheckedDescargados,
} from "../../../redux/actions";
import { useUser } from "@clerk/clerk-react";
import { Button } from "@mui/material";
import Papa from "papaparse";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import NavBar from "../NavBar/NavBar";

const CorredoresHistory = () => {
  const { corredorLeadChecked } = useSelector((state) => state);
  const { corredorLeadCheckedDescagados } = useSelector((state) => state);
  const dispatch = useDispatch();
  let email = localStorage.getItem("email");
  const user = useUser().user;

  useEffect(() => {
    dispatch(getLeadCorredoresCheckedDescargados(email && email));
    dispatch(getLeadCorredoresChecked(email));
  }, [dispatch]);

  const [pageStyle, setPageStyle] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [cardXPage, setCardXpage] = useState(10);
  const indexLastCard = currentPage * cardXPage;
  const indexFirstCard = indexLastCard - cardXPage;
  const currentCard = corredorLeadChecked.slice(indexFirstCard, indexLastCard);

  const pages = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (currentCard.length === 1 && currentCard[0].hasOwnProperty("error")) {
    return <p className={style.noResults}>No hay resultados...</p>;
  }

  const descargaOk = () => {
    toast.success(`✔ Leads descargados con exito! `, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  const descargaW = (name) => {
    toast.warning(`✔ Ya descargaste todos los Leads! `, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  const downloadCSV = () => {
    const csv = Papa.unparse(corredorLeadCheckedDescagados);

    // Crea un enlace de descarga
    const csvData = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const csvURL = URL.createObjectURL(csvData);
    const tempLink = document.createElement("a");
    tempLink.href = csvURL;
    tempLink.setAttribute("download", "CorredorHistory.csv");
    tempLink.click();

    const updateLeadCorredor = async () => {
      const promises = corredorLeadCheckedDescagados.map((lead) =>
        axios.put(`/lead/${lead._id}`, {
          descargadosCorredor: true,
        })
      );

      await Promise.all(promises);
    };
    descargaOk();
    updateLeadCorredor();
  };

  return (
    <>
      <ToastContainer />
      <Nav />
      <div className=" flex flex-col justify-start items-center w-full h-screen mx-5 ">
        <div className="w-full m-5 bg-[#222131]">
          <div className="flex justify-between items-center">
            <div className="flex mt-5">
              <NavBar />
            </div>

            <label>Leads chequeados: {corredorLeadChecked.length}</label>
            <Button variant="outlined" onClick={downloadCSV}>
              Descargar CSV
            </Button>
          </div>
          <div className="flex flex-col">
            <div className="text-gray-400 text-14 font-thin">
              <div className={style.tableRow}>
                <div className="text-start">Invoice Id</div>
                <div className="text-start">Name</div>
                <div className="text-start">Web</div>
                <div className="text-start">Instagram</div>
                <div className="text-start">Nivel</div>
                <div className="text-start">Incidencia</div>
              </div>
            </div>

            <div className="h-3/4">
              {currentCard.map((item, index) => (
                <div key={index} className={style.tableCards}>
                  <div className="flex justify-start items-center p-0">
                    <div className="w-24 p-1 px-3 rounded-full text-ellipsis opacity-1 overflow-hidden hover:overflow-visible hover:bg-[#ffffff] hover:w-fit hover:text-black z-111 hover:absolute">
                      {item._id}
                    </div>
                  </div>
                  <div className="flex justify-start items-center p-0">
                    {/* sssss */}
                    <p className="w-96 p-1 px-3 rounded-full text-ellipsis opacity-1 whitespace-nowrap overflow-hidden hover:overflow-visible hover:bg-[#e3e1e1] hover:w-fit hover:text-black z-111 hover:absolute">
                      {item.name}
                    </p>
                  </div>
                  <div className="flex justify-start items-center p-0">
                    {item.url ? (
                      <Link to={item.url} target="_blank">
                        <div>
                          <CiGlobe className="text-[30px] mr-5 text-[#418df0]" />
                        </div>
                      </Link>
                    ) : (
                      <div>
                        <CiGlobe className="text-[30px] mr-5 text-[#9eabbe]" />
                      </div>
                    )}
                  </div>
                  <div className="flex justify-start items-center p-0 mx-3">
                    {item.instagram ? (
                      <Link to={item.instagram} target="_blank">
                        <div>
                          <CiInstagram className="text-[30px] mr-5 text-[#ff598b]" />
                          <p className="text-start">{item.Instagram}</p>
                        </div>
                      </Link>
                    ) : (
                      <div>
                        <CiInstagram className="text-[30px] mr-5 text-[#9eabbe]" />
                        <p className="text-start">{item.Instagram}</p>
                      </div>
                    )}
                  </div>
                  <div className="flex justify-start items-center p-0">
                    {item.level == "0" ? (
                      <label className={style.buttonNivelActive}>0</label>
                    ) : (
                      <label className={style.buttonNivel}>0</label>
                    )}
                    {item.level == "1" ? (
                      <label className={style.buttonNivelActive}>1</label>
                    ) : (
                      <label className={style.buttonNivel}>1</label>
                    )}
                    {item.level == "2" ? (
                      <label className={style.buttonNivelActive}>2</label>
                    ) : (
                      <label className={style.buttonNivel}>2</label>
                    )}
                  </div>
                  <div className="flex justify-start items-center p-0">
                    <div>
                      {item.level == "incidencia" ? (
                        <CiWarning className="text-[30px] mr-5 text-[#f0de41]" />
                      ) : (
                        <CiWarning className="text-[30px] mr-5 text-[#418df0]" />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className=" mb-5">
          <PaginationOutlined
            pageStyle={pageStyle}
            setPageStyle={setPageStyle}
            cardXPage={cardXPage}
            data={corredorLeadChecked}
            pages={pages}
            current={currentPage}
          />
        </div>
      </div>
    </>
  );
};

export default CorredoresHistory;
