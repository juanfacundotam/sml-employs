import React from "react";
import styles from "./Detail.module.css"
import {
  IoPhonePortraitSharp,
  IoLocationSharp,
  IoMailOpenSharp,
  IoCalendarClear
} from "react-icons/io5";

function Detail(props) {
  return (
    <div className="  flex h-screen bg-slate-700  justify-center items-center w-1/5 flex-col relative ">
       <div className=" h-1/4 justify-center items-center text-center flex flex-col w-full gap-2 relative">
        <div className=" bg-emerald-700  w-20 h-20 rounded-full flex ">
          <img src={props.picture} alt="avatar" className="rounded-full " />
        </div>
        <p className=" font-bold text-24 pt-1 text-white">{props.name} </p>
      </div> 

      <div className=" h-1/4 justify-center items-left text-left flex flex-col w-4/5 relative gap-2">
        <h3 className=" font-normal text-18 pt-1 text-gray-200 text-center">Contact Info</h3>
        <div className="flex items-center gap-2 text-center">
          <IoMailOpenSharp className="text-[#e0dddd]" />
          <p className=" font-normal text-18  pt-0">{props.email}</p>
        </div>
        <div className="flex items-center gap-2 text-center">
          <IoLocationSharp className="text-[#e0dddd]" />
          <p className=" font-normal text-18  pt-0">{props.country}</p>
        </div>
        <div className="flex  gap-2 text-left items-center">
          <IoPhonePortraitSharp className="text-[#e0dddd]" />
          <p className=" font-normal text-18 pt-0">
            {props.contactNumber}
          </p>

        </div>
        <div className="flex  gap-2 text-left items-center">
          <IoCalendarClear className="text-[#e0dddd]" />
          <p className=" font-normal text-18 pt-0 ">
            {props.birthdate}
          </p>

        </div>


      </div>


      <div className=" flex flex-col h-2/4 w-full items-center pt-3">
        <div className="w-4/5 h-4/5 flex flex-col items-center justify-start border border-white p-2 gap-y-4 text-center">
          <p className="text-18 font-semibold text-white">About Me!</p>
          <p className={styles.description}>{props.description} </p>
        </div>
      </div>
      {/* {props.performance ? <Performance /> : <About />} */}
    </div>
  );
}

export default Detail;

