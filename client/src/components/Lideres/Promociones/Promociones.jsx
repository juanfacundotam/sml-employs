import PaginationOutlined from "../../pagination/PaginationOutlined";
import { Card, Text } from "@tremor/react";
import Nav from "../../Nav/Nav";
import { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import AgregarPromosion from "./MaterialUi/AgregarPromosion";
import { useDispatch, useSelector } from "react-redux";
import { getAllPromociones } from "../../../redux/actions";
import ActualizarPromocion from "./MaterialUi/ActualizarPromocion";
import NavBar from "../NavBar/NavBar";

export const Promociones = () => {
  const dispatch = useDispatch();
  const { promociones } = useSelector((state) => state);
  const [data, setData] = useState([]);

  const [pageStyle, setPageStyle] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [cardXPage, setCardXpage] = useState(8);

  const indexLastCard = currentPage * cardXPage;
  const indexFirstCard = indexLastCard - cardXPage;
  const currentCard = data && data.slice(indexFirstCard, indexLastCard);
  const pages = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getAllPromociones());
  }, [dispatch]);

  useEffect(() => {
    if (promociones.length > 0) {
      setData(promociones);
    }
  }, [promociones]);

  return (
    <>
      <Nav />
      <Card className="w-full h-full  bg-[#222131] rounded-none p-5">
        <div className="flex  justify-between mx-5 mb-10 w-full">
          <div className="flex gap-5 ">
            <NavBar />
          </div>

          <div className="flex gap-5">
            <AgregarPromosion />
          </div>
        </div>
        <div className="text-white  text-16 font-thin w-full justify-around flex flex-row items-center">
          <div className="flex  justify-center items-center p-0 w-2/12">
            <Text className="text-center w-full p-0 text-white ">
              Promoción
            </Text>
          </div>

          <div className="flex  justify-center items-center p-0  w-4/12">
            <Text className="text-center  p-0 text-white">Link de Stripe</Text>
          </div>
          <div className="flex  justify-center w-1/12 items-center p-0 ">
            <Text className="text-center  p-0 text-white w-full">Horas</Text>
          </div>
          <div className="flex  justify-center w-1/12 items-center p-0 ">
            <Text className="text-center p-0 text-white w-full">
              Monto Total
            </Text>
          </div>
          <div className="flex  justify-center w-1/12 items-center p-0 ">
            <Text className="text-center  p-0 text-white w-full">Cuota</Text>
          </div>
          <div className="flex  justify-center w-1/12 items-center p-0  ">
            <Text className="text-center p-0 text-white w-full">
              Valor Cuotas
            </Text>
          </div>
          <div className="flex  justify-center w-1/12 items-center p-0 ">
            <Text className="text-center  p-0 text-white w-full">Editores</Text>
          </div>
          <div className="flex  justify-center w-1/12 items-center p-0 ">
            <Text className="text-center  p-0 text-white w-full">Estado</Text>
          </div>
          <div className="flex  justify-center w-1/12 items-center p-0 ">
            <Text className="text-center  p-0 text-white w-full">Editar</Text>
          </div>
        </div>

        {currentCard && currentCard.length > 0 ? (
          currentCard.map((item, index) => (
            <div
              key={index}
              className="flex  bg-[#39394b] hover:bg-[#313141] rounded-lg items-center justify-around   mt-4 w-full"
            >
              <div className="flex  justify-center items-center p-0  w-2/12">
                <Text className=" text-white rounded-full w-full text-center">
                  {item.promocion.name}
                </Text>
              </div>

              <div className="w-4/12 text-ellipsis  flex justify-center items-center p-0 ">
                <Text className="text-white  text-center">
                  {item.promocion.link}
                </Text>
              </div>

              <div className="w-1/12 text-ellipsis  flex justify-center items-center p-0 ">
                <Text className="text-white w-full text-center">
                  {item.promocion.hora}
                </Text>
              </div>

              <div className="w-1/12 text-ellipsis  flex justify-center items-center p-0 ">
                <Text className="text-white w-full text-center">
                  {item.promocion.monto}
                </Text>
              </div>

              <div className="w-1/12 flex justify-center items-center p-0 ">
                <Text className="text-white w-full text-center">
                  {item.promocion.cuota}
                </Text>
              </div>

              <div className="w-1/12 flex justify-center items-center p-0 ">
                <Text className="text-white w-full text-center">
                  {item.promocion.valorCuota}
                </Text>
              </div>

              <div className="w-1/12 flex justify-center items-center p-0 ">
                <Text className="text-white w-full text-center">
                  {item.promocion.edicion ? "Con Editores" : "Sin Editores"}
                </Text>
              </div>

              <div className="w-1/12 flex justify-center items-center p-0 ">
                <Text className="text-white w-full text-center">
                  {item.promocion.active ? "Activo" : "Inactivo"}
                </Text>
              </div>
              <div className="w-1/12">
                <ActualizarPromocion item={item} />
              </div>
            </div>
          ))
        ) : (
          <div className="flex text- justify-center items-center h-screen">
            <h1>No se encuentran promociones Cargadas</h1>
          </div>
        )}
        {data && data.length > 0 && data.length > 8 ? (
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
