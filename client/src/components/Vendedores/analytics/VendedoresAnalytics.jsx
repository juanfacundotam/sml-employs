import React from "react";
import style from "./VendedoresAnalytics.module.css";
import Nav from "../../Nav/Nav"
import { Link } from "react-router-dom";

import { IoGrid, IoStatsChart } from "react-icons/io5";
import {MdOutlineAttachMoney } from "react-icons/md";
import { FaHistory } from "react-icons/fa";

const VendedoresAnalytics = () => {
  return (
    <>
      <Nav />
      <div className="w-full flex flex-col justify-start items-center">
        <div className={style.divTitle}>
          <h1 className="font-bold text-[#e2e2e2] w-28 text-lg mx-5 mt-2">
            Analytics
          </h1>
          <div className="flex gap-7">
            <Link to={"/vendedores"}>
              <IoGrid className="text-[2rem] text-[#418df0] hover:text-[#3570bd]" />
            </Link>
            <Link to={"/vendedores-ventas"}>
                <MdOutlineAttachMoney className="text-[2rem] text-[#418df0] hover:text-[#3570bd]" />
              </Link>
            <Link className="text-5xl" to={"/vendedores-history"}>
              <FaHistory className="text-[2rem] text-[#418df0] hover:text-[#3570bd]" />
            </Link>
            <Link className="text-5xl" to={"/vendedores-analytics"}>
              <IoStatsChart className="text-[2rem] text-[#418df0] hover:text-[#3570bd]" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default VendedoresAnalytics;
