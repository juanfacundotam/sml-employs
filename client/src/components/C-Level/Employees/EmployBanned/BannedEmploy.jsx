import { useState, useEffect } from "react";
import style from "./BannedEmploy.module.css";
import PaginationOutlined from "../../../pagination/PaginationOutlined";
import { CiMail } from "react-icons/ci";
import { getDetailEmploy, getEmployeesBanned } from "../../../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Detail from "../Detail/Detail";
import Nav from "../../../Nav/Nav";
import { IoAdd } from "react-icons/io5";
import axios from "axios";
import NavBar from "../NavBar/NavBar";

export default function BannedEmploy() {
  const { detailEmploy } = useSelector((state) => state);
  const { employeesBanned } = useSelector((state) => state);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getEmployeesBanned());
  }, [dispatch]);

  const [pageStyle, setPageStyle] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [cardXPage, setCardXpage] = useState(10);
  const indexLastCard = currentPage * cardXPage;
  const indexFirstCard = indexLastCard - cardXPage;
  const currentCard =
    employeesBanned && employeesBanned.slice(indexFirstCard, indexLastCard);

  const pages = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const cardDetail = (email) => {
    dispatch(getDetailEmploy(email));
  };

  const BannedEmployees = (name) => {
    toast.success(`✔ ${name} Successful unbanned process completed! `, {
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
    toast.error(`❌ Error unbanned Employ ${name}! `, {
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

  const handleRemoveBanned = async (Rol, Email, Name) => {
    try {
      if (Rol === "clevel") {
        await axios.put(`/clevel/email?email=${Email}`, {
          deleted: false,
        });

        await axios.put(`/corredor/email/email?email=${Email}`, {
          deleted: false,
        });

        await axios.put(`/vendedor/email/email?email=${Email}`, {
          deleted: false,
        });
      }

      if (Rol === "leader") {
        await axios.put(`/leader/email/email?email=${Email}`, {
          deleted: false,
        });

        await axios.put(`/corredor/email/email?email=${Email}`, {
          deleted: false,
        });

        await axios.put(`/vendedor/email/email?email=${Email}`, {
          deleted: false,
        });
      }
      if (Rol === "freelancer") {
        await axios.put(`/freelancer/email/email?email=${Email}`, {
          deleted: false,
        });

        await axios.put(`/corredor/email/email?email=${Email}`, {
          deleted: false,
        });

        await axios.put(`/vendedor/email/email?email=${Email}`, {
          deleted: false,
        });
      }

      if (Rol === "vendedor") {
        await axios.put(`/vendedor/email/email?email=${Email}`, {
          deleted: false,
        });
      }

      if (Rol === "corredor") {
        await axios.put(`/corredor/email/email?email=${Email}`, {
          deleted: false,
        });
      }

      await axios.put(`/employees/email?email=${Email}`, {
        deleted: false,
      });
      BannedEmployees(Name);
    } catch (error) {
      ErrorEmployees(Name);
    }

    dispatch(getEmployeesBanned());
    dispatch(getDetailEmploy(Email));
  };

  return (
    <div className="flex w-screen h-screen">
      <Nav />
      <div className=" flex flex-col justify-start items-center w-full h-screen">
        <ToastContainer />
        <div className="bg-[#222131] rounded-none w-full h-screen p-5">
          <div className="flex justify-between items-center">
            <div className="flex gap-5">
              <div className="flex gap-5">
                <NavBar />
              </div>
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
                  <div className="p-0">
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
                  <div
                    onClick={() =>
                      handleRemoveBanned(item.rol, item.email, item.name)
                    }
                  >
                    <IoAdd className="text-[2rem] text-[#418df0] hover:text-[#3570bd] cursor-pointer" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div onClick={handleRemoveBanned} className=" mb-6">
          {employeesBanned && employeesBanned.length > 0 ? (
            <PaginationOutlined
              pageStyle={pageStyle}
              setPageStyle={setPageStyle}
              cardXPage={cardXPage}
              data={employeesBanned}
              pages={pages}
              current={currentPage}
            />
          ) : null}
        </div>
      </div>

      <Detail
        cardEmail={
          detailEmploy && detailEmploy.length > 0 ? detailEmploy[0] : null
        }
      />
    </div>
  );
}
