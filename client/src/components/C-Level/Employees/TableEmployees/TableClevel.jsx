import { useState, useEffect } from "react";
import Detail from "../../Employees/Detail/Detail";
import style from "./TableClevel.module.css";
import PaginationOutlined from "../../../pagination/PaginationOutlined";
import { CiMail } from "react-icons/ci";
import { getAllEmployees, getDetailEmploy } from "../../../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import NestedModal from "./MaterialUi/NestedModal";
import NestedModalEdit from "./MaterialUi/Edit/NestedModalEdit";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NavBar from "../NavBar/NavBar";

const BannedEmployees = (name) => {
  toast.success(`✔ ${name} Proceso de baneo completado exitosamente! `, {
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
const ErrorEmployees = (name) => {
  toast.error(`❌ Error al banear al empleado ${name}! `, {
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
const EditEmployees = (name) => {
  toast.success(`✔ ${name} Proceso de edición exitoso completado! `, {
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
const ErrorEditEmployees = (name) => {
  toast.error(`❌ Error al editar el empleado ${name}! `, {
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
const CreateEmployees = (name) => {
  toast.success(`✔ ${name} Proceso de creación exitoso completado! `, {
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
const ErrorCreateEmployees = (name) => {
  toast.error(`❌ Error al crear el empleado ${name}! `, {
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

const okLeads = (message) => {
  toast.success(`${message}`, {
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
const almostLeads = (message) => {
  toast.warning(`${message}`, {
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
const errorLeads = (message) => {
  toast.error(`${message}`, {
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

export const TableClevel = () => {
  const { detailEmploy } = useSelector((state) => state);
  const { allEmployees } = useSelector((state) => state);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllEmployees());
  }, [dispatch]);

  const [pageStyle, setPageStyle] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [cardXPage, setCardXpage] = useState(10);
  const indexLastCard = currentPage * cardXPage;
  const indexFirstCard = indexLastCard - cardXPage;
  const currentCard = allEmployees.slice(indexFirstCard, indexLastCard);

  const pages = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const cardDetail = (email) => {
    dispatch(getDetailEmploy(email));
  };

  return (
    <div className="flex w-screen h-screen">
      <div className=" flex flex-col justify-start items-center w-full h-screen">
        <ToastContainer />
        <div className="bg-[#222131] rounded-none w-full h-screen p-5">
          <div className="flex justify-between items-center">
            <div className="flex gap-5">
              <div className="flex gap-5">
                <NavBar />
              </div>
            </div>
            <div className="flex gap-2">
              <NestedModal
                CreateEmployees={CreateEmployees}
                okLeads={okLeads}
                almostLeads={almostLeads}
                errorLeads={errorLeads}
                ErrorCreateEmployees={ErrorCreateEmployees}
              />
            </div>
          </div>
          <div className="w-full">
            <div className={style.tableBody}>
              <div className={style.tableRow}>
                <div>Nombre</div>
                <div>Email</div>
                <div>Rol</div>
                <div></div>
              </div>
              {currentCard.map((item, index) => (
                <div
                  key={index}
                  className={style.tableCards}
                  onClick={() => cardDetail(item.email)}
                >
                  <div className="flex justify-start items-center p-0">
                    <img
                      className="w-8 ml-2 mr-4 rounded-full"
                      src={item.photo}
                      alt=""
                    />
                    <p>{item.name}</p>
                  </div>
                  <div className="flex justify-start items-center p-0">
                    <CiMail className={style.icon} />
                    <p>{item.email}</p>
                  </div>
                  <div className="p-0 w-52">
                    <p
                      className={` 
                      ${item.rol === "clevel" ? "bg-[#ac4242] w-32" : null} 
                      ${item.rol === "leader" ? "bg-[#1b7757] w-32" : null}  
                      ${item.rol === "corredor" ? "bg-[#2148b4] w-32" : null}  
                      ${item.rol === "vendedor" ? "bg-[#8a912b] w-32" : null} 
                      ${item.rol === "freelancer" ? "bg-black w-32" : null} 
                      text-center p-1 w-20 rounded-lg`}
                    >
                      {item.rol}
                    </p>
                  </div>
                  <div className="p-0 relative">
                    <div className="ml-20 pl-2">
                      <NestedModalEdit
                        itemId={item._id}
                        itemName={item.name}
                        itemEmail={item.email}
                        itemPhone={item.contactNumber}
                        itemBirthdate={item.birthdate}
                        itemCountry={item.country}
                        itemDescription={item.description}
                        itemPhoto={item.photo}
                        itemRol={item.rol}
                        ErrorEmployees={ErrorEmployees}
                        BannedEmployees={BannedEmployees}
                        EditEmployees={EditEmployees}
                        ErrorEditEmployees={ErrorEditEmployees}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className=" mb-6">
          <PaginationOutlined
            pageStyle={pageStyle}
            setPageStyle={setPageStyle}
            cardXPage={cardXPage}
            data={allEmployees}
            pages={pages}
            current={currentPage}
          />
        </div>
      </div>

      <Detail cardEmail={detailEmploy.length > 0 ? detailEmploy[0] : null} />
    </div>
  );
};
