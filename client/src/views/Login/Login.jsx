import React from "react";
import { useSelector } from "react-redux";
import CustomizedButtons from "./Material UI/loginButton";
import { motion } from "framer-motion";

export default function Login() {
  const access = useSelector((state) => state.isEmployee);
  return (
    <div className="flex flex-col h-screen w-screen justify-center items-center">
      <motion.img
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
        src="https://i.postimg.cc/yYvQ7m22/logosml.webp"
        className="w-96"
      />

      <a className="" href="/protected">
        <CustomizedButtons />
      </a>
    </div>
  );
}
