import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import style from "./ClasificacionHistory.module.css";
import { useDispatch, useSelector } from "react-redux";
import { CiGlobe, CiWarning, CiInstagram, CiMail } from "react-icons/ci";
import { useUser } from "@clerk/clerk-react";
import PaginationOutlined from "../../../pagination/PaginationOutlined";
import Nav from "../../../Nav/Nav";
import { getLeadCorredoresChecked } from "../../../../redux/actions";
import NavBar from "../NavBar/NavBar";

const ClasificacionHistory = () => {
  const { corredorLeadChecked } = useSelector((state) => state);
  const dispatch = useDispatch();

  const user = useUser().user;
  let email = localStorage.getItem("email");

  useEffect(() => {
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

  return (
    <>
      <Nav />
      <div className=" flex flex-col justify-start items-center w-full h-screen mx-5 ">
        <div className="w-full m-5 h-screen bg-[#222131]">
          <div className="flex  mt-2 ">
            <NavBar />
          </div>

          <div className="flex">
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
              {currentCard?.map((item, index) => (
                <div key={index} className={style.tableCards}>
                  <div className="flex justify-start items-center p-0">
                    <div className="w-24 p-1 px-3 rounded-full text-ellipsis opacity-1 overflow-hidden hover:overflow-visible hover:bg-[#ffffff] hover:w-fit hover:text-black z-111 hover:absolute">
                      {item._id}
                    </div>
                  </div>
                  <div className="flex justify-start items-center p-0">
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

export default ClasificacionHistory;
