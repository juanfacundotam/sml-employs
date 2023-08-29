import style from "./incidencias.module.css";
import PaginationOutlined from "../../pagination/PaginationOutlined";
import { Card, Text } from "@tremor/react";
import { CiMail, CiInstagram, CiPhone, CiWarning } from "react-icons/ci";
import ModalCient from "./MaterialUi/ModalClient";
import Nav from "../../Nav/Nav";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLeadChecked } from "../../../redux/actions";
import { CiGlobe } from "react-icons/ci";
import NavBar from "../NavBar/NavBar";

//
const Incidences = () => {
  const [data, setData] = useState([]);
  const { leaderDashboard } = useSelector((state) => state);
  const [changeIncidence, setChangeIncidence] = useState({});
  const dispatch = useDispatch();

  const filterData = () => {
    const filteredData = leaderDashboard.filter(
      (item) => item.level === "incidencia"
    );
    setData(filteredData);
  };

  useEffect(() => {
    dispatch(getLeadChecked());
  }, [dispatch, changeIncidence]);

  useEffect(() => {
    filterData();
  }, [leaderDashboard]);

  const handleChangeIncidence = (change) => {
    setChangeIncidence(change);
  };

  const [pageStyle, setPageStyle] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [cardXPage, setCardXpage] = useState(10);
  const indexLastCard = currentPage * cardXPage;
  const indexFirstCard = indexLastCard - cardXPage;
  const currentCard = data.slice(indexFirstCard, indexLastCard);
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

  return (
    <>
      <Nav />
      <Card className="w-full h-full bg-[#222131] rounded-none p-5">
        <div className="flex justify-between items-center mx-5 mb-0">
          <div className="flex gap-5 h-[37px] mb-5">
            <NavBar />
          </div>
          <div className="h-[36.5px] w-[36.5px]"></div>
        </div>
        <div className="w-full">
          <div className="text-white text-14 font-thin ">
            <div className="flex items-center justify-around p-3  ">
              <div className="flex justify-center items-center p-0">
                <Text className="text-start w-28 p-0 text-white">Cliente</Text>
              </div>
              <div className="flex justify-center items-center p-0">
                <Text className="text-start w-28  text-white">Profesión</Text>
              </div>
              <div className="flex justify-center items-center p-0">
                <Text className="text-center w-6 p-0 text-white">Nivel</Text>
              </div>
              <div className="flex justify-center items-center p-0">
                <Text className="text-center w-6 p-0 text-white">Web</Text>
              </div>
              <div className="flex justify-center items-center p-0">
                <Text className="text-center w-6 p-0 text-white">Mail</Text>
              </div>
              <div className="flex justify-center items-center p-0">
                <Text className="text-center w-6  text-white">Instagram</Text>
              </div>
              <div className="flex justify-center items-center p-0">
                <Text className="text-center w-6 p-0 text-white">Telefono</Text>
              </div>
              <div className="flex justify-center items-center p-0">
                <Text className="text-start w-28 p-0 text-white">Corredor</Text>
              </div>
              <div className="flex justify-center items-center p-0">
                <Text className="text-center w-48 p-0 text-white">Estado</Text>
              </div>
            </div>
          </div>

          <div>
            <ModalCient
              fixed={handleChangeIncidence}
              open={open}
              handleClose={handleClose}
              _id={modalItems._id}
              name={modalItems.name}
              category={modalItems.category}
              level={modalItems.level}
              email={modalItems.email}
              instagram={modalItems.instagram}
              telephone={modalItems.telephone}
              status={modalItems.status}
              city={modalItems.city}
              province={modalItems.province}
              web={modalItems.url}
              corredor={modalItems.corredor}
              observacion={modalItems.status_op}
            />
            {currentCard.length > 0 ? (
              currentCard.map((item, index) => (
                <div
                  key={item._id}
                  className="flex bg-[#39394b] text-gray-400 text-sm p-3 rounded-lg h-14 my-5"
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
                            {item.category}
                          </Text>
                        </div>
                      </div>
                      <div className="flex justify-center items-center p-0 ">
                        {item.level !== "incidencia" ? (
                          <div className="flex w-6 text-ellipsis justify-start items-center p-0">
                            <p className="bg-[#6254ff] text-[#ffffff] w-6 rounded flex items-center justify-center  ">
                              {item.level}
                            </p>
                          </div>
                        ) : (
                          <div className="bg-[#6254ff] text-[#e8e8e9] w-6 rounded  flex items-center justify-center text-24  ">
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
                              <CiPhone className={style.not} />
                            </div>
                          )}
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
                        <Text className="bg-red-500  text-white   px-2 py-1.5 rounded-xl text-center w-48">
                          INCIDENCIA
                        </Text>
                      </div>
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="w-full text-center justify-center my-5 p-3">
                <p>No hay leads con incidencias en este momento!</p>
              </div>
            )}
          </div>
        </div>
        {data.length > 10 ? (
          <PaginationOutlined
            pageStyle={pageStyle}
            setPageStyle={setPageStyle}
            cardXPage={cardXPage}
            data={data}
            pages={pages}
            current={currentPage}
          />
        ) : null}
      </Card>
    </>
  );
};
export default Incidences;
