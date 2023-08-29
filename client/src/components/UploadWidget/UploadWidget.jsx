import styles from "./UploadWidget.module.css";
import { useEffect, useRef } from "react";
import { Image } from "cloudinary-react";
const { VITE_CLOUND_NAME, VITE_UPLOAD_PRESENT } = import.meta.env;
import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const UploadWidget = ({ onImageUpload, setEditSave, setProfileImageUrl }) => {
  const cloudinaryRef = useRef();
  const widgetRef = useRef();

  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: VITE_CLOUND_NAME,
        uploadPreset: VITE_UPLOAD_PRESENT,
      },
      function (error, result) {
        if (!error && result && result.event === "success") {
          const img = result.info.secure_url;
          setProfileImageUrl(img);
          localStorage.setItem("imagenProfile", img);
          // Utilizar la función de devolución de llamada con la URL de la imagen
          onImageUpload(img);
          setEditSave(true);
        }
      }
    );
  }, []);

  return (
    <>
      <button className={styles.boton} onClick={() => widgetRef.current.open()}>
        Cambiar foto
      </button>
    </>
  );
};

export default UploadWidget;
