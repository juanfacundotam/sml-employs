import Nav from "../../components/Nav/Nav";
import Detail from "../../components/Lideres/Employees/Detail/Detail";
import DatePicker from "./DatePicker";
import { useUser } from "@clerk/clerk-react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllCorredores,
  getAllVendedores,
  getAllClevel,
  getAllLeader,
  getAllFreelancer,
} from "../../redux/actions";
import UploadWidget from "../../components/UploadWidget/UploadWidget";
import { Image } from "cloudinary-react";
import Countries from "../../components/Select/SelectionCountries";
import axios from "axios";
import styles from "./Settings.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";

const { VITE_CLOUND_NAME } = import.meta.env;

export default function Settings() {
  const user = useUser().user;
  const mail = user?.emailAddresses[0]?.emailAddress;
  const fullName = user?.fullName;
  const userImageUrl = user?.imageUrl;
  const userEmail = user?.primaryEmailAddress?.emailAddress;

  const [profileImageUrl, setProfileImageUrl] = useState("");
  const [dateBirth, setDateBirth] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [editSave, setEditSave] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [saveDate, setSaveDate] = useState("");

  const { corredores } = useSelector((state) => state);
  const { vendedores } = useSelector((state) => state);
  const { freelancer } = useSelector((state) => state);
  const { leader } = useSelector((state) => state);
  const { clevel } = useSelector((state) => state);

  const role = localStorage.getItem("roleReady");
  const img = localStorage.getItem("imagenProfile");

  const dispatch = useDispatch();

  const allEmployees = [
    ...corredores,
    ...vendedores,
    ...clevel,
    ...leader,
    ...freelancer,
  ];

  const selectedEmployee = allEmployees.find(
    (employee) => employee.email === userEmail
  );

  const [formErrors, setFormErrors] = useState({
    birthdate: "",
    country: "",
    contactNumber: "",
    description: "",
  });

  const [formData, setFormData] = useState({
    birthdate: selectedEmployee?.birthdate,
    photo: selectedEmployee?.photo ?? userImageUrl,
    country: selectedEmployee?.country,
    contactNumber: selectedEmployee?.contactNumber,
    description: selectedEmployee?.description,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "contactNumber") {
      const sinEspacios = value.replace(/\s/g, "");
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: sinEspacios,
      }));
      setFormErrors((prevFormData) => ({
        ...prevFormData,
        [name]: sinEspacios,
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
      setFormErrors((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }

    setEditSave(true);
  };

  const handleDateFromPicker = (date) => {
    setSelectedDate(date);
    setFormData({
      ...formData,
      birthdate: `${date.$D}/${date.$M + 1}/${date.$y}`,
    });
    setFormErrors({
      ...formData,
      birthdate: `${date.$D}/${date.$M + 1}/${date.$y}`,
    });
    setEditSave(true);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // if (
    //   formData.birthdate === "" ||
    //   formData.country === "" ||
    //   formData.contactNumber === "" ||
    //   formData.description === ""
    // ) {
    //   setFormErrors({
    //     birthdate: formData.birthdate === "",
    //     country: formData.country === "",
    //     contactNumber: formData.contactNumber === "",
    //     description: formData.description === "",
    //   });
    //   return;
    // }

    axios.put(`/employees/email?email=${mail}`, formData);

    if (role === "clevel") {
      axios.put(`/clevel/email?email=${mail}`, formData);
      axios.put(`/corredor/email/email?email=${mail}`, formData);
      axios.put(`/vendedor/email/email?email=${mail}`, formData);
    }

    if (role === "leader") {
      axios.put(`/clevel/email/email?email=${mail}`, formData);
      axios.put(`/corredor/email/email?email=${mail}`, formData);
      axios.put(`/vendedor/email/email?email=${mail}`, formData);
    }
    if (role === "freelancer") {
      axios.put(`/freelancer/email/email?email=${mail}`, formData);
      axios.put(`/corredor/email/email?email=${mail}`, formData);
      axios.put(`/vendedor/email/email?email=${mail}`, formData);
    }

    axios
      .put(`${selectedEmployee.rol}/${selectedEmployee._id}`, formData)
      .then((response) => {
        setFormSubmitted(true);
        dispatch(getAllCorredores());
        dispatch(getAllVendedores());
        dispatch(getAllLeader());
        dispatch(getAllClevel());
        dispatch(getAllFreelancer());
      })
      .catch((error) => {
        console.error(error);
      });

    setFormErrors({
      birthdate: false,
      country: false,
      contactNumber: false,
      description: false,
    });

    setEditSave(false);
  };

  const handleImageUpload = (imageUrl) => {
    setProfileImageUrl(imageUrl ?? selectedEmployee?.photo);
    setFormData((prevFormData) => ({
      ...prevFormData,
      photo: imageUrl !== "" ? imageUrl : selectedEmployee?.photo,
    }));
  };

  useEffect(() => {
    dispatch(getAllCorredores());
    dispatch(getAllVendedores());
    dispatch(getAllLeader());
    dispatch(getAllClevel());
    dispatch(getAllFreelancer());
  }, [dispatch]);

  useEffect(() => {
    if (selectedEmployee && selectedEmployee.birthdate !== null) {
      setSaveDate(selectedEmployee.birthdate);
    }
    if (selectedEmployee && selectedEmployee.photo !== "") {
      setProfileImageUrl(selectedEmployee.photo);
    }
  }, [selectedEmployee]);

  const CleanClevel = (fullName) => {
    toast.success(
      `✔ ${fullName} La desasignación se ha realizado con éxito! `,
      {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      }
    );
  };

  const desasignar = () => {
    axios.put(`/lead/cleanclevel?email=${mail}`);
    CleanClevel(user?.fullName);
  };

  return (
    <>
      <Nav />
      <div className="flex justify-center items-center w-full">
        <ToastContainer />
        <div className="h-screen w-4/5 flex flex-col justify-start items-center p-8">
          <div>
            <h2 className={styles.title}>Settings</h2>
            <motion.form
              onSubmit={handleSubmit}
              className={styles.form}
              initial={{ opacity: 0, y: "30px" }}
              whileInView={{ y: "10px", opacity: 1 }}
              transition={{ duration: 0.6, delay: 0 }}
            >
              <div className="flex flex-col justify-end items-start gap-1 w-full ">
                <span className="text-[#dad8d8]">Fecha de nacimiento</span>
                <DatePicker
                  handleChange={handleChange}
                  handleDateFromPicker={handleDateFromPicker}
                  saveDate={saveDate}
                />

                {/* <input
                  type="date"
                  name="birthdate"
                  value={formData.birthdate}
                  onChange={handleChange}
                  className={styles.inputStyles}
                  placeholder="Fecha de nacimiento"
                /> */}
              </div>
              <div className="flex flex-col justify-end items-start gap-1 w-full h-20 ">
                <span className="text-[#dad8d8]">País</span>
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className={styles.inputStyles}
                >
                  <option value="">
                    {selectedEmployee?.country
                      ? selectedEmployee?.country
                      : "Seleccionar país"}
                  </option>
                  {Countries.map((country, index) => (
                    <option
                      className={styles.inputStylesTwo}
                      key={index}
                      value={country}
                    >
                      {country}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col justify-end items-start gap-1 w-full h-20">
                <span className="text-[#dad8d8]">Número de contacto</span>
                <input
                  type="tel"
                  name="contactNumber"
                  // value={formData.contactNumber}
                  defaultValue={selectedEmployee?.contactNumber}
                  onChange={handleChange}
                  className={styles.inputStyles}
                  placeholder="Número de contacto"
                />
              </div>
              <div className="flex flex-col justify-end items-start gap-1 w-full h-24">
                <span className="text-[#dad8d8]">Descripción</span>

                <textarea
                  name="description"
                  defaultValue={selectedEmployee?.description}
                  onChange={handleChange}
                  className={styles.inputStyles}
                  placeholder="Descripción"
                />
              </div>

              <div className="flex justify-center items-center w-full mt-5">
                <UploadWidget
                  onImageUpload={handleImageUpload}
                  setEditSave={setEditSave}
                  setProfileImageUrl={setProfileImageUrl}
                />
                {profileImageUrl && (
                  <Image
                    name="photo"
                    onChange={handleChange}
                    value={profileImageUrl}
                    cloudName={VITE_CLOUND_NAME}
                    publicId={profileImageUrl}
                    className={styles.picture}
                  />
                )}
              </div>

              {role === "clevel" || role === "leader" ? (
                <div
                  onClick={desasignar}
                  className="flex flex-col cursor-pointer justify-center items-center gap-1 w-full h-fit"
                >
                  <div className="text-white w-full bg-[#ae2dff] hover:bg-[#a020f0] font-medium rounded-xl text-sm px-5 py-2.5 mt-8">
                    Desasignar Corredores/Vendedores
                  </div>
                </div>
              ) : null}

              <div className="flex flex-col justify-center items-center gap-1 w-full h-fit">
                {editSave && (
                  <button
                    type="submit"
                    className="text-white w-full bg-[#ae2dff] hover:bg-[#a020f0] font-medium rounded-xl text-sm px-5 py-2.5 mt-8"
                  >
                    Save
                  </button>
                )}
              </div>
            </motion.form>
          </div>
        </div>
        <Detail
          key={formSubmitted ? "submitted" : "not-submitted"}
          name={user?.fullName}
          picture={
            selectedEmployee?.photo ? selectedEmployee?.photo : userImageUrl
          }
          email={user?.emailAddresses[0].emailAddress}
          contactNumber={selectedEmployee?.contactNumber}
          description={selectedEmployee?.description}
          country={selectedEmployee?.country}
          birthdate={
            selectedEmployee?.birthdate &&
            selectedEmployee?.birthdate.substring(0, 10)
          }
        />
      </div>
    </>
  );
}
