import { Card, Text } from "@tremor/react";
import { CiMail, CiInstagram, CiPhone, CiGlobe } from "react-icons/ci";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLeadDiscard } from "../../../redux/actions";
import style from "./IncidencesHistory.module.css";
import PaginationOutlined from "../../pagination/PaginationOutlined";
import Nav from "../../Nav/Nav";
import ModalCient from "./MaterialUi/ModalClient";
import NavBar from "../NavBar/NavBar";

export const IncidencesHistory = () => {
  const [data, setData] = useState([]);
  const { leaderDiscard } = useSelector((state) => state);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLeadDiscard());
  }, [dispatch]);
  useEffect(() => {
    setData(leaderDiscard);
  }, [leaderDiscard]);

  const [pageStyle, setPageStyle] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [cardXPage, setCardXpage] = useState(10);
  const indexLastCard = currentPage * cardXPage;
  const indexFirstCard = indexLastCard - cardXPage;
  const showData = data.filter((item) => {
    return item.status === "discard";
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
          <div className="text-white text-14 font-thin">
            <div className="flex items-center justify-around p-3  ">
              <div className="flex justify-center items-center p-0">
                <Text className="text-start w-28 p-0 text-white">Clientes</Text>
              </div>
              <div className="flex justify-center items-center p-0">
                <Text className="text-start w-28 p-0 text-white">
                  Profesión
                </Text>
              </div>
              <div className="flex justify-center items-center p-0">
                <Text className="text-center w-6 p-0 text-white">Web</Text>
              </div>
              <div className="flex justify-center items-center p-0">
                <Text className="text-center w-6 p-0 text-white">Mail</Text>
              </div>
              <div className="flex justify-center items-center p-0">
                <Text className="text-center w-6 p-0 text-white">
                  Instagram
                </Text>
              </div>
              <div className="flex justify-center items-center p-0">
                <Text className="text-center w-6 p-0 text-white">Telefono</Text>
              </div>
              <div className="flex justify-center items-center p-0">
                <Text className="text-start w-28 p-0 text-white">Corredor</Text>
              </div>
              <div className="flex justify-center items-center p-0 w-48"></div>
            </div>
          </div>

          <div>
            <ModalCient
              open={open}
              handleClose={handleClose}
              name={modalItems.name}
              category={modalItems.category}
              level={modalItems.level}
              web={modalItems.url}
              email={modalItems.email}
              instagram={modalItems.instagram}
              telephone={modalItems.telephone}
              status={modalItems.status}
              city={modalItems.city}
              province={modalItems.province}
              corredor={modalItems.corredor}
              vendedor={modalItems.vendedor}
              observacion={modalItems.status_op}
            />
            {currentCard.map((item, index) => (
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
                          {item.category}
                        </Text>
                      </div>
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
                    <div className="flex justify-center items-center p-0 ">
                      <div className="w-28 text-ellipsis  flex justify-start items-center p-0">
                        <Text className="text-white rounded-full text-ellipsis  opacity-1 overflow-hidden whitespace-nowrap hover:overflow-visible hover:bg-[#e3e1e1] hover:w-fit hover:text-black z-111 hover:absolute">
                          {item.corredor_name ? item.corredor_name : "-"}
                        </Text>
                      </div>
                    </div>

                    <div className="flex justify-center items-center p-0">
                      <Text className="bg-black  text-white   px-2 py-1.5 rounded-xl text-center w-48">
                        DESCARTADO
                      </Text>
                    </div>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        {showData.length > 10 ? (
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
