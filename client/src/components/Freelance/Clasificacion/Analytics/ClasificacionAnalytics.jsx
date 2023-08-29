import { Link } from "react-router-dom";
import { IoGrid, IoStatsChart } from "react-icons/io5";
import { FaHistory } from "react-icons/fa";
import Nav from "../../../Nav/Nav";
import NavBar from "../NavBar/NavBar";

const ClasificacionAnalytics = () => {
  return (
    <>
      <Nav />
      <div className=" flex flex-col justify-start items-center w-full h-screen mx-5 ">
        <div className="w-full m-5 h-screen bg-[#222131]">
          <div className="flex  mt-2">
            <NavBar />
          </div>
        </div>
      </div>
    </>
  );
};

export default ClasificacionAnalytics;
